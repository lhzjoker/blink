// pages/my/my.js
import {BookModel} from "../../models/book";
import {ClassicModel} from "../../models/classic";

Page({

  /**
   * 页面的初始数据
   */
  data: {
      setting: false,
      userInfo: null,
      bookCount: 0,
      classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
      this.getMyBookCount();
      this.getClassics()
  },

    getClassics(){
        ClassicModel.getClassics((res)=>{
            console.log(res)
            this.setData({
                classics: res
            })
        })
    },

    getMyBookCount(){
      BookModel.getMyBookCount().then((res)=>{
          console.log(res)
          this.setData({
              bookCount: res.count
          })
      })
    },

  userAuthorized() {
      /*判断小程序有没有授权*/
      wx.getSetting({
          success: (res) => {
              if (res.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                      success: res => {
                          this.setData({
                              setting: true,
                              userInfo: res.userInfo
                          })
                      }
                  })
              } else {
                  console.log("没有授权")
              }
          }
      })
  },

    onGetUserInfo(event){
        const userInfo = event.detail.userInfo;
        if(userInfo){
            this.setData({
                userInfo: userInfo,
                setting: true
            })
        }
    },

    toStudy() {
        wx.navigateTo({
            url: '/pages/course/course'
        })
    },

    toAbout(){
      wx.navigateTo({
          url: '/pages/about/about'
      })
    },

    onPreviewTap(event){
        console.log(123)
        wx.navigateTo({
            url: `/pages/classic-detail/index?cid=${event.detail.cid}&type=${event.detail.type}`
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