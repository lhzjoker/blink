import {Http} from "../util/http";

class LikeModel {
    static getLike(like_or_cancel, artID, category){
        let url = like_or_cancel == 'like'?'like':'like/cancel';
        Http.request({
            url: url,
            method: 'POST',
            data: {
                art_id: artID,
                type: category
            }
        })
    }

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
}
export {
    LikeModel
}