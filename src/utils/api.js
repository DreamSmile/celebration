import { $post } from './http2.js';
// const $api = "https://tm.lilanz.com/oa/api/BrandNewsCore.ashx"
// 判断开发环境
let nowEnviroment = process.env.NODE_ENV;
let api;
api = nowEnviroment == "development" ? "/checkWork" : "http://tm.lilanz.com/oa/api/BrandNewsCore.ashx"


export function getWxInfo(data) {
    return $post(api, data);
}