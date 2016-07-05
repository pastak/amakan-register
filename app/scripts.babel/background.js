'use strict';

let nextPageUrl = null
let notificationId = null

const notify = (opt) => new Promise((ok) => {
  chrome.notifications.create(opt, ok)
})

const sendToPageUrl = ({url, title, imageUrl}) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `https://amakan.net/search?query=${url}`)
  xhr.onreadystatechange = () => {
    if (!/amakan\.net\/products\//.test(xhr.responseURL)) return
    const bookPage = xhr.responseURL
    if (xhr.readyState === 4) console.log(title, bookPage, url)
    const html = document.createElement('html')
    html.innerHTML = xhr.responseText
    const csrfToken = html.querySelector('meta[name=csrf-token]').content
    window.fetch(bookPage + '/taste', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken
      },
      credentials: 'include'
    })
      .then((res) => {
        chrome.notifications.update(notificationId, {
          title,
          iconUrl: imageUrl,
          message: '登録成功',
          priority: 0
        })
      })
  }
  xhr.send(null)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendToPageUrl(request)
})

chrome.browserAction.onClicked.addListener((tab) => {
  const urlInfo = document.createElement('a')
  urlInfo.href = tab.url
  if (!/amazon\.co\.jp/.test(urlInfo.hostname)) return console.log('🍣')
  if (/\/order-history/.test(urlInfo.pathname)) {
    return notify({type: 'basic', title: '開始', iconUrl: 'images/icon-38.png', message: '登録中...', priority: 1, requireInteraction: true})
      .then((notifyId) => {
        notificationId = notifyId
        chrome.tabs.sendMessage(tab.id, {action: 'scrapingAllHistory'})
      })
  }
  chrome.tabs.create({url: 'https://amakan.net/search?query=' + tab.url})
})
