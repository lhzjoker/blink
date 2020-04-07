import {KeywordModel} from "../../models/keyword";
import {BookModel} from "../../models/book";
import {paginationBeh} from "../behaviors/pagination";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type: String,
      /*observer函数在属性值改变的时候就会触发*/
      observer: 'loadMore'
    }
  },
  behaviors:[paginationBeh],

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false
  },

  attached(){
    const historyWords = KeywordModel.getHistory();
    this.setData({
      historyWords: historyWords
    });

    KeywordModel.getHot()
        .then((res)=>{
          this.setData({
            hotWords: res.hot
          })
        })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadMore(){
      console.log(123);
      /*关键字为空就返回*/
      if(!this.data.q){
        return
      }
      /*设置一把锁，避免请求重复数据*/
      if(this.isLocked()){
        return;
      }


      if(this.hasMore()){
        /*
        * loading的设置记得一定要写在if里面，如果不写在里面将会出现一种情况
        * 当this.hasMore为false的时候，loading将会一直是true，等下次关闭页面，重新加载
        * 的时候可能只会出现二十个数据
        * */
        this.locked();   /*上锁*/
        BookModel.search(this.getCurrentStart(),this.data.q).then((res)=>{
          /*两个数组组合起来*/
          this.setMoredata(res.books);
          this.unLocked();   /*解锁*/
        },()=>{
          /*当出现错误的时候也需要解锁，避免死锁*/
          this.unLocked();
        })
      }

    },

    onCancel(event){
      this.triggerEvent('cancel',{},{});
      /*以前的数据清零*/
      this.initialize();
    },

    onDelete(event){
      this._closeResult();
      /*以前的数据清零*/
      this.initialize();
    },

    onConfirm(event){
      this._showResult();
      this._showLoadingCenter();
      const word = event.detail.value || event.detail.comment;
      this.setData({
        q: word
      });
      BookModel.search(0,word).then((res)=>{
        this.setMoredata(res.books);
        /*第一次从服务器返回数据记得设置total*/
        this.setTotal(res.total);
        this._hideLoadingCenter();
        KeywordModel.addToHistory(word);
      },)
    },

    /*展示页面*/
    _showResult(){
      this.setData({
        searching: true
      });
    },

    /*关闭页面*/

    _closeResult(){
      this.setData({
        searching: false,
        q: ''
      })
    },

    /*实现加载状态*/
    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },

    /*隐藏加载状态*/
    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    }
  }
})
