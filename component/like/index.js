// component/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /*开放的属性，可以动态变化的*/
    /*里面的属性有三个值，type是一定要写的，value不写则为默认值，还有observer函数暂时用不到*/
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
      value: 0,
    },
    onlyRead: Boolean
  },

    /**
     * 组件的初始数据
     */
    data: {
      /*数据绑定*/
      /*是封装起来的*/
      yesSrc: 'images/like.png',
      noSrc: 'images/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
      /*点赞函数*/
      onLike: function (event) {
        if(this.properties.onlyRead){
          return
        }
        let like = this.properties.like;  //this函数引用这个widow中的属性
        let count = this.properties.count;

        count = like ? count - 1 : count + 1;
        /*设置数据*/
        this.setData({
          count: count,
          like: !like
        });
        /*自定义事件，激活*/
        let status=this.properties.like?'like':'cancel';
        /*事件名取为like*/
        this.triggerEvent('like',{
          status: status
        },{})
      }
    }
})
