
import assert from 'assert'
import BrowserFactory from '../core/browser-factory.js'

const JRGC_IPHONE_UA = "iPhone; FinancialWorkshop/2.9.10"
const JRGC_ANDROID_UA = "Android; FinancialWorkshop/2.9.10"
const WEIXIN_ANDROID_UA = "Mozilla/5.0 (Linux; U; Android 2.3.6; zh-cn; GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255"
const NEXUS5X_UA = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Mobile Safari/537.36"
const IPHONE6_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
const WEBCHROME_UA = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36"

const JRGC_APP_STAMP = /FinancialWorkshop/

describe('BrowserFactory', function () {
    describe('create instance by default parameters', function () {

        before(function () {
            global.navigator = {
                userAgent: WEBCHROME_UA
            }
            this.browser = new BrowserFactory(null, JRGC_APP_STAMP)
        })

        it('web chrome ua', function () {
            assert.equal(false, this.browser.inApp)
            assert.equal(false, this.browser.inAndroid)
            assert.equal(false, this.browser.inIOS)
            assert.equal(false, this.browser.inMobile)
            assert.equal(false, this.browser.inIOSApp)
            assert.equal(false, this.browser.inAndroidApp)
            assert.equal(false, this.browser.inWeixin)
        })

    })

    describe('create instance by specify parameters', function () {

        it('nexus 5x ua', function () {
            let browser = new BrowserFactory(NEXUS5X_UA, JRGC_APP_STAMP)

            assert.equal(false, browser.inApp)
            assert.equal(true, browser.inAndroid)
            assert.equal(false, browser.inIOS)
            assert.equal(true, browser.inMobile)
            assert.equal(false, browser.inIOSApp)
            assert.equal(false, browser.inAndroidApp)
            assert.equal(false, browser.inWeixin)
            assert.equal(false, browser.inMac)
        })
        it('iPhone6 ua', function () {
            let browser = new BrowserFactory(IPHONE6_UA, JRGC_APP_STAMP)

            assert.equal(false, browser.inApp)
            assert.equal(false, browser.inAndroid)
            assert.equal(true, browser.inIOS)
            assert.equal(true, browser.inMobile)
            assert.equal(false, browser.inIOSApp)
            assert.equal(false, browser.inAndroidApp)
            assert.equal(false, browser.inWeixin)
            assert.equal(false, browser.inMac)
        })
        it('jrgc ios app ua', function () {
            let browser = new BrowserFactory(JRGC_IPHONE_UA, JRGC_APP_STAMP)

            assert.equal(true, browser.inApp)
            assert.equal(false, browser.inAndroid)
            assert.equal(true, browser.inIOS)
            assert.equal(true, browser.inMobile)
            assert.equal(true, browser.inIOSApp)
            assert.equal(false, browser.inAndroidApp)
            assert.equal(false, browser.inWeixin)
            assert.equal(false, browser.inMac)
        })
        it('jrgc android app ua', function () {
            let browser = new BrowserFactory(JRGC_ANDROID_UA, JRGC_APP_STAMP)

            assert.equal(true, browser.inApp)
            assert.equal(true, browser.inAndroid)
            assert.equal(false, browser.inIOS)
            assert.equal(true, browser.inMobile)
            assert.equal(false, browser.inIOSApp)
            assert.equal(true, browser.inAndroidApp)
            assert.equal(false, browser.inWeixin)
            assert.equal(false, browser.inMac)
        })

        it('jrgc android app ua', function () {
            let browser = new BrowserFactory(WEIXIN_ANDROID_UA, JRGC_APP_STAMP)

            assert.equal(false, browser.inApp)
            assert.equal(true, browser.inAndroid)
            assert.equal(false, browser.inIOS)
            assert.equal(true, browser.inMobile)
            assert.equal(false, browser.inIOSApp)
            assert.equal(false, browser.inAndroidApp)
            assert.equal(true, browser.inWeixin)
            assert.equal(false, browser.inMac)
        })
        
    })
})