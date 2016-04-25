<template>
  <div class="contextPage">
    <div v-for = "content in contentItem | orderBy 'order'" >
      {{{content.item}}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moduleNumber: '',
      contentItem: []
    }
  },
  ready: function () {
    // 获取当前单元号
    this.moduleNumber = this.$route.params.moduleNumber
    // 改变header状态
    this.changeHeaderStatus(false, true, '课程内容', false, false, '/static/dist/index.html#/moduleList/' + this.$route.params.courseNumber)
    // 从服务器get到contents
    this.$http.get('http://121.249.216.217/api/subject/module/' + this.moduleNumber + '/contents/', function (data) {
      this.contentItem = data.contents
    })
  },
  methods: {
    // 定义一个函数，改变header的状态
    changeHeaderStatus: function (headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref) {
      this.$dispatch('getHeaderStatus', headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref)
    }
  },
  computed: {
    msg3: function () {
      var div = document.createElement('div')
      div.innerHTML = this.msg
      console.log(div)
      console.log(div.textContent)
      return div.textContent
    }
  },
  watch: {
    msg2: function () {
      var div = window.document.creatElement('div')
      div.innerHTML = this.msg
      console.log(div.textContent)
      this.msg2 = div.textContent
    }
  }
}
</script>
<style>
  .video-js{
    width: 100%;
    height:auto;
  }
  .contextPage img {
    width: 100%;
    height:auto;
  }
</style>
