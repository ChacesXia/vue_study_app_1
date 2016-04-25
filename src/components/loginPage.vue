<template>
  <!-- 表单 begin -->
    <div class="list-block">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">学号</div>
              <div class="item-input">
              <input type="text" placeholder="Your ID" v-model = "userForm.username"/>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">密码</div>
              <div class="item-input">
              <input type="password" placeholder="Your Password"  v-model = "userForm.password"/>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 表单 end -->
   <a class="button button-big button-fill button-success" @click = "postForm">登陆</a>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  ready: function () {
    this.$http.get('http://121.249.216.217/auth/login/')
    // 改变header状态
    this.changeHeaderStatus(false, true, '登录', false, false, '/static/dist/index.html#/')
  },
  methods: {
    // 定义一个函数，改变header的状态
    changeHeaderStatus: function (headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref) {
      this.$dispatch('getHeaderStatus', headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref)
    },
    // 提交表单
    postForm: function (event) {
      event.preventDefault()
      this.$http.post(
        'http://121.249.216.217/auth/login/', {'username': this.userForm.username, 'password': this.userForm.password}).then(function (successResponse) {
          this.$http.get('http://121.249.216.217/api/student/enrolled_course/').then(function (success) {
            // 改变路由，跳转到首页
            console.log('post success!!!')
            this.$router.go('../')
          }, function () {
            window.$.alert('账号或密码错误11！')
          })
        }, function (errorResponse) {
          window.$.alert('账号或密码错误！')
        })
    }
  }
}
</script>

