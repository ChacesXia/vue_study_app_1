<template>
  <div class="stuInfoPage">
    <a class="button button-big button-fill button-danger" @click = "logOut">退出账号</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '这是stuInfoPage组件！'
    }
  },
  ready: function () {
    // 改变header状态
    this.changeHeaderStatus(false, true, '个人中心', false, false, '/static/dist/index.html#/')
  },
  methods: {
    // 定义一个函数，改变header的状态
    changeHeaderStatus: function (headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref) {
      this.$dispatch('getHeaderStatus', headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref)
    },
    logOut: function () {
      // 退出登录
      this.$http.get('http://121.249.216.217/auth/logout/')
      this.$router.go('../')
    }
  }
}
</script>

