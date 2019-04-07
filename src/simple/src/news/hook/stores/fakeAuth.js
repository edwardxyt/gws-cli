"use strict";
import { observable, action, extendObservable, computed } from "mobx";
class FakeAuthStore {
    constructor() {
        extendObservable(this, {
            isAuthenticated: false, // 是否认证
            permition: {
                "/protected": false // false 就会跳到首页或者错误页，提示没权限查看
            }
        });
    }

    @computed
    get isShow() {
        return this.permition;
    }

    @action
    authenticate = cb => {
        console.log("登录成功！");
        this.isAuthenticated = true;
        setTimeout(cb, 500); // fake async
    };

    @action
    signout = cb => {
        console.log("登出成功！");
        this.isAuthenticated = false;
        setTimeout(cb, 50);
    };
}
const fakeAuth = new FakeAuthStore();

export default fakeAuth;
