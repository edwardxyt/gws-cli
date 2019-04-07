// helpers.js 是最小单元的帮助函数
// tools目录下包括helpers.js等 帮助函数
// utils目录下是有入口index.js的 并且模块化面对对象写法的合集（工具库）
// URLSearchParams

var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);

searchParams.has("topic"); // true
searchParams.get("topic"); // "api"
searchParams.getAll("topic"); // ["api"]

searchParams.get("foo"); // null，注意Firefox返回空字符串
searchParams.set("foo", 2);
searchParams.get("foo"); // 2

searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&foo=2&topic=webdev"

searchParams.append("foo", 3);
searchParams.getAll("foo"); // [2, 3]

searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams&foo=2&foo=3"
