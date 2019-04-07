
function inAndroid() {
    return navigator.userAgent.match(/Android/i)
}

function initListener(init_callback) {
    inAndroid() ?
        initAndroid(init_callback) :
        initIOS(init_callback)
}

function initAndroid(init_callback) {
    // Android初始化方法
    if (window.WebViewJavascriptBridge) {
        init_callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', () => {
            init_callback(WebViewJavascriptBridge)
        }, false);
    }
}

function initIOS(init_callback) {
    // iOS初始化方法
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(init_callback);
    } else {
        window.WVJBCallbacks = [init_callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }
}

class NativeBridgeFactory {

    constructor(activeUserAgent, debug) {
        this.bridge = null;
        this.isReady = false;
        // 接收来自App消息的回调函数, 同时只能设置一个回调方法
        this._receive_callback = null
        this._depot = [];
        this.debug = debug === 'debug'

        // 先判断 UA 是否符合条件, 不符合条件就不初始化 NativeBridge
        if (!this.debug && activeUserAgent &&
            !navigator.userAgent.match(activeUserAgent))
            return;

        this._extend(NativeBridgeExtend)

        initListener(bridge => {
            if (inAndroid()) {
                // Android need this init function, or could not send message to webview
                // BUT!!!, iOS could not use this, or could not send message to webview
                bridge.init((message, responseCallback) => {
                    responseCallback && responseCallback({ 'msg': 'init success' })
                })
            }

            bridge.registerHandler('jsHandler', (data, responseCallback) => {
                let resp = this._receive_callback && this._receive_callback(data)
                if (resp) responseCallback(resp);
            })

            this.setup(bridge)
            // for debug
            window.__NATIVE_BRIDGE__ = this;
        })
    }

    setup(bridge) {
        this.bridge = bridge
        this.isReady = true // point to mark native bridge complete init
        for (let i = 0; i < this._depot.length; i++) {
            this._see_off(this._depot[i])
        }
        this._depot = []
    }

    _pack_up(action, value, need_login) {
        let encode = !!navigator.userAgent.match(/Android/i);
        value = encode ? encodeURI(value) : value;
        
        // hook login action
        if (action == 'login') need_login = true

        return {
            action: action,
            need_login: !!need_login,
            value: value,
            encode: encode
        }
    }

    _see_off(pack) {
        this.bridge.callHandler('nativeCallback', pack)
    }

    send(pack) {
        if (this.debug) {
            console && console.warn('NativeBridge should send pack:', pack)
        }

        this.isReady ?
            this._see_off(pack) :
            this._depot.push(pack)
    }

    onReceive(fn) {
        this._receive_callback = fn
    }

    trigger(name, value, need_login) {
        // 发送消息
        this.send(this._pack_up(name, value, need_login))
    }

    toNative(kw) {
        // 到某个app的原生页面
        this.send(this._pack_up('toNative', kw))
    }

    _extend(fn) {
        this.command = {}

        Object.getOwnPropertyNames(fn).sort().forEach(i => {
            this.command[i] = fn[i].bind(this)
        })
    }

    get help() {
        console && console.log && console.log(`
            Only has 2 methods:
            1. trigger
            2. toNative

            detail:

            * goto 让app打开一个新的webview加载参数中的url
            * set_title 设置app中的头部导航标题
            * hide_header 隐藏app的头部导航
            * show_header 显示app的头部导航
            * login 登录
            * share 分享功能
            * redirectMall 去豆哥商城 // deprecated
            * clipboard 复制到剪贴板
            * close 关闭当前webview
            ...
            
            * to_native app_register 去注册页
            * invite 邀请好友页
            * app_coupon 优惠券页
            * auto_bid_second 绑定银行卡第二步
            * auto_bid_auth 自动投资页面
            * app_fanxiCoupon 返息券页面
            * app_contribute_detail 用户贡献详情页
            * app_back_native ???
        `)
    }
}

const NativeBridgeExtend = {
    goto: function (link, need_login, next_title) {
        this.trigger('goto', link, need_login)
    },
    setTitle: function (title) {
        this.trigger('set_title', title)
    },
    hideHeader: function () {
        this.trigger('hide_header')
    },
    showHeader: function () {
        this.trigger('show_header')
    },
    login: function (next_url) {
        this.trigger('login', '', true)
    },
    share: function (opt) {
        this.trigger('share', JSON.stringify({
            title: opt.title, // 标题
            image: opt.image, // 图标
            link: opt.link, // 链接
            desc: opt.desc // 描述
        }), true)
    },
    gotoMall: function () {
        // deprecated method
        this.trigger('redirectMall')
    },
    clipboard: function (text) {
        this.trigger('clipboard', text)
    },
    close: function () {
        this.trigger('close')
    }
}

export {
    NativeBridgeFactory as default,
    NativeBridgeExtend
} 