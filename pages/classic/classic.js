// pages/classic/classic.js

import {ClassicModel} from "../../models/classic";
import {LikeModel} from "../../models/like";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
  },

  /*监听点赞事件返回服务端*/
  onLike: function(event){
    console.log(event);
    LikeModel.getLike(event.detail.status, this.data.classic.id, this.data.classic.type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      ClassicModel.getLatest((res)=>{
        /*数据更新*/
        this.setData({
          classic: res
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})