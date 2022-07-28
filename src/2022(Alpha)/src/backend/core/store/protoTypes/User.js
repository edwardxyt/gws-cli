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
     * 根store
     */
    rootStore;

    /**
     * 姓名
     *
     * @type {string}
     * @memberof User
     */
    @observable
    userName = 'xiayuting';
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
