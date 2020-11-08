import React, {Component, lazy, Suspense, Fragment} from "react";
import Button from "antd/es/button"; // 加载 JS
import "antd/es/button/style"; // 加载 LESS

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“primary”为默认值）。
// 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。
// 注意：将 undefined 传递给 Provider 时，消费组件的 defaultValue 不会生效。
const ThemeContext = React.createContext("primary");

export default class Context extends Component {
    render() {
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
        // 无论多深，任何组件都能读取这个值。
        // 在这个例子中，我们将 “danger” 作为当前的值传递下去。
        return (
            <ThemeContext.Provider value="danger">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

// 中间的组件再也不必指明往下传递 theme 了。
class Toolbar extends Component {
    render() {
        return (
            <div>
                <ThemedButton />
            </div>
        );
    }
}

class ThemedButton extends Component {
    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    // 在这个例子中，当前的 theme 值为 “danger”。
    static contextType = ThemeContext;
    render() {
        return (
            <div>
                <Button type={this.context}>{this.context}</Button>
            </div>
        );
    }
}
