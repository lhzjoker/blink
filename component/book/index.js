// component/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      onTap: function () {
        const bid=this.properties.book.id
        /*携带参数跳转到指定页面*/
        wx.navigateTo({
          url: `/pages/book-details/book-details?bid=${bid}`
        })
      }
  }
})
