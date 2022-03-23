import { computed, makeObservable, observable } from 'mobx';

import AppController from '../actions/AppController';
/**
 * 数据应用原型
 *
 * @export
 * @class User
 */
export default class AppDesign extends AppController {
    constructor(rootStore) {
        super();
        this.rootStore = rootStore;
        makeObservable(this);
    }

    /**
     * 根
     */
    @observable
    rootStore;

    /**
     * 面包屑导航
     * @type {[string]}
     */
    @observable
    breadcrumb = [];

    /**
     * 新建菜单模态框
     * @type {{visible: boolean, options: null}}
     */
    @observable
    newMenu = {
        visible: false,
        options: null,
    };

    @computed
    get newMenuvisible() {
        return !this.newMenu.visible;
    }
}
