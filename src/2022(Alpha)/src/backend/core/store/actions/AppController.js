import { action } from 'mobx';

/**
 * 用户数据控制器
 *
 * @export
 * @class User
 */
export default class AppDesignController {
    @action('打开模态框')
    openModal = (type, options = {}) => {
        this[type] = {
            visible: true,
            loading: false,
            options,
        };
    };
    @action('隐藏模态框')
    hideModal = type => {
        this[type] = {
            visible: false,
            loading: false,
            options: null,
        };
    };
    @action('显示加载状态')
    toggle = (key, value) => {
        this[key] = value;
    };
    @action('更新面包屑')
    updateBreadcrumb = (key, value) => {
        this[key] = value;
    };
}
