'use strict';

let nextPageUrl = null
let notificationId = null
let Q = []
Q.workingCount = 0
Q.finishedCount = 0
Q.execShift = () => {
  const action = Q.shift()
  Q.workingCount++
  try {
    action().then(() => {
      Q.workingCount--
      Q.finishedCount++
      Q.execShift()
    }).catch((e) => {
      Q.finishedCount++
      Q.workingCount--
    })
  } catch (e) {
    console.log(e, typeof action, action)
  }
}
Q.start = () => {
  Q.execShift()
}

const notify = (opt) => new Promise((ok) => {
  chrome.notifications.create(opt, ok)
})

let j = 0

const sendPageUrl = ({url, title, imageUrl}) => new Promise((ok) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `https://amakan.net/search?query=${url}`)
  xhr.onreadystatechange = () => {
    if (xhr.readyState < 4) return
    if (xhr.readyState === 4 && !/amakan\.net\/products\//.test(xhr.responseURL)) return ok()
    const bookPage = xhr.responseURL
    if (xhr.readyState === 4) console.log(title, bookPage, url)
    const html = document.createElement('html')
    html.innerHTML = xhr.responseText
    let csrfToken
    try {
      csrfToken = html.querySelector('meta[name=csrf-token]').content
    } catch (e) {
      return ok()
    }
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
          message: '登録成功(' + (Q.finishedCount + 1) + '/' + (Q.length + Q.finishedCount + 1) + ')',
          priority: 0
        })
        ok()
      })
  }
  xhr.send(null)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  Q.push(() => sendPageUrl(request))
  if (Q.length > 0 && Q.workingCount <= 2) Q.start()
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
