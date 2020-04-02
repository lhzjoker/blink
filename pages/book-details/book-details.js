// pages/book-details/book-details.js
import {BookModel} from "../../models/book";
import {LikeModel} from "../../models/like";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetails: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  onLike: function(event){
    LikeModel.getLike(event.detail.status,this.data.bookDetails.id,400)
  },

  onFakePost: function(event){
    this.setData({
      posting: true
    })
  },

  onCancel: function(event){
    this.setData({
      posting: false
    })
  },

  onPost: function(event){
    /*event.detail.value是输入框里的值*/
    const comment = event.detail.comment || event.detail.value;

    if(!comment){
      return;
    }

    if(comment.length>12){
      wx.showToast({
        title: '短评不能超过12个字',
        icon: 'none'
      })
      return
    }

    BookModel.postComment(this.data.bookDetails.id,comment)
        .then((res)=>{
          wx.showToast({
            title: '+1',
            icon: 'none'
          })
          /*把新添加的短评加到数组第一个元素，unshift*/
          this.data.comments.unshift({
            content: comment,
            nums: 1
          })
          this.setData({
            comments: this.data.comments,
            posting: false
          })
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const bid = options.bid;    /*接收页面传来的参数*/
      const bookDetails = BookModel.getBookDeteils(bid);
      const comments = BookModel.getComments(bid);
      const likeStatus = BookModel.getLikeStatus(bid);

      bookDetails.then((res)=>{
        this.setData({
          bookDetails: res
        })
      });

      comments.then((res)=>{
        this.setData({
          comments: res.comments
        })
      });

      likeStatus.then((res)=>{
        this.setData({
          likeStatus: res.like_status,
          likeCount: res.fav_nums
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