# 旧岛微信小程序开发

## 目录
* [布局](#布局)
    * [普通布局](#普通布局)
    * [flex布局](#flex布局)
        * [主轴与交叉轴](#主轴与交叉轴)
* [组件](#组件)
    * [page页面的巧用](#page页面的巧用)
    * [组件的继承](#组件的继承)
    * [like组件](#like组件)
        * [事件](#事件)
* [访问API](#访问api)
    * [生命周期函数](#生命周期函数)
    * [同步异步与回调函数](#同步异步与回调函数)
    * [ES6中的this指向问题](#es6中的this指向问题)
    * [通用错误异常处理](#通用错误异常处理)
    * [Http类的封装](#http类的封装)
* [model模块的引入](#model模块的引入)
* [setData](#setdata)
* [自定义事件的监听与激活](#自定义事件的监听与激活)
    * [自定义事件激活](#自定义事件激活)
    * [自定义事件监听](#自定义事件监听)
    * [点赞与取消点赞](#点赞与取消点赞)
* [组件的扩展和生命周期函数](#组件的扩展和生命周期函数)
    * [定义生命周期函数](#定义生命周期函数)
    * [properties与data](#properties与data)
    * [properties与data的怪现象](#properties与data的怪现象)
    * [observer函数的应用](#observer函数的应用)
* [navi组件](#navi组件)
    * [behavior函数的使用](#behavior函数的使用)
    * [微信小程序缓存](#微信小程序缓存)
    * [写入缓存后出现的问题](#写入缓存后出现的问题)
* [hidden与wx:if](#hidden与wxif)
    * [应用](#应用)
* [music组件](#music组件)
    * [页面的音乐组件](#页面的音乐组件)
    * [播放管理器](#播放管理器)
    * [设置音乐播放时图片旋转](#设置音乐播放时图片旋转)
* [promise](#promise)
    * [promise的基本用法](#promise的基本用法)
    * [book组件使用promise来构造](#book组件使用promise来构造)
    * [错误的使用promise](#错误的使用promise)
* [book组件](#book组件)
    * [列表渲染](#列表渲染)
    * [项目型组件与通用性组件](#项目型组件与通用性组件)
    * [标签组件](#标签组件)
    * [自定义组件样式一](#自定义组件样式一)
    * [自定义组件样式二](#自定义组件样式二)
    * [实现段落间空行和开头空两格的效果](#实现段落间空行和开头空两格的效果)
    * [wxs的使用](#wxs的使用)
    * [模块](#模块)
    * [替换元素](#替换元素)
    * [开启loading和关闭loading](#开启loading和关闭loading)
    * [Promise.all()和Promise.race()](#Promise.all()和Promise.race())
    * [onReachBottom函数](#onReachBottom函数)
* [my页面](#my页面)
    * [获取用户信息](#获取用户信息)
* [分享组件](#分享组件)


## 布局

### 普通布局
* 一般一个view组件代表一行（块状元素），也就是说一般都是纵向分布的，当然我们也可以横向布局
* 一般高度没设置是自适应


        .chunk{
            width: 100px;
            height: 100px;
            display: inline-block;  /*消除块状影响，使元素纵向分布*/
            background-color: aqua;     /*设置颜色*/
        }
        
* 不过一般不使用这个，使用更强大的flex布局


### flex布局
* flex布局本身就消除了块状元素的影响，使元素横向布局（默认），当然我们还可以做各种各样的布局
* display属性，属性值：flex（开启flex布局）
* flex-direction属性，属性值：row，column，row-reverse，column-reverse（分别开启横向，纵向以及它们的倒序布局
* justify-content属性，设置布局的对齐方向
    * flex-end：向右或者向下对齐（如果是reverse则相反）
    * flex-start：向左或者向上对齐（如果是reverse则相反）
    * center：居中对齐
    * space-between：使最左边的元素靠左对齐，最右边的元素靠右对齐，居中的元素等距对齐
    * space-around：等距分布，每个元素边等距
* flex-wrap
    * wrap：消除间距（如果横向的元素已经大于设置的宽度，它不会自动换行，需要这个属性帮助换行）


#### 主轴与交叉轴
* flex-direction设置主轴，如果为row则横向为主轴，如果为column则纵向为主轴，另一方向为交叉轴。justify-content设置主轴的的布局，align-items设置交叉轴的布局
* align-items
    * flex-end：向右或者向下对齐（如果是reverse则相反）
    * flex-start：向左或者向上对齐（如果是reverse则相反）
    * center：居中对齐
    * baseline：设置字体底部对齐，以第一个字体为准
    * stretch：如果没有设置交叉轴元素的长度，则拉伸为容器长度


各种属性的用法

        .container{
            display: flex;  /*flex布局*/
            flex-direction: row;    /*设置行为主轴*/
            justify-content: flex-start;    /*设置主轴布局*/
            align-items: center;    /*设置交叉轴居中*/
            height: 200px;      /*设置高度*/
            background-color: black;    /*设置背景颜色*/
            flex-wrap: wrap;    /*消除间距*/
        }
        .chunk{
            width: 150px;
            height: 100px;
        }
        .color1{
            background-color: aqua;
        }
        .color2{
            background-color: antiquewhite;
        }
        .color3{
            background-color: red;
        }

![](/jiudao/1.png)


## 组件
* 自定义组件的使用大大提高了我们开发的效率，使代码可以复用，不写重复的代码等等

### page页面的巧用
* 微信小程序会在page页面中的wxml最外层包裹一层<page></page>,我们在定义全局样式的时候可以利用这个设置全局样式


        page{
            font-family: "NSimSun";
            font-size: 32rpx;
        }

### 组件的继承
* 组件只能继承极少数全局样式，比如font和color，其他的则不能继承。而page页面能继承大部分全局样式

### like组件
* 一个点赞的组件
* 自定义组件和引用组件：创建一个component文件夹，里面可以定义各种组件，在微信小程序中创建component文件。然后在page页面json文件引用组件


        {
          "usingComponents": {
            "v-like": "/component/like/index"
          }
        }
最后在wxml中<v-like />引用这个组件
* css文件


        /* component/like/index.wxss */
        .container{
            display: inline-flex;   /*消除flex容器块状特性并且保持flex特性*/
            flex-direction: row;
            padding: 10rpx;     /*设置内边距*/
        }
        .container image{
            width: 32rpx;
            height: 28rpx;
        }
        .container text{
            color: #bbbbbb;
            position: relative;     /*设置位置，相对原来的位置*/
            font-size: 24rpx;
            line-height: 24rpx;     /*消除文字空白间距*/
            bottom: 10rpx;          /*向上偏移,发现偏移量不够，因为文字有空白间距，需要消除*/
            left: 8rpx;             /*向右偏移*/
        }

#### 事件
* 事件分为冒泡事件和非冒泡事件：
    * 冒泡事件（bind）：当一个组件上的事件被触发后，该事件会向父节点传递。
    * 非冒泡事件（catch）：当一个组件上的事件被触发后，该事件不会向父节点传递。

* 现在需要一个定义一个事件来监控点赞，在js文件methods中定义，在wxml中引用
    * bind:tap="函数名"
    * catch:tap="函数名"
    


                methods: {
            /*点赞函数*/
            onLike: function (event) {
              console.log(event)
            }
          }
        
            <!--tap：手指触摸后马上松开-->
            <view bind:tap="onLike">
            Click here!
        </view>
        
* 数据绑定
* 有三种方法写入数据，1.直接写死在wxml中 2.js中传数据到wxml中 3.服务器传给js，js传给wxml
    * 数据绑定：在wxml中引用js中的数据则需要数据绑定，先把数据写入到js文件的data中，在wxml中用双花括号引用（很多时候需要用到三元表达式）
    


        data: {
        like: false,
        count1: 99,
        count2: 999,
        yesSrc: 'images/like.png',
        noSrc: 'images/like@dis.png'
      },

        <view bind:tap="onLike" class="container">
            <image src="{{like?yesSrc:noSrc}}"></image>
            <text>{{like?count1:count2}}</text>
        </view>

* 封装与开放

js中的数据，有些需要写死则要封装，有些不能写死就开放。封装的写在data中，开放的写在properties中


        data: {
            //数据绑定
            //是封装起来的
            yesSrc: 'images/like.png',
            noSrc: 'images/like@dis.png'
          },
          
          
          properties: {
            //开放的属性，可以动态变化的
            //里面的属性有三个值，type是一定要写的，value不写则为默认值，还有observer函数暂时用不到
            like: {
              type: Boolean,
              observe: function () {
                
              }
            },
            count: {
              type: Number
            }
          },

* 点赞函数


        methods: {
            /*点赞函数*/
            onLike:function (event){
              let like=this.properties.like;  //this函数引用这个widow中的属性
              let count=this.properties.count;
        
              count = like?count-1:count+1;
              /*设置数据*/
              this.setData({
                count: count,
                like: !like
              })
            }
          }
          

## 访问API

### 生命周期函数
* 在page页面的js文件中存在着各种生命周期函数，用来监听页面的各种变化，我们可以把请求写在生命周期函数(写在前面的先加载)中，比如wx.request


        wx.request({
                url: '你请求的地址',
                method: 'GET,POST,PUT方法',
                data: {
                    data: ''
                },
                header: {
                  'appkey': config.appkey  
                },
                success: (res)=>{
                    
                }
            })


### 同步异步与回调函数
* 同步就是必须一步一步来，执行一个函数（不只是函数）的时候，下一个必须等着上一个执行完毕
* 异步就是不用等待上一个函数执行完毕，所有函数异步执行（wx.request就是一个异步函数）
* 回调函数存在在异步中，success就是回调函数，返回的是获取得到的数据
* 使用回调函数剥夺了函数return的能力，只有同步函数才有return，而异步只有回调函数

### ES6中的this指向问题
* 太多了，记得百度（重点，一定要理解），还要搞清箭头函数的this指向

            
### 通用错误异常处理
* 不可能每次都运行都是正确的，我们通常需要设定一些错误异常处理
* 正确情况，一般都是2开头的状态码，这里可以用到一个方法，判断开头的数字
    * startsWith()，注意这两个方法必须转换为字符串
    * endsWith(),判断结尾的数字
    


        /*startsWith方法，处理开头状态码为2，注意要转换为字符串*/
        let code=res.statusCode.toString();
        if(code.startsWith('2')){
            params.success(res.data)
        }
* 错误情况
    * 自定义错误代码
    


        /*自定义错误码信息*/
        const tips = {
            1:'抱歉出现了一个错误',
            1005:'appkey错误，请前往www.7yue.pro申请appkey',
            3000:'期刊错误'
        }
    
    
    
* 定义处理错误方法
    


        /*错误处理方法,下划线默认代表私有，但却不是真正的私有，es6中现在还没有真正的私有方法*/
        static _show_error(error_code){
            if(!error_code){
                error_code=1
            }
            wx.showToast({
              title: tips[error_code],
                icon: 'none',
                duration: 2000
            })
        }
        
### Http类的封装
* 每次请求都写wx.request()，代码太多，都是重复的，我们可以把这些代码封装起来，以后可以复用


        static request(params){
                if (!params.method){
                    params.method='GET'
                }
                wx.request({
                    url: config.apiBaseUrl + params.url,
                    method: params.method,
                    data:params.data,
                    header: {
                        'content-type': 'application/json',
                        'appkey': config.appkey
                    },
                    success: (res)=>{
                        let code=res.statusCode.toString();
                        /*startsWith方法，处理开头状态码为2，注意要转换为字符串*/
                        if(code.startsWith('2')){
                            params.success(res.data)
                        }
                        else {
                            /*res.data.error_code返回的数据错误码*/
                            this._show_error(res.data.error_code)
                        }
                    },
                    /*fail出现的一个场景是断网*/
                    fail: (err)=>{
                        this._show_error(1)
                    }
                })
            }
            
## model模块的引入
* model模块一般封装各种类，方法，比如把http请求封装到方法里面


        class ClassicModel{
            static getLatest(callback){
                Http.request({
                    url: 'classic/latest',
                    success: (res)=>{
                        callback(res)
                    }
                });
            }
        }
        
* 使用回调函数剥夺了函数return的能力，只有同步函数才有return，而异步只有回调函数（引用方法传入的参数也是回调函数）


        onLoad: function (options) {
              ClassicModel.getLatest((res)=>{
                /*数据更新*/
                this.setData({
                  classic: res
                })
              })
          },

## setData
* setData的作用是数据更新，而不是设置数据，在更新数据前，最好给数据在data中设置一个默认值


        data: {
            classic: null,
          },
          
然后再在函数中更新数据


        onLoad: function (options) {
              ClassicModel.getLatest((res)=>{
                /*数据更新*/
                this.setData({
                  classic: res
                })
              })
          },
          
          
## 自定义事件的监听与激活
* 点赞事件中，虽然说现在可以进行点赞和取消，但是每次一刷新就会重置，并没有上传到服务端，我们需要自定义一个事件来监听，并上传到服务端
* 出于对like组件的封装与复用性，我们需要把对应的函数写到classic页面

### 自定义事件激活
* 哪里可以监听到like的状态呢，那么只有在like组件中
* 自定义组件触发事件时，需要使用  triggerEvent  方法，指定事件名、detail对象和事件选项。

其中，like 表示自定的事件， status: status  表示  detail  对象，事件选项的属性不可以开发者自己定义，有bubbles、composed、capturePhase



        /*自定义事件，激活*/
        let status=this.properties.like?'like':'cancel';
        /*事件名取为like*/
        this.triggerEvent('like',{
          status: status
        },{})
        


### 自定义事件监听
* 自定义事件绑定在组件上，并触发相应的函数。


        <v-like like='{{classicData.like_status}}' count='{{classicData.fav_nums}}' bind:like='onLike'></v-like>
        
### 点赞与取消点赞
* 新建一个新的模块 like ，引入 Http 类的目的是为了发送网路请求，且根据 like_or_cancel 值的不同，调用不同的接口，完成点赞与取消点赞。记住是POST请求


        class LikeModel {
            static getLike(like_or_cancel, artID, category){
                let url = like_or_cancel == 'like'?'/like':'/like/cancel';
                Http.request({
                    url: url,
                    method: 'POST',
                    data: {
                        art_id: artID,
                        type: category
                    },
                    success: (res)=>{
                        console.log(res)
                    }
                })
            }
        }
        

在classic组件中，引入 like 组件，并调用 like 方法。

        onLike: function(event){
            console.log(event);
            LikeModel.getLike(event.detail.status, this.data.classic.id, this.data.classic.type)
          },

## 组件的扩展和生命周期函数
* 组件的生命周期，指的是组件自身的一些函数，这些函数在特殊的时间点或遇到一些特殊的框架事件时被自动触发。
其中，最重要的生命周期是 created attached detached ，包含一个组件实例生命流程的最主要时间点。
* 组件实例刚刚被创建好时， created 生命周期被触发。此时，组件数据 this.data 就是在 Component 构造器中定义的数据 data 。 此时还不能调用 setData 。 通常情况下，这个生命周期只应该用于给组件 this 添加一些自定义属性字段。
* 在组件完全初始化完毕、进入页面节点树后， attached 生命周期被触发。此时， this.data 已被初始化为组件的当前值。这个生命周期很有用，绝大多数初始化工作可以在这个时机进行。
* 在组件离开页面节点树后， detached 生命周期被触发。退出一个页面时，如果组件还在页面节点树中，则 detached 会被触发


### 定义生命周期函数
* 生命周期方法可以直接定义在 Component 构造器的第一级参数中。
自小程序基础库版本 2.2.3 起，组件的的生命周期也可以在 lifetimes 字段内进行声明（这是推荐的方式，其优先级最高）。


        lifetimes: {
        attached: function() {
              // 在组件实例进入页面节点树时执行
            },
            detached: function() {
              // 在组件实例被从页面节点树移除时执行
            },
        created: function() {
              // 在组件实例刚刚被创建时执行，注意此时不能使用setData
            },
            ready: function() {
              // 在组件在视图层布局完成后执行
            },
            moved: function() {
              // 在组件实例被移动到节点树另一个位置时执行
            },
            }
            
* 我们常用的生命周期函数是ready和attached，我们测试常用的是attached，注意生命周期函数不是写在methods里面，可以直接写在外面


### properties与data
* 默认值的设置


        properties: {
            index: Number,  /*设置对象类型，有默认值0*/
        },
        data: {
            month: '',      /*data设置默认值，空字符串代表字符类型*/
            year: 0
        }
        

### properties与data的怪现象
* 微信小程序官方把两个对象是整合到一个对象里面的，输出其中一个对象的时候会连带着把另一个对象输出出来，注意两个对象里面不能定义相同名字的属性，否则properties里的属性会把data里面的覆盖


### observer函数的应用
* 这个函数的意义在于，当我们改变值的时候，微信小程序会主动调用这个函数，往这个函数传值，也就是这三个参数：newVal,oldVal,changedPath（新值，老值和改变的路径）
* 记住不能在observer函数中去改变属性值，会出现无限递归的现象，也就是死循环


        properties: {
              //月份的值
              index:{
                  type:String,
                  //不能在observer函数中去改变属性值,容易出现无限加载死循环!
                  observer:function(newVal,oldVal,changedPath){
                    let val = newVal < 10 ? '0'+newVal :newVal;//判断值如果是个位数前面补0 否则输出原来的值
                    //更新数据
                    this.setData({
                      // index:val,val赋值 但是会导致递归加载 内存耗尽,所以在data中改变值
                      _index:val
                    })
                  }
              },
          },
          
## navi组件
* 需要根据页面显示是否禁用，设置监听事件，参考like组件

### behavior函数的使用
* behaviors 是用于组件间代码共享的特性，类似于一些编程语言中的“mixins”或“traits”。

每个 behavior 可以包含一组属性、数据、生命周期函数和方法。组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。 每个组件可以引用多个 behavior ，behavior 也可以引用其他 behavior 
* 定义Behavior和Component结构是差不多的


        let classicBeh = Behavior({
            properties: {
                img: String,
                content: String
            },
            data: {
        
            },
            methods: {
        
            }
        })
        
        export {
            classicBeh
        }

* 我们可以把组件的公用部分放进去，需要用的时候在Component导入就行


        behaviors:[classicBeh],
        

### 微信小程序缓存
* 通过微信小程序的缓存（storage）获取最新期刊号


        static _setLatestIndex(index){
                /*同步设置保存最新期刊号，key，value的方式*/
                wx.setStorageSync('latest', index);
            }
        
            static _getLatestIndex(){
                /*获取最新期刊号，用设置的key来获取*/
                return wx.getStorageSync('latest');
            }
            
* 在getLastest回调函数中写入


        /*用缓存设置最新期刊号*/
        this._setLatestIndex(res.index)
        
#### 写入缓存后出现的问题
* 当我们把所有返回数据都写入缓存之中后，那些动态改变的数据将不会改变，甚至会出现错误。我们应该只把那些不变化的数据写入缓存，而不把那些动态变化的写入缓存，比如like组件的点赞数和点赞状态
* 写入缓存之前like和count都是用classic中的数据，我们需要把这两个数据提取出来，重新设置


        like="{{likeStatus}}"
        count="{{likeCount}}"
        

* 然后我们需要知道点赞状态和点赞数量


        GET     classic/<int:type>/<int:id>/favor
        type: 必填, 点赞类型
        id: 必填, 点赞对象的id号
        
        
        /*获取页面点赞状态*/
    static getClassicLikeStatus(artID, category, callback){
        let url = `classic/${category}/${artID}/favor`
        Http.request({
            url: url,
            success: (res)=>{
                callback(res)
            }
        })
    }
    
* classic页面


        /*获取页面的点赞状态信息*/
            _getLikeStatus(artID, category) {
                LikeModel.getClassicLikeStatus(artID, category, (res) => {
                    /*更新点赞数和点赞状态，因为这个是实时更新的，不能写入缓存当中，需要额外更新*/
                    this.setData({
                        likeCount: res.fav_nums,
                        likeStatus: res.like_status
                    })
                })
            }
            

## hidden与wx:if
* 因为 wx:if 之中的模板也可能包含数据绑定，所以当 wx:if 的条件值切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。
* 同时 wx:if 也是惰性的，如果在初始渲染条件为 false，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。
相比之下，hidden 就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。
* 一般来说，wx:if 有更高的切换消耗而 hidden 有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用 hidden 更好，如果在运行时条件不大可能改变则 wx:if 较好。
* wx:if 是一个控制属性，需要将它添加到一个标签上。如果要一次性判断多个组件标签，可以使用一个 <block/> 标签将多个组件包装起来，并在上边使用 wx:if 控制属性


        /*当classic.type==200时渲染*/
        <v-music wx:if="{{classic.type==200}}"
                 img="{{classic.image}}"
                 content="{{classic.content}}"
                 src="{{classic.url}}"
                 title="{{classic.title}}">
        </v-music>
        
        /*当classic.type!=300时隐藏*/
        <v-essay hidden="{{classic.type!=300}}"
         img="{{classic.image}}"
         content="{{classic.content}}">
        </v-essay>

* 注意：hidden不能直接在自定义组件中使用，只能在小程序官方的组件中使用，wx:if则能在自定义组件中使用
* 还要需要注意的是用了hidden生命周期函数将会失效，生命周期函数只会在wx:if中生效

### 应用
在classic页面中我们需要动态的显示essay，movie，和music组件，这样我们就需要用到它们


        <v-movie hidden="{{classic.type!=100}}"
                 img="{{classic.image}}"
                 content="{{classic.content}}">
        </v-movie>
        <v-music wx:if="{{classic.type==200}}"
                 img="{{classic.image}}"
                 content="{{classic.content}}"
                 src="{{classic.url}}"
                 title="{{classic.title}}">
        </v-music>
        <v-essay hidden="{{classic.type!=300}}"
                 img="{{classic.image}}"
                 content="{{classic.content}}">
        </v-essay>
        
## music组件

### 页面的音乐组件
* 获取新版背景音乐管理器


        const mMgr = wx.getBackgroundAudioManager()
        

* 设置绑定用来切换播放状态图片，然后根据title和src属性来播放音乐


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
            

* 这时我们会发现，切换页面其他的的播放图标也是打开的，我们需要把它关闭，这里我们需要用到生命周期函数detached，还需要在claasic页面设置成wx:if，因为hidden不能使用生命周期函数


        detached: function(event){
            //wx:if 和hidden的区别要搞清
            //这里使用wx:if将重新渲染，切换时变成默认状态，并停止音乐，用hidden将不会，hidden只是简单的隐藏和显示
            mMgr.stop()     //关闭音乐
          },

* 这时切换页面，将会关闭音乐，然后页面数据将会以默认数据渲染（wx:if的功能），似乎达到了我们预期的目标，但是一个app应该带有后台播放功能，因此我们需要将mMgr.stop()注释掉
* 这样我们如何来实现切换页面时，其他的页面处于关闭状态呢


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

### 播放管理器
* 我们播放音乐的时候会有一个播放管理器，我们会发现我们点击播放管理器，播放状态图标不会切换，我们需要做到同步，可以复用上一段代码，这就是封装的好处


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

* 然后只需要在attached生命周期函数中使用这两个函数即可


        /*注意：hidden不执行任何生命周期函数，只有wx:if执行*/
          /*页面生成时执行*/
          attached: function(event){
            this._recoverStatus()
            this._monitorSwitch()
          },

### 设置音乐播放时图片旋转
* 一般音乐播放时都会有旋转的动画功能，我们只需要在音乐组件的wxss样式中加入


        /*音乐播放动画旋转效果*/
        @-webkit-keyframes rotation {
            from {
                -webkit-transform: rotate(0deg);
            }
        
            to {
                -webkit-transform: rotate(360deg);
            }
        }
        
        .rotation {
            -webkit-transform: rotate(360deg);
            animation: rotation 12s linear infinite;
            -moz-animation: rotation 12s linear infinite;
            -webkit-animation: rotation 12s linear infinite;
            -o-animation: rotation 12s linear infinite;
        }

* wxml文件


        class="classic_img {{playing?'rotation':''}}"
        

## promise
* 三种处理异步函数的办法
    * callback回调函数：缺点是很容易形成回调地狱，剥夺了函数return的能力
    * promise：优点：多个异步等待合并，没有剥夺函数return的能力，不需要层层传递callback，解决了回调地狱的问题
    * async和await：ES2017 小程序现在暂时不支持

### promise的基本用法
* 1.Promise是一个对象，而不是一个函数。这就解释了为什么promise能解决回调地狱等问题，因为对象可以保存状态，而函数不能保存状态（闭包函数除外）
* 2.Promise的初步使用，把异步代码写入promise中
* 3.Promise包含三种状态，pending（进行中），fulfilled（已成功），rejected（已失败）。promise new出来的时候就是进行中，我们需要把它转换成已成功或者已失败，注意转换完成以后它将会凝固，将不会进行改变


        //new一个promise对象，注意参数是一个函数，resolve保存成功状态，reject保存失败状态
            const promise = new Promise((resolve, reject)=>{
              wx.getSystemInfo({
                success: res => resolve(res),
                fail: error => reject(error)
              })
            })
        
            //then函数来调用promise的结果
            promise.then(
              res => console.log(res),
                error => console.log(error)
            )

* 把promise变成一个变量，就不需要每层传递回调函数，因为promise变量可以到处用，需要用的时候就调用promise.then()函数

### book组件使用promise来构造
注意每次返回的都是一个promise对象
* 重构request


        /*promise重构request*/
            static _request(url,resolve,reject,data={},method='GET'){
                wx.request({
                    url: config.apiBaseUrl + url,
                    method: method,
                    data: data,
                    header: {
                        'content-type': 'application/json',
                        'appkey': config.appkey
                    },
                    success: (res)=>{
                        let code=res.statusCode.toString();
                        /*startsWith方法，处理开头状态码为2，注意要转换为字符串*/
                        if(code.startsWith('2')){
                            resolve(res.data)
                        }
                        else {
                            reject()       //错误是不需要返回数据的
                            /*res.data.error_code返回的数据错误码*/
                            this._show_error(res.data.error_code)
                        }
                    },
                    /*fail出现的一个场景是断网*/
                    fail: (err)=>{
                        reject()
                        this._show_error(1)
                    }
                })
            }

* new 一个promise对象并return


        static request({url,data={},method='GET'}){
                return new Promise((resolve, reject)=>{
                    this._request(url,resolve,reject,data,method)
                })
        
            }

* 调用http请求


        static getHotList(){
                return Http.request({
                    url: 'book/hot_list',
                })
            }
            
### 错误的使用promise
* 当我们需要链式的调用多个API（层层调用），我们很容易错误的使用promise


        //错误的使用promise，层层嵌套，还是形成了回调地狱
            const hotlist = BookModel.getHotList()
            hotlist.then(
                res=>{
                  console.log(res)
                  BookModel.getMyBookCount().then(
                      res=>{
                        console.log(res)
                        BookModel.getMyBookCount().then(
                            res=>{
                              console.log(res)
                            }
                        )
                      }
                  )
        
                }
            )
            }


* 正确的使用promise，每层返回promise对象，这样就是平行的，不会形成回调地狱


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
            

## book组件

### 列表渲染
* 相当于for循环，循环显示组件，wx:for="",最外层应该包裹一个block标签，books代表一个数组，item（特殊关键字）是数组中的一个数据


        <block wx:key="id" wx:for="{{books}}">
           <v-book book="{{item}}"></v-book>
        </block>
        

* wx:key=""的作用，如果不加这个将会显示一些警告，这个的作用


### 项目型组件与通用性组件
* 把跳转事件写在组件中还是页面中这是一个很值得思考的问题，如果写在组件中，降低了通用性，我们用这个组件的时候，任何时候都会跳转。如果写到页面当中那么就只有在这个页面点击才会跳转
* 如何从一个页面跳转的另一个页面，wx小程序给我们提供了wx.navigateTo()


        /*携带参数跳转到指定页面,路由地址后面的是携带的参数*/
                wx.navigateTo({
                  url: `/pages/book-details/book-details?bid=${bid}`
                })

* 还有就是设置监听事件this.triggerEvent（'',{},{}）
* 传过去的参数将有跳转页面的onLoad函数


        onLoad: function (options) {
              const bid = options.bid;    /*接收页面传来的参数*/
        }
        

### 标签组件
* 我们写标签组件的时候会遇到一个难点，因为我们的标签组件有两种样式，一种是带点赞数目的，一种是不带的，这时我们将会用到插槽
* 插槽slot的使用，在tag标签组件中设置


        <view class="container">
            <text>{{comment}}</text>
            <!--    插槽的使用，命名为after-->
            <slot name="after"></slot>
        </view>

* 这时插槽还不能生效，需要在tag的js文件中启用插槽


        /*启用slot插槽*/
          options: {
            multipleSlots:true
          },

* 使用插槽，注意需要到v-tag组件当中


        <v-tag comment="{{item.content}}">
            <!--使用插槽-->
            <text class="num" slot="after">{{'+' + item.nums}}</text>
        </v-tag>
        

### 自定义组件样式一
* 我们设置组件css样式的时候，所有组件的样式都会是一样的，这个叫做默认样式，我们还可以自定义组件样式来改变组件的样式，这里将会用到css选择器
* .tags_container下第n个v-tag组件下的view标签，注意必须要view标签，因为自定义组件和小程序的内置的组件是有区别的，不带view，css选择器不会生效，因为v-tag组件中有很多个内置组件，css选择器不知道对其中那个组件生效，对其中的view生效就是对整个v-tag组件生效


        /*子元素选择器，注意子元素选择器和后代选择器的区别，随心所欲的修改样式*/
        .tags_container > v-tag:nth-child(1) > view{
            background-color: #fffbdd;
        }
        
        .tags_container > v-tag:nth-child(2) > view{
            background-color: #eefbff;
        }

* 这是一种hack的方式，强行修改，违背了开源组件封装的原则，没有经过组件就强行修改了（组件属性和slot的使用就没有违反这种规则，因为这个都是在组件当中写好的），但是它是可行的，自己用的时候可以用这种办法，因为它非常方便

### 自定义组件样式二
* 如何使用开源组件封装的原则，来实现自定义组件样式
* 组件属性和slot（参数传递）实现了js文件和html/wxml文件之间的传递，那么有没有css/wxss文件之间的传递呢，当然有，那就是外部样式 externalClass，同样在组件当中设置


        /*外部样式，外部样式可以有多个，所以这里是一个数组*/
          externalClasses:['tag-class'],
          

* 在组件wxml文件中引入样式


        /*在wxml文件中引入样式*/
        <view class="container tag-class">
        
* 在页面wxss中编写外部样式


        /*编写外部样式，自己取名*/
        .ex-tag1{
            background-color: #fffbdd;
        }
        
        .ex-tag2{
            background-color: #eefbff;
        }

* 页面wxml文件中引入


        <!--index代表序号-->
        <v-tag tag-class="{{index==0?'ex-tag1':''||index==1?'ex-tag2':''}}" comment="{{item.content}}">
                    <!--使用插槽，注意需要在tag组件当中-->
                    <text class="num" slot="after">{{'+' + item.nums}}</text>
                </v-tag>

* 但是这样还是不会进行外部样式对普通样式的覆盖效果，因为微信小程序当中没有指出后面的样式一定会覆盖前面的样式，它是不确定的，我们可以设置优先级


        .ex-tag1{
            background-color: #fffbdd !important;
        }
        
        .ex-tag2{
            background-color: #eefbff !important;
        }

* 我们自己修改样式建议用hack方式


## 实现段落间空行和开头空两格的效果
* 通过原始数据我们发现原本的'\n'是'\\\\n'，我们需要把它全部替换，实现空格的效果

### wxs的使用
* WXS 代码可以编写在 wxml 文件中的 <wxs> 标签内，或以 .wxs 为后缀名的文件内，目的是为了在wxml中编写或者调用js代码
* 需要注意的是wxs虽然和javascript很像，但是两者并不是同一种语言，其中也会有一些不同的地方，写wxs文件的时候可以依照es5的基础语法来写，但是出了问题记得查文档

### 模块
* 每一个 .wxs 文件和 <wxs> 标签都是一个单独的模块。

每个模块都有自己独立的作用域。即在一个模块里面定义的变量与函数，默认为私有的，对其他模块不可见。

一个模块要想对外暴露其内部的私有变量与函数，只能通过 module.exports 实现


        /*把文本替换成123123，注意这里只能写var不能写const，因为const不是wxs的语法*/
        var format = function(text){
            return '123123'
        }
        
        module.exports = {
            format:format
        }

* 引用wxs文件


        <!--导入文件，注意路径只能写相对路径-->
        <wxs src="../../util/filter.wxs" module="util"/>
        
        <!--使用文件-->
        <text class="content" >{{util.format(bookDetails.summary)}}</text>


### 替换元素
* 我们需要把文本中的\\\\n全部替换成\n,这里我们将会用到正则表达式
* 使用正则表达式需要用到regexp,生成 regexp 对象需要使用 getRegExp函数。
    

        getRegExp(pattern[, flags])


* 参数：
    * pattern: 正则表达式的内容。
    * flags：修饰符。该字段只能包含以下字符:
        * g: global
        * i: ignoreCase
        * m: multiline。



        var format = function(text){\
            /*注意这里，因为text初始和更新会加载两次，但是text没有初始，只有更新，所以当没有初始的时候应该直接返回*/
            if(!text){
                return
            }
            /*把文本里面的'\\\\n'全部替换*/
            var reg = getRegExp('\\\\n','g')
            /*返回替换完之后的数据，&nbsp是空格的编码*/
            return text.replace(reg,'\n&nbsp;&nbsp;')
        }

* 开启编码方式，这个时候我们会发现空格编码并没有生效


        <!--decode是开启编码方式，是空格编码生效-->
        <text class="content" decode="{{true}}">{{util.format(bookDetails.summary)}}</text>
        

### 开启loading和关闭loading
* 从服务器加载数据需要一定的时间，我们可以设置一个loading，直到数据加载完毕就关闭这个loading
* 开启loading很容易，在onLoad函数的开始wx.showLoading()，但是我们怎么知道数据加载完毕的时间呢，因为是异步的任务，所以在函数的最后写上wx.hideLoading()是不对的


#### Promise.all()和Promise.race()
* Promise.all()是把所有的promise合体，返回一个新的promise，数组里面的都是promise，这样我们还可以很简单的判断数据加载完成，关闭loading


        Promise.all([bookDetails,comments,likeStatus])
                  .then((res)=>{
                    this.setData({
                      bookDetails: res[0],
                      comments: res[1].comments,
                      likeStatus: res[2].like_status,
                      likeCount: res[2].fav_nums
                    })
                    /*页面加载完成，关闭loading*/
                    wx.hideLoading();
                  });

* Promise.race()和Promise.all()的区别是，前者是最快的子promise执行完就调用回调函数，而后者是等待所有的子promise执行完才调用回调函数


### onReachBottom函数
* 页面上拉触底事件的处理函数，当页面拉到最底端就会触发此函数
* 在搜索组件搜索书籍返回数据时，本来只会返回20组数据，但是我们需要在下拉时返回剩余数据，这时我们需要用到页面onReachBottom函数，注意此函数只能在页面中使用，而不能在组件中使用
* 我们该如何能在组件中实现呢，这就要在组件中设置一个属性来监听


        properties: {
            more:{
              type: String,
              /*observer函数在属性值改变的时候就会触发*/
              observer: 'loadMore'
            }
          },
          

* 然后在页面只要触底就改变more的值


        const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        
        const random = function generateMixed(n) {
            var res = '';
            /*Math.ceil()是取一个比它大的整数，Math.random()是产生一个0~1的小数，乘35就产生一个0~35的随机数*/
            const id = Math.ceil(Math.random()*35);
            for(var i=0;i<n;i++){
                res+=chars[id]
            }
            return res
        }
        
        export {
            random
        }
        


        onReachBottom: function () {
              this.setData({
              /*随机生成一个16个字符的字符串*/
                more: random(16)
              })
          },

* 下拉就加载更多数据


        BookModel.search(this.getCurrentStart(),this.data.q).then((res)=>{
                  /*两个数组组合起来*/
                  this.setMoredata(res.books);
                },)

* 为了避免拉动太快，重复请求，需要设置一把锁，当一个请求在进行的时候，其他请求只能等待


        this._locked();   /*上锁*/
                BookModel.search(this.getCurrentStart(),this.data.q).then((res)=>{
                  /*两个数组组合起来*/
                  this.setMoredata(res.books);
                  this._unLocked();   /*解锁*/
                },()=>{
                  /*当出现错误的时候也需要解锁，避免死锁*/
                  this._unLocked();
                })
                

* 还有一个问题就是，当服务器没有更多数据的时候就不要发送请求


        if(this.hasMore()){
                /*
                * loading的设置记得一定要写在if里面，如果不写在里面将会出现一种情况
                * 当this.hasMore为false的时候，loading将会一直是true，等下次关闭页面，重新加载
                * 的时候可能只会出现二十个数据
                * */
                this._locked();   /*上锁*/
                BookModel.search(this.getCurrentStart(),this.data.q).then((res)=>{
                  /*两个数组组合起来*/
                  this.setMoredata(res.books);
                  this._unLocked();   /*解锁*/
                },()=>{
                  /*当出现错误的时候也需要解锁，避免死锁*/
                  this._unLocked();
                })
              }

* 还有一个问题，我们叉掉一个页面，再次点击，还会出现以前的数据，我们需要在取消或者叉掉页面的时候数据清零
* 在加载的时候我们还需要设置一个动画来加载，这里我们可以定义一个组件loading，在加载初始页面和下拉时显示


        <view class="spinner">
          <view class="double-bounce1"></view>
          <view class="double-bounce2"></view>
        </view>
        
        
        .spinner {
          width: 40rpx;
          height: 40rpx;
          position: relative;
          /* margin: 100px auto; */
        }
         
        .double-bounce1, .double-bounce2 {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #3063b2;
          opacity: 0.6;
          position: absolute;
          top: 0;
          left: 0;
           
          -webkit-animation: bounce 2.0s infinite ease-in-out;
          animation: bounce 2.0s infinite ease-in-out;
        }
         
        .double-bounce2 {
          -webkit-animation-delay: -1.0s;
          animation-delay: -1.0s;
        }
         
        @-webkit-keyframes bounce {
          0%, 100% { -webkit-transform: scale(0.0) }
          50% { -webkit-transform: scale(1.0) }
        }
         
        @keyframes bounce {
          0%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
          } 50% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
          }
        }
        


### 特别注意setData与直接赋值的区别
* 当我们需要在页面用到的数据时一定要setData更新数据


### 当我们在空搜索时会返回一个空页面，这样不太合适，需要给用户一些提示
* 这个很好判断，total为零的时候，就显示，记得清零的时候需要设置成原来的值


## my页面

### 获取用户信息
* 获取用户信息有很多种办法，其中一种最简单的就是open-data，但是open-data只能够把他显示在页面上，而不能够使用这些信息


        /*示例代码，分别为获取用户头像和性别*/
        <open-data type="userAvatarUrl"></open-data>
        <open-data type="userGender" lang="zh_CN"></open-data>

* wx.getUserInfo()接口，此前这个接口，可以随时在需要使用的时候弹出授权窗口，进行授权，但是为了防止开发者滥用此接口，经过改版，此接口在未授权的情况下不能进行使用
* 如何在未授权的情况下弹出授权窗口呢，微信小程序提供了一个button组件供我们授权，而且只能用button，用户点击这个组件才能进行授权，我们需要在button中插入图片，如何插入图片呢，可以把它再次封装成一个组件，再构造分享组件的时候也可以使用，插入图片的时候可以使用插槽
* bindgetuserinfo：   用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致，open-type="getUserInfo"时有效


        /*plain为true就是把button组件透明化*/
        /*使用插槽的目的是插入不同的图片*/
        <button class="container" plain="{{true}}"
                open-type="{{openType}}" bindgetuserinfo="onGetUserInfo">
            <slot name="img"></slot>
        </button>

* 组件的使用


        <v-button wx:if="{{!setting}}" class="avatar-position" open-type="getUserInfo" bind:getuserinfo="onGetUserInfo">
                <image class="avatar" slot="img" src="/images/my/my.png" />
            </v-button>


        onGetUserInfo(event){
              /*用户信息*/
                const userInfo = event.detail.userInfo;
                if(userInfo){
                    this.setData({
                        userInfo: userInfo,
                        setting: true
                    })
                }
            },

* 如果是已经授权，如何获取用户信息，wx.getSetting()接口与之前的wx.getUserInfo()进行结合使用，wx.getSetting()是用来判断用户有没有授权



        /*判断小程序有没有授权*/
        /*返回数据的authSetting为scope.userInfo则已经授权*/
              wx.getSetting({
                  success: (res) => {
                      if (res.authSetting['scope.userInfo']) {
                      /*如果已授权就可以获取用户数据*/
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

### 分享组件
* 分享组件的构造可以使用button，只需要把open-type设置成share


        <v-button class="share-btn" open-type="share">
                    <image class="share" slot="img" src="/images/icon/share.png"></image>
                </v-button>