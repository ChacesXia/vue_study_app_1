
  // 读取cookie, 输入cookie的name，返回cookie的值
  export function getCookie (c_name) {
    var cookieArr = document.cookie.split(';')
    var len = cookieArr.length
    for (var i = 0; i < len; i++) {
      if (cookieArr[i].split('=')[0].trim() === c_name) {
        return cookieArr[i].split('=')[1].trim()
      }
    }
  }
  // 读取localStorage,传入想要得到的对象名，如果有该对象则返回，若没有则返回 false;
  export function getLocalStorage (obj_name) {
    var storage = window.localStorage
    if (storage.getItem(obj_name)) {
      return JSON.parse(storage.getItem(obj_name))
    } else {
      return false
    }
  }

