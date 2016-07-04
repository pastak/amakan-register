const fetchPage = (url) => new Promise((ok) => {
  return window.fetch(url, {credentials: 'include'})
    .then((res) => res.text())
    .then(ok)
})

const scrapingPage = (html) => {
  const targetDoc = document.createElement('html')
  targetDoc.innerHTML = html
  ;[...targetDoc.querySelectorAll('.order > .a-box .a-fixed-right-grid .a-fixed-right-grid-col.a-col-left .a-fixed-left-grid.a-spacing-none .a-fixed-left-grid-inner .a-fixed-left-grid-col.a-col-right')]
    .forEach((item) => {
      const url = item.querySelector('.a-link-normal').href
      const title = item.querySelector('.a-link-normal').textContent.replace(/^[\s\t\n]*(.+)[\s\t\n]*$/, '$1')
      const imageUrl = item.parentNode.querySelector('img').src
      chrome.runtime.sendMessage(chrome.runtime.id, {url, title, imageUrl})
    })
}

const buildQuery = (baseQuery, index) => {
  return baseQuery.map((t) => {
    let [key, value] = t
    if (key === 'startIndex') value = 10 * index
    return [key, value].join('=')
  }).join('&')
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const actions = {
    getBookInfo: () => {
      const title = document.querySelector('#productTitle').textContent
      const url = document.querySelector('link[rel=canonical]').href
      const imageUrl = document.querySelector('#img-canvas > img').src
      sendResponse({url, title, imageUrl})
    },
    scrapingAllHistory: () => {
      const pathNamePart = '/gp/your-account/order-history/ref=oh_aui_pagination_1_'
      const queries = document.querySelector('.a-selected > a').search.substr(1).split('&')
        .map((part) => part.split('='))
      let t = document.querySelectorAll('.a-normal')
      const pageCount = +t[t.length - 1].textContent - 1
      for (let i = 0; i <= pageCount; i++) {
        const url = pathNamePart + (i + 1) + '?' + buildQuery(queries, i)
        fetchPage(url)
          .then((a) => window.setTimeout(() => scrapingPage(a), 1000 * i))
      }
    }
  }
  if (request.action in actions) {
    actions[request.action]()
  }
  return true
})
