const paginationBeh = Behavior({
    data: {
        dataArray: [],
        total: null,
        none: false,
        loading: false
    },

    methods: {
        /*返回更多数据*/
      setMoredata(dataArray){
          /*把两个数组结合起来*/
          const tempArray = this.data.dataArray.concat(dataArray);
          this.setData({
              dataArray: tempArray
          })
      },

        /*返回数组长度*/
        getCurrentStart(){
            return this.data.dataArray.length
        },

        /*设置书籍总数*/
        setTotal(total){
            this.data.total=total;
            if(this.data.total==0){
                this.setData({
                    none: true
                })
            }
        },

        /*是否加载更多数据，判断服务器的数据是否给完，给完将不再发送请求*/
        hasMore(){
            if(this.data.total<=this.data.dataArray.length){
                return false
            }
            else {
                return true
            }
        },

        /*数据清零，避免点击叉后重新搜索出现重复数据*/
        initialize(){
            this.setData({
                dataArray: [],
                none: false,
                loading: false
            });
            this.data.total = null
        },

        /*锁*/
        isLocked(){
            return this.data.loading?true:false
        },

        locked(){
            this.setData({
                loading: true
            })
        },

        unLocked(){
            this.setData({
                loading: false
            })
        },
    }
});

export {
    paginationBeh
}