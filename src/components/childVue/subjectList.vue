<template>
  <div class="subjectList">
    <p class="close-panel" v-show = "showMyCourse" @click = "showCourseTitle('我的课程')">我的课程</p> 
    <div v-for = 'subject in subjectList'>  
        <p class="close-panel" @click = "showCourseTitle('全部课程')" v-show = "$index === 0">全部课程</p>
        <p class="close-panel" @click = "showCourseTitle(subject.title)">{{subject.title}}</p>       
    </div>
    <li class="button close-panel">关闭</li>
  </div>
</template>

<script>
import {getLocalStorage} from '../../common'
export default {
  data () {
    return {
      subjectList: [],
      showMyCourse: false
    }
  },
  ready: function () {
    // 读取localStorage,如果有subjectListObj就直接从本地获取
    // 若没有，则从服务器get并且存入Localstorage
    if (getLocalStorage('subjectListObj')) {
      this.subjectList = getLocalStorage('subjectListObj')
    } else {
      this.$http.get('http://121.249.216.217/api/subject/subject/', function (data) {
        this.subjectList = data.results
        // 将subject列表存入本地，通过Localstorage
        window.localStorage.subjectListObj = JSON.stringify(data.results)
      })
    }
  },
  methods: {
    // 将 subjectTitle 传递给App 组件
    showCourseTitle: function (subjectTitle) {
      this.$dispatch('showCourseTitle', subjectTitle)
    }
  },
  events: {
    // 接收从各个组件传来的 showMyCourse
    showMyCourse: function (msg) {
      if (msg === 'true') {
        this.showMyCourse = true
      } else {
        this.showMyCourse = false
      }
    }
  }
}
</script>

<style type="text/css">

</style>