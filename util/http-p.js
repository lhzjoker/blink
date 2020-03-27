import {config} from "../config/config";

/*自定义错误码信息*/
const tips = {
    1:'抱歉出现了一个错误',
    1005:'appkey错误，请前往www.7yue.pro申请appkey',
    3000:'期刊错误'
}

class Http{
    static request({url,data={},method='GET'}){
        return new Promise((resolve, reject)=>{
            this._request(url,resolve,reject,data,method)
        })

    }

    /*promise重构request*/
    static _request(url,resolve,reject,data={},method='GET'){
        wx.request({
            url: config.apiBaseUrl + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res)=>{
                let code=res.statusCode.toString();
                /*startsWith方法，处理开头状态码为2，注意要转换为字符串*/
                if(code.startsWith('2')){
                    resolve(res.data)
                }
                else {
                    reject()       //错误是不需要返回数据的
                    /*res.data.error_code返回的数据错误码*/
                    this._show_error(res.data.error_code)
                }
            },
            /*fail出现的一个场景是断网*/
            fail: (err)=>{
                reject()
                this._show_error(1)
            }
        })
    }

    /*错误处理方法,下划线默认代表私有，但却不是真正的私有，es6中现在还没有真正的私有方法*/
    static _show_error(error_code){
        if(!error_code){
            error_code=1
        }
        const tip=tips[error_code]
        /*处理错误的方法，在页面显示错误*/
        wx.showToast({
          title: tip?tip:tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export {
    Http
}