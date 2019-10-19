import functions from "./functions";

test("adds 1 + 2 to equal 3", () => {
    expect(functions.sum(1, 2)).toBe(3);
});

// toBeNull
test("Should be null", () => {
    expect(functions.isNull()).toBeNull();
});

// toBeFalsy 判断值是否为false
test("Should be falsy", () => {
    expect(undefined).toBeFalsy();
});

// .not 修饰符允许你测试结果不等于某个值的情况，这和英语的语法几乎完全一样，很好理解。
test("adds 2 + 2 不等于 5", () => {
    expect(functions.sum(2, 2)).not.toBe(5);
});

// Arrays
test("Arrays has", () => {
    expect(["john", "karen", "admin"]).toContain("admin");
});

// .toEqual 匹配器会递归的检查对象所有属性和属性值是否相等，所以如果要进行应用类型的比较时，请使用.toEqual匹配器而不是.toBe。
test("getAuthor()返回的对象深度相等", () => {
    expect(functions.getAuthor()).toEqual(functions.getAuthor());
});

// .toHaveLength 可以很方便的用来测试字符串和数组类型的长度是否满足预期。
test("getIntArray(3)返回的数组长度应该为3", () => {
    expect(functions.getIntArray(3)).toHaveLength(3);
});

// .toThorw 可能够让我们测试被测试方法是否按照预期抛出异常，但是在使用时需要注意的是：我们必须使用一个函数将将被测试的函数做一个包装
test("getIntArray(3.3)应该抛出错误", () => {
    function getIntArrayWrapFn() {
        functions.getIntArray(3.3);
    }
    expect(getIntArrayWrapFn).toThrow('"getIntArray"只接受整数类型的参数');
});

// .toMatch 传入一个正则表达式，它允许我们用来进行字符串类型的正则匹配。
test('getAuthor().name应该包含"li"这个姓氏', () => {
    expect(functions.getAuthor().name).toMatch(/li/i);
});

// 测试异步函数
test("fetchUser() 可以请求到一个含有name属性值为Leanne Graham的对象", () => {
    // expect.assertions(1)，它能确保在异步的测试用例中，有一个断言会在回调函数中被执行。这在进行异步代码的测试中十分有效。
    expect.assertions(1);
    return functions.fetchUser().then(data => {
        expect(data.name).toBe("Leanne Graham");
    });
});

test("fetchUser() 可以请求到一个用户名字为Leanne Graham", async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.name).toBe("Leanne Graham");
});
