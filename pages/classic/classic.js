// pages/classic/classic.js

import {ClassicModel} from "../../models/classic";
import {LikeModel} from "../../models/like";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /*监听点赞事件返回服务端*/
  onLike: function(event){
    console.log(event);
    LikeModel.getLike(event.detail.status, this.data.classic.id, this.data.classic.type)
  },
  /*监听切换页面事件*/
  onNext: function(){
    this._updateClassic('next')
  },
  onPrevious: function(){
      this._updateClassic('previous')
  },
  /*更新页面函数*/
  _updateClassic: function(nextOrprevious){
    ClassicModel.getCLassic(this.data.classic.index,nextOrprevious,(res)=>{
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic: res,
        latest: ClassicModel.islatest(res.index),
        first: ClassicModel.isFirst(res.index)
      })
    })
  },
  /*获取页面的点赞状态信息*/
  _getLikeStatus(artID,category){
    LikeModel.getClassicLikeStatus(artID,category,(res)=> {
      /*更新点赞数和点赞状态，因为这个是实时更新的，不能写入缓存当中，需要额外更新*/
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      ClassicModel.getLatest((res)=>{
        // this._getLikeStatus(res.id,res.type)
        /*数据更新*/
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status
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