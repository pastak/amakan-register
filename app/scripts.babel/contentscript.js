chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const actions = {
    getBookInfo: () => {
      const title = document.querySelector('#productTitle').textContent
      const url = document.querySelector('link[rel=canonical]').href
      const imageUrl = document.querySelector('#img-canvas > img').src
      sendResponse({url, title, imageUrl})
    },
    getKindles: () => {
      const items = [];
      [...document.querySelectorAll('.order > .a-box .a-fixed-right-grid .a-fixed-right-grid-col.a-col-left .a-fixed-left-grid.a-spacing-none .a-fixed-left-grid-inner .a-fixed-left-grid-col.a-col-right')]
        .filter((a) => /Kindle/.test(a.textContent))
        .forEach((item) => {
          const url = item.querySelector('.a-link-normal').href
          const title = item.querySelector('.a-link-normal').textContent.replace(/^[\s\t\n]*(.+)[\s\t\n]*$/, '$1')
          const imageUrl = item.parentNode.querySelector('img').src
          items.push({url, title, imageUrl})
        })
      const nextPageAnchor = document.querySelector('.a-last > a')
      let nextUrl = null
      if (nextPageAnchor) nextUrl = nextPageAnchor.href
      sendResponse({items, nextUrl})
    }
  }
  if (request.action in actions) {
    actions[request.action]()
  }
  return true
})
