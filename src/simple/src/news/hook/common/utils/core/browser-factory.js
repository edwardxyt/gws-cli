class BrowserFactory {
    constructor(ua, app_stamp) {
        this.ua = ua || navigator.userAgent

        if (typeof app_stamp === 'undefined') {
            if (this.inRetailApp) app_stamp = 'InclusiveRetail';
            if (this.inFXHApp) app_stamp = 'EasyLoan888';
            if (this.inJRGCApp) app_stamp = 'FinancialWorkshop';
            if (this.inXJDSApp) app_stamp = 'FinancialCash';
            if (this.inWXXDApp) app_stamp = 'Wangxinxiaodai';
        }

        this.app_stamp = app_stamp || 'not in any apps'
    }
    get inApp() {
        return !!this.ua.match(this.app_stamp)
    }

    get inRetailApp() {
        return !!this.ua.match('InclusiveRetail')
    }

    get inFXHApp() {
        return !!this.ua.match('EasyLoan888')
    }

    get inWXXDApp() {
        return !!this.ua.match('Wangxinxiaodai')
    }

    get inJRGCApp() {
        return !!this.ua.match('FinancialWorkshop')
    }

    get inXJDSApp() {
        return !!this.ua.match('FinancialCash')
    }

    get appVersion() {
        let r = this.ua.match(RegExp(this.app_stamp + '/(\\d+.\\d+.\\d+)'))
        return r ? r[1] : '0'
    }

    get inAndroid() {
        return /Android/i.test(this.ua)
    }

    get inIOS() {
        return /iPhone|iPad|iPod/i.test(this.ua)
    }

    get inMac() {
        return /Macintosh/i.test(this.ua)
    }

    get inMobile() {
        return this.inAndroid || this.inIOS
    }

    get inIOSApp() {
        return this.inApp && this.inIOS
    }

    get inAndroidApp() {
        return this.inApp && this.inAndroid
    }

    get inWeixin() {
        return /MicroMessenger/.test(this.ua)
    }
}

export default BrowserFactory
