import { action, configure, observable } from 'mobx';

import App from './protoTypes/App';
import User from './protoTypes/User';

configure({ enforceActions: 'observed', isolateGlobalState: true });

class Store {
    constructor() {
        this.initStore(null);
    }

    @observable
    app;
    @observable
    user;

    @action('初始化store')
    initStore = callbacks => {
        this.app = new App(this);
        this.user = new User(this);
        if (callbacks) {
            callbacks.forEach(item => {
                const { module, executes } = item;
                executes.forEach(cbName => {
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
 */

export default function configureStore() {
    const rootStore = new Store();

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
