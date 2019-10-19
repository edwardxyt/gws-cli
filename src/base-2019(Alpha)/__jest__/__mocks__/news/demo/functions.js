import axios from "axios";

export default {
    getIntArray(num) {
        if (!Number.isInteger(num)) {
            throw Error('"getIntArray"只接受整数类型的参数');
        }

        let result = [];
        for (let i = 0, len = num; i < len; i++) {
            result.push(i);
        }

        return result;
    },
    sum(a, b) {
        return a + b;
    },
    getAuthor() {
        return {
            name: "LITANGHUI",
            age: 24
        };
    },
    fetchUser() {
        return axios
            .get("http://jsonplaceholder.typicode.com/users/1")
            .then(res => res.data)
            .catch(error => console.log(error));
    },
    add(num1, num2) {
        return num1 + num2;
    },
    isNull() {
        return null;
    }
};
