import {BookModel} from "../../models/book";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //错误的使用promise，层层嵌套，还是形成了回调地狱
    // const hotlist = BookModel.getHotList()
    // hotlist.then(
    //     res=>{
    //       console.log(res)
    //       BookModel.getMyBookCount().then(
    //           res=>{
    //             console.log(res)
    //             BookModel.getMyBookCount().then(
    //                 res=>{
    //                   console.log(res)
    //                 }
    //             )
    //           }
    //       )
    //
    //     }
    // )
    //正确的使用promise,每层return promise对象，这样就是平行的，不会形成回调地狱
    BookModel.getHotList().then(
        res=>{
          console.log(res)
          return BookModel.getMyBookCount()
        }
    ).then(
        res=>{
          console.log(res)
          return BookModel.getMyBookCount()
        }
    ).then(
        res=>{
          console.log(res)
        }
    )
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