<template>
  <div class="subjectDetail content infinite-scroll infinite-scroll-bottom" data-distance="100">
    <div class="list-block">
      <div class="list-container">
        <div class="card courseItem" v-for="courseItem in itemList.results" @click="handleControl(courseItem.id)">
            <div class="card-content">
              <div class="media-list">
                <ul>
                  <li class="item-content">
                    <div class="item-media">
                      <!-- <img src="../../assets/logo.png" width="44"> -->
                      <img src="{{courseItem.images}}" width="44">
                    </div>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">{{courseItem.title}}</div>
                      </div>
                      <div class="item-subtitle">{{courseItem.overview}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-footer">
              <span>老师:{{courseItem.owner}}</span>
              <span>时间:{{(courseItem.created).substring(0,10)}}</span>
            </div>
        </div>
      </div>
    </div>

    <!-- 加载提示符 --> 
<!--     <div class="infinite-scroll-preloader">
      <div class="preloader"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemList: null,
      newItem: null,
      subjectUrl: '',
      subjectTitle: ''
    }
  },
  ready: function () {
    this.$http.get('http://121.249.216.217/api/student/enrolled_course/').then(function (successResponse) {
      console.log('student/course/成功！！！')
      // 通知 subjectList 组件
      this.$dispatch('showMyCourse', 'true')
      // 改变header状态
      this.changeHeaderStatus(true, false, '我的课程', false, true)
      // 展示我的所有课程
      this.itemList = successResponse.data
    }, function (errorResponse) {
      console.log('student/course/失败！！！')
      // 通知 subjectList 组件
      this.$dispatch('showMyCourse', 'false')
      // 改变header状态
      this.changeHeaderStatus(true, false, '全部课程', true, false)
      // 展示全部课程
      this.$http.get('http://121.249.216.217/api/subject/course/', function (data) {
        this.itemList = data
      })
    })
    var loading = false
    // 最多可加载的条目
    var maxItems = 50
    // 上次加载的序号
    var lastIndex = 5
    console.log(loading)
    window.$('.infinite-scroll-bottom').on('infinite', () => {
      // 如果正在加载，则退出
      if (loading) return
      loading = true
      // 模拟1s的加载过程
      var url = null
      if ((this.newItem !== null && this.newItem.next === null) || (this.newItem === null && this.itemList.next === null)) {
        // 新列表存在，且新列表没有下一项，或者新列表不存在，旧列表没有下一项
        console.log('没有更多了')
        return
        // url = this.itemList.next
        // console.log(this.itemList.next)
      } else if (this.newItem !== null && this.newItem.next !== null) {
        // 新列表存在，且有下一项
        url = this.newItem.next
      } else if (this.newItem === null && this.itemList.next !== null) {
        // 新列表不存在，旧列表有下一项
        url = this.itemList.next
      }
      console.log('这是下拉刷新加载的url' + url)
      // console.log(this)
      this.getApiResource(url)
      setTimeout(() => {
        // 重置加载flag
        loading = false
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          window.$.detachInfiniteScroll(window.$('.infinite-scroll'))
          // 删除加载提示符
          window.$('.infinite-scroll-preloader').remove()
          return
        }
        console.log('执行了下拉刷新')
        // 添加新条目
        this.addItems(this.newItem.results)
        // 更新最后加载的序号
        lastIndex = window.$('.list-container li').length
        // 容器发生改变,如果是js滚动，需要刷新滚动
        window.$.refreshScroller()
      }, 1000)
    })
  },
  events: {
    // 接收从 subjectL 传来的 subjectTitle
    // 并根据 subjectTitle 来呈现不同内容
    showCourseTitle: function (subjectTitle) {
      console.log('subjectDetail收到subjectTitle了：' + subjectTitle)
      // 根据subjectTitle 来呈现不同内容
      switch (subjectTitle) {
        case '我的课程':
          console.log('switch 中 我的课程')
          this.$http.get('http://121.249.216.217/api/student/enrolled_course/', function (data) {
            console.log(data.results)
            this.itemList = data
          })
          break
        case '全部课程':
          console.log('switch 中 全部课程')
          this.$http.get('http://121.249.216.217/api/subject/course/', function (data) {
            console.log(data.results)
            this.itemList = data
          })
          break
        default:
          console.log('switch 中 某个类别课程')
          console.log(subjectTitle)
          this.$http.get('http://121.249.216.217/api/subject/course/?subject__title=' + subjectTitle, function (data) {
            console.log(data.results)
            this.itemList = data
          })
      }
    }
  },
  methods: {
    // 定义一个函数，改变header的状态
    changeHeaderStatus: function (headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref) {
      this.$dispatch('getHeaderStatus', headerLeftOne, headerLeftTwo, headerTitle, headerRightOne, headerRightTwo, headerHref)
    },
    handleControl: function (courseNumber) {
      var router = this.$route.router
      this.$http.get('http://121.249.216.217/api/student/enrolled_course/' + courseNumber + '/').then(function (response) {
        router.go({path: '/moduleList/' + courseNumber})
      }, function (response) {
        router.go({path: '/courseEnroll/' + courseNumber})
      })
    },
    addItems: function (courseItem) {
      // 生成新条目的HTML
      var html = ''
      for (var i = 0; i < courseItem.length; i++) {
        html += '<div class="card courseItem" @click="handleControl(' + courseItem[i].id + ')">            <div class="card-content">              <div class="media-list">                <ul>                  <li class="item-content">                    <div class="item-media">                      <img src="../../assets/logo.png" width="44">                    </div>                    <div class="item-inner">                      <div class="item-title-row">                        <div class="item-title">' + courseItem[i].title + '</div>                      </div>                      <div class="item-subtitle">' + courseItem[i].overview + '</div>                    </div>                  </li>                </ul>              </div>            </div>            <div class="card-footer">              <span>老师' + courseItem[i].owner + '</span>              <span>时间' + courseItem[i].created + '</span>            </div>        </div>'
      }
      // 添加新条目
      window.$('.infinite-scroll-bottom .list-container').append(html)
    },
    getApiResource: function (url) {
      this.$http.get(url).then(function (response) {
        // this.itemList = response.data.results
        this.$set('newItem', response.data)
        // this.itemList = [...this.itemList, ... response.data.results]
        // this.itemList.push(response.data.results)
      }, function (response) {
        // window.$.alert('刷新失败')
      })
    }
  }
}
</script>

<style type="text/css">
/*    .subjectDetail .courseItem{
      padding: 5px 2%;
      border:solid 1px;
    }*/
    /*超长度省略号,不支持ff*/
    .text-ellipsis{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:100%;}
</style>

