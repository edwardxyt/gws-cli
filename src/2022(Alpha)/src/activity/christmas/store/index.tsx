import { action, configure, observable } from 'mobx';

import UserStore from './protoTypes/User';

configure({ enforceActions: 'observed' });

class Store {
    constructor() {
        this.initStore();
    }

    /**
     * 当前登录的用户
     *
     * @memberof Store
     */
    @observable
    user: any;

    @action('初始化store')
    initStore = (callbacks?: any) => {
        this.user = new UserStore(this);
        if (callbacks) {
            callbacks.forEach((item: any) => {
                const { module, executes } = item;
                executes.forEach((cbName: any) => {
                    const callback = this[module][cbName];
                    typeof callback === 'function' && callback();
                });
            });
        }
    };
}

/**
 * 初始化状态
 *
 * @export
 * @param {any} initialState
 * @returns
 */

export default function configureStore() {
    const rootStore: any = new Store();
    window.addEventListener(
        'resize',
        action('页面尺寸发生变化', () => {
            rootStore.user.winHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            rootStore.user.winWidth =
                document.documentElement.clientWidth ||
                document.body.clientWidth;
        })
    );
    return rootStore;
}
