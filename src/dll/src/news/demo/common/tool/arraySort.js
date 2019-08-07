/**
 * @Description: 数组排序
 * @author Edward Xia
 * @date 2019-04-20
 */
export default class ArraySort {
    constructor() {}

    /**
     * 冒泡排序
     * 循环的最大值从length递减
     * 基本就是每次循环只能排好最后一个 然后递减到第一个
     * @param arr [数组]
     */
    async bubbleSort(arr) {
        let changedData = new Array();
        console.log("冒泡调用");
        for (let j = arr.length; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                if (arr[i] > arr[i + 1]) {
                    let z = 0;
                    z = arr[i + 1];
                    arr[i + 1] = arr[i];
                    arr[i] = z;
                }
                changedData = arr;
            } //one
        } //two
        return changedData;
    }
}
