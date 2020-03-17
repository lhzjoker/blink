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
}
export {
    LikeModel
}