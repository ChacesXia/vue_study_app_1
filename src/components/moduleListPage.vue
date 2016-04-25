<template>
  <div class="moduleListPage list-block">
    <ul>
      <li class="item-content" v-for = 'module in moduleGet' v-link = "'../context/' + courseGetId + '/' + module.id + '/'">
        <div class="item-inner">
          <div class="item-title">{{module.title}}</div>
          <div class="item-after icon icon-emoji"></div>
        </div>
      </li>
    </ul>
    <button class="romove_course button button-big button-fill button-danger" @click="removeCourse(courseGetId)">注销课程</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '这是moduleListPage组件！',
      getCoursePath: 'http://121.249.216.217/api/subject/course/' + this.$route.params.courseNumber + '/',
      courseGetId: '',
      moduleGet: []
    }
  },
  ready: function () {
    // 读取localStorage,如果有courseListObj就直接从本地获取
    // 若没有，则从服务器get并且存入Localstorage
    var storage = window.localStorage
    if (storage.courseListObj) {
      var courseList = JSON.parse(storage.courseListObj)
      var courseLen = courseList.length
      var courseId = parseInt(this.$route.params.courseNumber)
      for (var i = 0; i < courseLen; i++) {
        if (courseList[i].id === courseId) {
          this.moduleGet = courseList[i].modules
        }
      }
    } else {
      this.$http.get(this.getCoursePath, function (data) {
        this.moduleGet = data.modules
      })
    }
    this.courseGetId = this.$route.params.courseNumber
    // 改变header的状态
    this.changeHeaderStatus(false, true, '课程单元', false, false, '/static/dist/index.html#/')
  },
  methods: {
    // 定义一个函数，改变header的状态
    changeHeaderStatus: function (headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref) {
      this.$dispatch('getHeaderStatus', headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref)
    },
    // 退课函数
    removeCourse: function (courseNum) {
      var router = this.$route.router
      this.$http.delete('http://121.249.216.217/api/student/enrolled_course/' + courseNum + '/remove/', {}).then(function (successResponse) {
        window.$.alert('退课成功', function () {
          router.go({path: '../'})
        })
      }, function (errorRespose) {
        window.$.alert('退课失败', function () {
        })
      })
    }
  }
}
</script>

<style>
    .moduleListPage {
        /*border: solid 1px #000000;*/
    }
    .romove_course{
      width: 100%;
    }
</style>

