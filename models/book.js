import {Http} from "../util/http-p";

class BookModel {
    static getHotList(){
        return Http.request({
            url: 'book/hot_list',
        })
    }

    static getMyBookCount(){
        return Http.request({
            url: 'book/favor/count',
        })
    }
}

export {
    BookModel
}