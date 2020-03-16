import {config} from "../config/config";

class Http{
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
                let code=res.statusCode;
                /*startsWith方法，处理开头状态码为2*/
                if(code.startsWith('2')){

                }
                else {

                }
            },
            fail: (err)=>{

            }
        })
    }

}