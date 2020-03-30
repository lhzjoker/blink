// component/tag/index.js
Component({
  /**
   * 组件的属性列表
   */

  /*启用slot插槽*/
  options: {
    multipleSlots:true
  },
  /*外部样式，外部样式可以有多个，所以这里是一个数组*/
  externalClasses:['tag-class'],
  properties: {
    comment: String,
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

  }
})
