import vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import contextPage from './components/contextPage'
import enrollPage from './components/enrollPage'
import loginPage from './components/loginPage'
import stuInfoPage from './components/stuInfoPage'
import homePage from './components/homePage'
import moduleListPage from './components/moduleListPage'
// import resourcejs from './resource.js'
// import './route.js'

vue.use(VueRouter)
vue.use(VueResource)
var router = new VueRouter({
  hashbang: false
})

// vue.http.options.xhr = {withCredentials: true}
vue.http.options.emulateJSON = true

router.map({
  // 登陆界面
  '/login': {
    component: loginPage
  },
  // 注册页面
  '/courseEnroll/:courseNumber': {
    component: enrollPage
  },
  // 课程详细信息页面
  '/courseInfo/:courseNumber': {
    component: contextPage
  },
  // 学生个人中心
  '/stuInfo': {
    component: stuInfoPage
  },
  // 某课程某单元的内容页面
  '/context/:courseNumber/:moduleNumber': {
    component: contextPage
  },
  // 首页（除去header）
  '*': {
    component: homePage
  },
  'homePage/:stuNumber': {
    component: homePage
  },
  // 单元列表页面
  'moduleList/:courseNumber': {
    component: moduleListPage
  }
})
router.start(App, '#app')
// 每隔30分钟清除localStorage
var time = 60000 * 5
setInterval(function () {
  window.localStorage.clear()
}, time)
// 加头
vue.http.interceptors.push({
  request: function (request) {
    console.log('add header request')
    var cookieName = 'csrftoken'
    console.log(request)
    var cookieValue = null
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';')
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim()
        console.log(cookie)
        console.log('local')
        console.log(cookie.substring(0, cookieName.length + 1).trim())
        console.log('name')
        console.log(cookieName.trim() + '=')
        if (cookie.substring(0, cookieName.length + 1).trim() === (cookieName.trim() + '=')) {
          cookieValue = cookie.substring(cookieName.length + 1, cookie.length)
          break
        }
      }
    }
    if (cookieValue !== '' && cookieValue !== null) {
      console.log('have cookie')
      console.log(cookieValue)
      vue.set(request.headers, 'x-csrftoken', cookieValue)
    } else {
      console.log('not cookie!!!')
    }
    return request
  },

  response: function (response) {
    console.log('add header after')
    console.log(response)
    return response
  }

})
