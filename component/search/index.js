import {KeywordModel} from "../../models/keyword";
import {BookModel} from "../../models/book";
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: ''
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
    onCancel(event){
      this.triggerEvent('cancel',{},{})
    },

    onDelete(event){
      this.setData({
        searching: false
      })
    },

    onConfirm(event){
      this.setData({
        searching: true
      });
      const word = event.detail.value || event.detail.comment;
      BookModel.search(0,word).then((res)=>{
        this.setData({
          dataArray: res.books,
          q: word
        });
        KeywordModel.addToHistory(word);
      })
    },
  }
})
