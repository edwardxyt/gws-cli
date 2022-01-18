import { configure, observable, action } from 'mobx'

import User from './protoTypes/User'

configure({ enforceActions: 'observed' })

class Store {
    constructor() {
        this.initStore()
    }
    /**
     * 当前登录的用户
     *
     * @memberof Store
     */
    @observable
    user

    @action('初始化store')
    initStore = callbacks => {
        this.user = new User(this)
        if (callbacks) {
            callbacks.forEach(item => {
                const { module, executes } = item
                executes.forEach(cbName => {
                    const callback = this[module][cbName]
                    typeof callback === 'function' && callback()
                })
            })
        }
    }
}

/**
 * 初始化状态
 *
 * @export
 * @param {any} initialState
 * @returns
 */

export default function configureStore() {
    const rootStore = new Store()

    // Object.defineProperty(rootStore.user, 'winHeight', {
    //     get() {
    //         return document.documentElement.clientHeight || document.body.clientHeight
    //     },
    // })
    // Object.defineProperty(rootStore.user, 'winWidth', {
    //     get() {
    //         return document.documentElement.clientWidth || document.body.clientWidth
    //     },
    // })
    window.addEventListener(
        'resize',
        action('页面尺寸发生变化', () => {
            rootStore.user.winHeight = document.documentElement.clientHeight || document.body.clientHeight
            rootStore.user.winWidth = document.documentElement.clientWidth || document.body.clientWidth
        }),
    )
    return rootStore
}
