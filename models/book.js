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

    static postComment(bid,comment){
        return Http.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bid,
                content: comment
            }
        })
    }

    static search(start,q){
        return Http.request({
            url: 'book/search?summary=1',
            data: {
                start: start,
                q: q
            }
        })
    }
}

export {
    BookModel
}