'use strict';

let nextPageUrl = null
let notifications = {}

const getAllKindle = (tid) => {
  chrome.tabs.sendMessage(tid, {action: 'getKindles'}, ({items, nextUrl}) => {
    items.forEach((item, index) => {
      window.setTimeout(() => sendToPageUrl(item), index * 100)
    })
    nextPageUrl = nextUrl
    if (nextPageUrl) {
      chrome.notifications.create({
        type: 'basic',
        title: '次のページが存在します',
        message: '遷移しますか？',
        iconUrl: 'images/icon-38.png',
        requireInteraction: true,
        buttons: [{title: 'No'}, {title: 'Yes'}]
      })
    }
  })
}

chrome.notifications.onButtonClicked.addListener((nid, buttonIndex) => {
  chrome.notifications.clear(nid)
  if (buttonIndex && nextPageUrl) {
    chrome.tabs.query({active: true}, (tabs) => chrome.tabs.update(tabs[0].id, {url: nextPageUrl}))
  }
})

chrome.notifications.onClicked.addListener((nid) => {
  chrome.tabs.create({url: notifications[nid].url})
})

const notify = (opt) => new Promise((ok) => {
  chrome.notifications.create(opt, ok)
})

const sendToPageUrl = ({url, title, imageUrl}) => {
  notify({type: 'basic', title, iconUrl: imageUrl, message: '登録中...', priority: 1})
    .then((notifyId) => {
      notifications[notifyId] = {url: `https://amakan.net/search?query=${url}`}
      const xhr = new XMLHttpRequest()
      xhr.open('GET', `https://amakan.net/search?query=${url}`)
      xhr.onreadystatechange = () => {
        if (!/amakan\.net\/products\//.test(xhr.responseURL)) return
        const bookPage = xhr.responseURL
        console.log(bookPage, url)
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
            chrome.notifications.update(notifyId, {
              message: '登録成功',
              priority: 0
            })
            window.setTimeout(() => chrome.notifications.clear(notifyId), 500)
          })
          .catch(() => {
            chrome.notifications.update(notifyId, {
              message: '登録不可または何らかのエラーが発生しました',
              priority: 0
            })
            window.setTimeout(() => chrome.notifications.clear(notifyId), 500)
          })
      }
      xhr.send(null)
    })
}

chrome.browserAction.onClicked.addListener((tab) => {
  const urlInfo = document.createElement('a')
  urlInfo.href = tab.url
  if (!/amazon\.co\.jp/.test(urlInfo.hostname)) return console.log('🍣')
  if (/\/order-history/.test(urlInfo.pathname)) return getAllKindle(tab.id)
  chrome.tabs.sendMessage(tab.id, {action: 'getBookInfo'}, sendToPageUrl)
})
