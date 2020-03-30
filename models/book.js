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

    static getBookDeteils(bid){
        return Http.request({
            url: `book/${bid}/detail`
        })
    }

    static getComments(bid){
        return Http.request({
            url: `book/${bid}/short_comment`
        })
    }



    static getLikeStatus(bid){
        return Http.request({
            url: `book/${bid}/favor`
        })
    }
}

export {
    BookModel
}