// component/classic/music/index.js
import {classicBeh} from "../classic-Beh";

/*获取背景音频管理器*/
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],   /*里面可以有多个behavior，多个behavior中如果有相同的属性，去最后一个behavior的值*/
  properties: {
     src: String,
     title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    tag: 'images/music@tag.png'
  },

  /*注意：hidden不执行任何生命周期函数，只有wx:if执行*/
  /*页面生成时执行*/
  attached: function(event){
    this._recoverStatus()
    this._monitorSwitch()
  },

  //在组件实例被从页面节点树移除时执行
  detached: function(event){
    //wx:if 和hidden的区别要搞清
    //这里使用wx:if将重新渲染，切换时变成默认状态，并停止音乐，用hidden将不会，hidden只是简单的隐藏和显示
    //mMgr.stop()因为我们播放音乐的时候需要设置后台播放，不能设置成切换页面就停止音乐
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (event) {
      if(!this.data.playing){
        this.setData({
          playing: true
        });
        mMgr.src = this.properties.src  /*获取src链接将自动播放*/
        mMgr.title=this.properties.title  /*音频标题，用于原生音频播放器音频标题（必填）*/
      }
      else{
        this.setData({
          playing: false
        });
        mMgr.pause()    /*暂停*/
      }
    },

    /*判断播放状态，并显示对应图标*/
    _recoverStatus: function(){
      /*判断音乐是否暂停，如果暂停，切换页面时显示停止状态*/
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return
      }
      /*判断音乐是否播放，如果播放，切换页面时显示播放状态*/
      if(mMgr.src==this.properties.src){
        this.setData({
          playing: true
        })
      }
    },

    /*播放管理器按钮与小程序按钮状态同步*/
    _monitorSwitch: function(){
      //播放
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      //暂停
      mMgr.onPause(()=>{
        this._recoverStatus()
      })
      //关闭播放器
      mMgr.onStop(()=>{
        this._recoverStatus()
      })
      //当前歌曲播放完毕
      mMgr.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }
})
