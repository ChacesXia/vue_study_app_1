<template>
  <div class="page dis_block">
    <header class="bar bar-nav">
    <!-- newHeader组件  -->
      <new-header></new-header>
    </header>
    <div class="content">
      <div class="content-block">
        <!-- router-view组件  -->
        <router-view></router-view>
      </div>
    </div>
  </div>
  <div class="panel-overlay"></div>
  <!-- 侧边栏内容 begin -->
  <div class="panel panel-left panel-reveal theme-dark dis_block" id='panel-left-demo'>
    <div class="content-block">
      <subject-list></subject-list>
    </div>
  </div>
  <!-- 侧边栏内容 end -->
</template>
<script>
import subjectList from './components/childVue/subjectList'
import newHeader from './components/newHeader'
export default{
  components: {
    subjectList,
    newHeader
  },
  events: {
    // 接收从各个组件传来的headerStatus
    // 并将之广播到newHeader
    getHeaderStatus: function (headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref) {
      this.$broadcast('getHeaderStatus', headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref)
    },
    // 接收从子组件传来的 showMyCourse
    // 并将之广播给 subjectList
    showMyCourse: function (msg) {
      this.$broadcast('showMyCourse', msg)
    },
    // 接收从subjectList组件传来的subjeTitle
    // 并将之广播给 newHeader 和 subjectDetail 组件
    showCourseTitle: function (subjectTitle) {
      this.$broadcast('showCourseTitle', subjectTitle)
    }
  }
}
</script>
<style>
.dis_block{
  display: block;
}
</style>

