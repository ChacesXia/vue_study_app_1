<template>
    <header class="bar bar-nav">
        <a class="icon icon-menu open-panel pull-left" v-show = 'headerStatus.headerLeftOne' @click = 'loginYes'></a>
        <a class="icon icon-left pull-left back" :href = 'headerStatus.headerHref' v-show = 'headerStatus.headerLeftTwo'></a>
        <p class = "title">{{headerStatus.headerTitle}}</p>
        <a class="button button-link button-nav pull-right" v-link = "{path: '../login/'}" v-show = 'headerStatus.headerRightOne'>登录&nbsp&nbsp</a>
        <a class="icon icon-me pull-right" v-show = 'headerStatus.headerRightTwo' v-link = "{path: '../stuInfo'}"></a>
    </header>
</template>

<script>
  export default {
    data () {
      return {
        msg: '这是newHeader！',
        // headerStatus这个对象用来存储header中左右板块是否出现
        headerStatus: {
          headerLeftOne: true,
          headerLeftTwo: false,
          headerTitle: '全部课程',
          headerRightOne: true,
          headerRightTwo: false,
          headerHref: ''
        }
      }
    },
    events: {
      // 接收从父组件App传来的headerStatus
      getHeaderStatus: function (headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref) {
        // 改变头部状态
        this.headerStatus.headerLeftOne = headerLeftOne
        this.headerStatus.headerLeftTwo = headerLeftTwo
        this.headerStatus.headerTitle = headerTitle
        this.headerStatus.headerRightOne = headerRightOne
        this.headerStatus.headerRightTwo = headerRightTwo
        this.headerStatus.headerHref = headerHref
      },
      // 接收从subjectList 组件传来的 subjectTitle
      showCourseTitle: function (subjectTitle) {
        this.headerStatus.headerTitle = subjectTitle
      }
    }
  }
</script>
<style>
</style>