import { observable } from 'mobx';

import UserController from '../actions/UserController';

/**
 * 用户原型
 *
 * @export
 * @class UserStore
 */
export default class UserStore extends UserController {
    constructor(rootStore) {
        super();
        this.rootStore = rootStore;
        this.winWidth =
            document.documentElement.clientWidth || document.body.clientWidth;
        this.winHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
    }

    /**
     * 姓名
     *
     * @type {string}
     * @memberof User
     */
    @observable
    userName = 'xiayuting';
    /**
     * 用户唯一标识
     *
     * @type {string}
     * @memberof User
     */
    @observable
    accId;
    /**
     * 账户类型
     * 0：非开发者、1：开发者、2：admin
     *
     * @type {number}
     * @memberof User
     */
    @observable
    isHllAccount;
    /**
     * 邮箱地址
     *
     * @type {string}
     * @memberof User
     */
    @observable
    email;
    /**
     * 手机号码
     *
     * @type {string}
     * @memberof User
     */
    @observable
    mobile;
    /**
     * 是否是新建账户第一次登陆
     *
     * @type {boolean}}
     * @memberof User
     */
    @observable
    isFirst;
    /**
     * 用户显示区域高
     *
     * @type {array}
     * @memberof User
     */
    @observable
    winHeight;
    /**
     * 用户显示区域宽
     *
     * @type {array}
     * @memberof User
     */
    @observable
    winWidth;
}
