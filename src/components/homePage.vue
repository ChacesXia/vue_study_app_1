<template>
  <div class="homePage">
    <subject-detail></subject-detail>
  </div>
</template>

<script>
import subjectDetail from './childVue/subjectDetail'
export default {
  components: {
    subjectDetail
  },
  methods: {
    // 定义一个函数，改变header的状态
    changeHeaderStatus: function (headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo) {
      this.$dispatch('getHeaderStatus', headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo)
    }
  }
}
</script>
<style>
  .homePage{
    /*border: solid 1px red;*/
  }
</style>