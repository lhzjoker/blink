import {Http} from "../util/http-p";

class KeywordModel{

    static getHistory(){
        const words = wx.getStorageSync('q');
        if(!words){
            return []
        }
        return words
    }

    static getHot(){
        return  Http.request({
            url: 'book/hot_keyword'
        })
    }

    static addToHistory(keyword){
        let words = this.getHistory();
        const has = words.includes(keyword);
        if(!has){
            /*如果数组长度大于10，删除最后一个元素*/
            if(words.length>=10){
                words.pop()
            }
            /*加到数组的第一个元素*/
            words.unshift(keyword);
            wx.setStorageSync('q', words);
        }
    }

}

export {
    KeywordModel
}