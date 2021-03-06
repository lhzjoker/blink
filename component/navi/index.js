// component/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function () {
      /*如果是最新页，左按钮则失效*/
      if(!this.properties.latest){
        this.triggerEvent('left',{},{})
      }
    },
    onRight: function () {
      /*如果是首页，右按钮则失效*/
      if(!this.properties.first){
        this.triggerEvent('right',{},{})
      }
    }
  }
})
