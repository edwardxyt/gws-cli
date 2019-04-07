import NativeBridgeFactory from './core/native-bridge-factory.js'
import DOMReadyMethodFactory from './core/dom-ready-factory.js'
import Event from './core/event.js'
import Utils from './core/utils.js'
import Cache from './core/cache.js'
import getJSONP from './core/jsonp.js'
import * as Components from 'fw-components'
import { captureError } from './core/capture.js'

import BrowserFactory from './core/browser-factory.js'
import RequestFactory from './core/request-factory.js'

/*
Request 的用法

简单用法:
简单用法最多只要传入3个参数
@parameter url 请求地址
@parameter method http动词, 默认是GET
@parameter data 请求参数, 不管GET还是POST, 请求参数都是可序列化的JSON对象

复杂用法, 需要自己创建 RequestFactory 实例, 构建参数
Ajax的完整参数参考
request-factory.js 文件中 Ajax 类的构造方法
*/
let Request = new RequestFactory({
    error_handler: (code, message, responseText) => {
        Components.showToast(`${message} [${code}]`)
    },
    alert: Components.showAlert,
    capture: captureError,
    timeout_handler: (timeout, state) => Components.showToast(`接口超时 [${state}:${timeout}s]`),
    show_loading: Components.showLoading,
    hide_loading: Components.hideLoading
}).ajax

let JSONP = function (url, params) {
    return getJSONP(url, params).catch(e => {
        Components.showToast(e.message || 'JSONP Error')
        return Promise.reject(e)
    })
}

let Polling = function (opt) {
    let PostClass = function (opt) {
        this.opt = Object.assign({
            maxTimes: 3,
            interval: 3000,
            condition: () => true,
            request: Request.ajax
        }, opt)
    }

    PostClass.prototype = {
        ajax: function (url, data, options) {
            let count = 0;
            options = Object.assign({ url, data }, options, { silence: true, loading: true })

            return new Promise((resolve, reject) => {
                let anonymous = () => {
                    if (count++ > this.opt.maxTimes) {
                        Components.hideLoading()
                        reject()
                    } else {
                        Components.showLoading('', false)
                        this.opt.request(options).then(data => {
                            this.opt.condition(data) ?
                                resolve(data) :
                                setTimeout(anonymous, this.opt.interval)
                        })
                    }
                }

                anonymous()
            })
        }
    }

    return new PostClass(opt)
}

let Version = { version: '0.11.4' }

let DOMReady = DOMReadyMethodFactory(window, document)

let Browser = new BrowserFactory()

export {
    Version as default
    , NativeBridgeFactory
    , BrowserFactory
    , Browser
    , DOMReady
    , Event
    , Utils
    , Cache
    , getJSONP // this method is deprecated, use JSONP instead
    , JSONP
    , RequestFactory
    , Request
    , Components
}
