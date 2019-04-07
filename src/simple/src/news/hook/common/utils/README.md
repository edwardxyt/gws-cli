# fw-javascripts

## TEST

for test this lib, run 

> npm run test

## Usage

```javascript
    import * as $FW from 'fw-javascripts'

    // or

    import { Request, Browser, ... } from 'fw-javascripts'
```

#### Request

**Request** 方法是非常重要的核心方法, 熟练使用, 非常关键

```javascript
    import * as $FW from 'fw-javascripts'
```

* 简单GET请求
```javascript   
    // user.json
    {
        "code": 10000,
        "data": {
            "name": "delong"
        }
    }

    // 通过GET方法, 过去接口数据
    $FW.Request('/api/v1/user.json').then(data => {
        console.log(data.name) // => "delong"
    })
```

* 简单GET请求, 异常处理
```javascript   
    // user.json
    {
        "code": 60001,
        "data": { },
        "message": "服务异常"
    }

    // 通过GET方法, 过去接口数据
    $FW.Request('/api/v1/user.json').then(data => {
        // 不会执行
    }, error => {
        console.log(error.code) // => 60001
        console.log(error.message) // => "服务异常"
    })
```


* POST请求, 带参数
```javascript   
    // user.json
    {
        "code": 10000,
        "data": { 
            "new_id": 666
        },
    }

    // 通过GET方法, 过去接口数据
    $FW.Request({
        url: '/api/v1/user.json',
        method: 'post',
        data: {
            new_name: "new name"
        }
    }).then(data => {
        console.log(data.new_id) // => 666
    })
```

* 完整参数列表及默认值

```javascript
    {
        url: '',
        method: 'GET',
        data: {},
        withCredentials: false,
        timeout: 10,
        onStart: n => null,
        onTimeout: n => null,
        onComplete: n => null
    }
```

* 通过工厂方法创建Request

```javascript
    import { RequestFactory } from 'fw-components'


    let NewRequestObject = new RequestFactory({
        error_handler: (code, message, responseText) => {
            // 通用异常处理
        },
        alert: null, // 异常弹窗
        capture: captureError, // 异常捕捉
        show_loading: null, // 加载动画开始
        hide_loading: null // 加载动画结束
    })

    // 通过工场创建的不是请求方法本身, ajax方法是新对象的一个实例方法
    let ajaxInstance = NewRequestObject.ajax
```

#### BrowserFactory

获取网页运行环境, 每个属性都是 `true` 或 `false`

**注意**: 这里调用的是属性, 不是方法

```javascript
    import { BrowserFactory } from 'fw-javascripts'

    let Browser = new BrowserFactory(navigator.userAgent, 'Easyloan888')

    Browser.inApp // 
    Browser.appVersion // 
    Browser.inAndroid // 
    Browser.inIOS // 
    Browser.inMobile // 
    Browser.inIOSApp // 
    Browser.inAndroidApp // 
    Browser.inWeixin // 
```

#### Browser

`BrowserFactory` 简化版, 在实际使用中, 因为 BrowserFacotry 需要初始化, 容易出错(其实是, 经常出错)

所以直接 export 出对象

```javascript
    import { Browser } from 'fw-javascripts'

    Browser.inApp
    Browser.appVersion
    Browser.inAndroid 
    Browser.inIOS
    Browser.inMobile

    // ...

```

#### getJSONP

```javascript
    import { getJSONP } from 'fw-javascripts'

    getJSONP('https://domain.com/path?search').then(data => {
        console.log(data)
    })
```

#### Utils

*Utils.urlQuery*

```javascript
    import { Utils } from 'fw-javascripts'
    // 假设 当前浏览器访问url是
    // https://a.com?a=sometext&b&c=2
    let q = Utils.urlQuery
    console.log(q) // => [object object]
    console.log(q.a) // => 'sometext' (string type)
    console.log(q.b) // => true (boolean type)
    console.log(q.c) // => '2' (string type)
```

*Utils.format*

Utils.format 是多个格式化方法集合

`Utils.format.price`

```javascript
    import { Utils } from 'fw-javascripts'

    console.log(Utils.format.price(1234567890.45678)) 
    // => '1,234,567,890.45'
    console.log(Utils.format.price(1.3, 2))
    // => '1.30' 
    console.log(Utils.format.price(.9, 4))
    // => '0.9000'
```

*Utils.Cookie*

Utils.Cookie 是操作document的cookie的方法

```javascript

    import { Utils } from 'fw-javascript'

    Utils.Cookie.set('a', '123')
    console.log(Utils.Cookie.get('a'))
    // => 123

    Utils.Cookie.delete('a')
    console.log(Utils.Cookie.get('a'))
    // => ''

```

#### Cache

简单的内存缓存

创建实例

```javascript
    import { Cache } from 'fw-javascripts'

    let cache = new Cache()

```

*set* *get*

set 通过一个key 设置value和有效期

```javascript

    import { Cache } from 'fw-javascript'

    let cache = new Cache()

    cache.set('key', 'value', 10)
    // => null

    cache.get('key')
    // => 'value'

    // ... 10s 后
    cache.get('key')
    // => null

```

#### NativeBridge

当前网页嵌入到App中, 需要与app通信时, 需要调用这个方法

```javascript
    import { NativeBridgeFactory } from 'fw-javascripts'

    let receive_handler = function(receive_data){
        console.log(receive_data) // => {type: '', value: ''}
        // use this method receive data from App
    }

    const NativeBridge = new NativeBridgeFactory('Easyloan888')
    // 设置接受来自App的方法
    NativeBridge.onReceive(data => (){
        console.log(data)
    })

    NativeBridge.trigger('close') // 关闭当前webview
    NativeBridge.toNative('coupon') // 到app原生的优惠券页面
```

#### DOMReady

监听浏览器DOM加载状态, 一旦DOM加载完成, 立即执行, 
跟jQuery.ready方法相同

```javascript
    import { DOMReady } from 'fw-javascripts'

    DOMReady(()=>{
        // 会在DOM加载完成之后再执行
        somethine()
    })
```
