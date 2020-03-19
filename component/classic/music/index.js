// component/classic/music/index.js
import {classicBeh} from "../classic-Beh";

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    on: 'images/player@playing.png',
    off: 'images/player@waitting.png',
    tag: 'images/music@tag.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
