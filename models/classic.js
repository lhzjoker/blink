import {Http} from "../util/http";

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

export {
    ClassicModel
}