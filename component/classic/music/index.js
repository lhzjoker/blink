// component/classic/music/index.js
import {classicBeh} from "../classic-Beh";

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],   /*里面可以有多个behavior，多个behavior中如果有相同的属性，去最后一个behavior的值*/
  properties: {             /*properties可以覆盖behavior中的相同属性*/
  },

  /**
   * 组件的初始数据
   */
  data: {
    off: 'images/player@pause.png',
    on: 'images/player@play.png',
    tag: 'images/music@tag.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
