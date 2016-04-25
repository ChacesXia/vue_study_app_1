<template>
  <div class="enrollPage">
    <div class="enroll_image">
      <img src="../assets/logo.png">
    </div>
    <div class="enroll_content content-padded">
      <p><strong>课程名：</strong>{{courseGet.title}}</p>
      <p><strong>课程简介：</strong>{{courseGet.overview}}</p>
    </div>   
    <button class="button button-big button-fill button-success enroll_button" @click= "enrollCourse">enroll the class</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: this.$route.params.courseNumber,
      routePath: '../moduleList/' + this.$route.params.courseNumber,
      getCoursePath: 'http://121.249.216.217/api/subject/course/' + this.$route.params.courseNumber,
      courseGet: {}
    }
  },
  ready: function () {
    // 读取localStorage,如果有courseListObj就直接从本地获取
    // 若没有，则从服务器get
    var storage = window.localStorage
    if (storage.courseListObj) {
      var courseList = JSON.parse(storage.courseListObj)
      var courseLen = courseList.length
      var courseId = parseInt(this.$route.params.courseNumber)
      for (var i = 0; i < courseLen; i++) {
        if (courseList[i].id === courseId) {
          this.courseGet = courseList[i]
        }
      }
    } else {
      this.$http.get(this.getCoursePath, function (data) {
        this.courseGet = data
      })
    }
    // 改变header的状态
    this.changeHeaderStatus(false, true, '课程注册', false, false, '/static/dist/index.html#/')
  },
  methods: {
    // 定义一个函数，改变header的状态
    changeHeaderStatus: function (headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref) {
      this.$dispatch('getHeaderStatus', headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref)
    },
    // 判断用户是否登陆,操作控制函数
    enrollCourse: function (courseNumber) {
      var router = this.$route.router
      var successUrl = '../moduleList/' + this.$route.params.courseNumber
      this.$http.get('http://121.249.216.217/api/student/enrolled_course/').then(function (response) {
        this.$http.post(
            'http://121.249.216.217/api/subject/course/' + this.$route.params.courseNumber + '/enroll/', {}).then(function (successResponse) {
              window.$.alert('选课成功', function () {
                router.go(successUrl)
              })
            }, function (errorResponse) {
              window.$.alert('失败', function () {
              })
            })
      }, function (response) {
        window.$.confirm('现在去登陆？', '您还没有登录', function () {
          router.go({path: '../login/'})
        })
      })
    }
  }
}
</script>
<style>
  .enroll_image{
    background-color: #DBDBDB;
    margin: auto;
    padding: auto;
    text-align: center;
  }
  .enroll_button{
    width: 100%;
  }
</style>