// 页面路由
window.location.href = 'http://www.baidu.com'
history.back()

// hash路由
window.location = '#hash'
window.onhashchange = function () {
  console.log('current hash:', window.location.hash);
}

// h5路由
history.pushState('name', 'title', '/path')
history.replaceState('name', 'title', '/path')

window.onpopstate = function () {
  console.log(window.location.href);
  console.log(window.location.pathname);
}

// browserrouter hashrouter