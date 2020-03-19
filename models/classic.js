import {Http} from "../util/http";

class ClassicModel{
    static getLatest(callback){
        Http.request({
            url: 'classic/latest',
            success: (res)=>{
                callback(res)
                /*用缓存设置最新期刊号*/
                this._setLatestIndex(res.index);
                /*最新期刊写入缓存*/
                let key = this._getKey(res.index);
                wx.setStorageSync(key, res);
            }
        });
    }

    /*缓存的应用，把获取的页面写入缓存*/
    static getCLassic(index,nextOrprevious,callback){
        /*缓存中寻找or调用API，然后写入缓存中*/
        /*用key value的形式*/
        let key = nextOrprevious=='next'?this._getKey(index+1):this._getKey(index-1);
        let classic = wx.getStorageSync(key);
        if(!classic){
            Http.request({
                url: `classic/${index}/${nextOrprevious}`,
                success: (res)=>{
                    callback(res)
                    wx.setStorageSync(this._getKey(res.index), res);
                }
            })
        }
        else {
            callback(classic)
        }

    }

    static isFirst(index){
        return index==1?true:false
    }

    static islatest(index){
        let latestindex=this._getLatestIndex();
        return latestindex==index?true:false
    }

    static _setLatestIndex(index){
        /*同步设置保存最新期刊号，key，value的方式*/
        wx.setStorageSync('latest', index);
    }

    static _getLatestIndex(){
        /*获取最新期刊号，用设置的key来获取*/
        return wx.getStorageSync('latest');
    }

    static _getKey(index){
        return 'classic-' + index
    }
}

export {
    ClassicModel
}