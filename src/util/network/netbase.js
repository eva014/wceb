import 'whatwg-fetch';
import React from 'react'
import {Toast} from 'antd-mobile'


const BaseNetwork = {};

//
// Promise.prototype.done = function (onFulfilled, onRejected) {
//     this.then(onFulfilled, onRejected)
//         .catch(function (reason) {
//             // 抛出一个全局错误
//             setTimeout(() => { throw reason }, 0);
//         });
// };

//字符串常量
//method
export const GET = 'GET';
export const POST = 'POST';
export const DELETE = 'DELETE';
export const PUT = 'PUT';
//contentType
export const ApplicationJson='application/json';
export const ApplicationFormURLEncoded='application/x-www-form-urlencoded';
export const MultipartFormData='multipart/form-data';


export const createHttpHeaders = (contentType) => {
    const header = new Headers({

    });

    if (contentType) {
        header.set('Content-Type', contentType);
    }
    return header
};

//创建querystring
export const createQuery = (params) => {
    let query = '';
    const esc = encodeURIComponent;
    if (params && Object.keys(params).length > 0) {
        const kvs = [];
        Object.keys(params).forEach((k) => {
            const dataK = params[k];
            if (dataK !== null && dataK !== undefined) {
                if (typeof dataK === 'object') {
                    if (Object.keys(dataK).length>0){
                        kvs.push(esc(k) + '=' + esc(JSON.stringify(dataK)));
                    }
                }
                else {
                    kvs.push(esc(k) + '=' + esc(dataK));
                }
            }
        });
        if (kvs.length > 0) {
            query = kvs.join('&');
        }
    }
    return query;
};


//创建formData
export const createFormData = (params) => {
    const formData = new FormData();
    if (params && Object.keys(params).length > 0) {
        Object.keys(params).forEach((k) => {
            const dataK=params[k];
            if (dataK !== null && dataK !== undefined) {
                formData.append((k), (params[k]));
            }
        });
    }
    return formData;
};

//创建jsonBody
export const createJsonBody=(params)=>{
    return JSON.stringify(params)
};


const requestHeader = createHttpHeaders();
/**
 *
 * @param baseurl 服务器地址
 * @param path  路径
 * @param method -GET -POST
 * @param params 参数
 * @param silence 是否需要特定处理rc  rc===8跳转至登录
 * @param contentType
 */



BaseNetwork.network = (baseurl, path, method, params, silence = false,contentType=ApplicationFormURLEncoded) => {
    if(!navigator.onLine){
        Toast.info(
            <div style={{fontSize:'0.3rem'}}>
                {'请检查您的网络连接'}
            </div>
        );
        return Promise.resolve({
            rc:-1,
            err:new Error('Network connect fail')
        });
    }


    let request;
    if (method === GET||method===DELETE) {
        const query = createQuery(params);
        request = fetch(baseurl + path + '?'+query, {
            method: method,
            headers: requestHeader,
            credentials: 'include'
        })
    }
    else {
        const header=createHttpHeaders(contentType);
        let body;
        if(contentType===ApplicationJson)
        {
            body=createJsonBody(params);
        }
        else if(contentType===ApplicationFormURLEncoded){
            body=createQuery(params);
        }
        else {
            body=createFormData(params);
        }

        request = fetch(baseurl + path, {
            method: method,
            headers:header,
            credentials: 'include',
            body: body
        });
    }

    return request.then(response => {
        //检查请求的状态
        if (response.ok) {
            return response;
        }
    }).then(response => {
        const contentType = response.headers.get("content-type").toLowerCase();

        if (contentType.indexOf('application/json')>-1||contentType.indexOf('text/json')>-1) {
            return response.json().then(data => {
                const {rc = 1, msg = ''} = data;
                if (rc !== 0) {
                    if (silence === false) {
                        Toast.info(
                            <div style={{fontSize:'0.3rem'}}>
                                {msg}
                            </div>
                        )
                    }
                }
                return data
            })
        }
        else if (contentType.indexOf('text/html')>-1) {
            return response.text().then(txt => {
                return {
                    rc: 0,
                    data: txt
                }
            })
        }
        else if (contentType === 'image/jpeg') {
            const token = response.headers.get('token');
            return response.blob().then(imgData => {
                return {
                    rc: 0,
                    data: {
                        img: URL.createObjectURL(imgData),
                        token: token,
                    }
                }
            })
        }
    }).catch((err) => {
        console.log('出错：', err);
        if (silence === false) {
            Toast.info(
                <div style={{fontSize:'0.3rem'}}>
                    {'网络请求失败'}
                </div>
            );
        }
        return Promise.resolve( {
            rc:-1,
            code:err,
            err:new Error(`Network connect fail - error code ${err}`)
        });
    })
};

export default BaseNetwork;
