import { action } from 'mobx';

/**
 * 用户数据控制器
 *
 * @export
 * @class User
 */
class UserController {
    @action('登出')
    logout = () => {
        // let a = 10;
        try {
            sessionStorage.clear();
            localStorage.clear();
        } catch (error) {
            // catchFun(error);
        } finally {
            // setCookie('access_token', '', -1, '.hualala.com', '/');
            // setCookie('dynamic_code_session', '', -1, '.hualala.com', '/');
        }
    };
}

export default UserController;
