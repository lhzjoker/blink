import {Http} from "../util/http";

class ClassicModel{
    static getLatest(callback){
        Http.request({
            url: 'classic/latest',
            success: (res)=>{
                callback(res)
                this._setLatestIndex(res.index)
            }
        });
    }

    static getPrevious(index,callback){
        Http.request({
            url: `classic/${index}/previous`,
            success: (res)=>{
                callback(res)
            }
        })
    }

    static getNext(index,callback){
        Http.request({
            url: `classic/${index}/next`,
            success: (res)=>{
                callback(res)
            }
        })
    }

    static isFirst(index){
        return index==1?true:false
    }

    static islatest(index){
        let latestindex=this._getLatestIndex();
        return latestindex==index?true:false
    }

    static _setLatestIndex(index){
        wx.setStorageSync('latest', index);
    }

    static _getLatestIndex(){
        return wx.getStorageSync('latest');
    }
}

export {
    ClassicModel
}