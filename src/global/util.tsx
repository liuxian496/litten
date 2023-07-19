import React, { useEffect, useRef } from 'react';
import { isString, isArray, forOwn } from 'lodash';

import { UserControlType } from './enum';

/**
 * 检测是否是空字符串
 * @param str 需要判断的值 {any}
 */
export function isEmptyString(str: any) {
    return isString(str) && str.trim() === '';
}

/**
 * 保存前一个状态的值
 * @param 要保存的值
 * @requires value 前一个状态的值 {any}
 */
export function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    })

    return ref.current;
}

/**
 * 终止鼠标事件的冒泡
 * @param e 事件参数 {React.MouseEvent}
 */
export function handleMouseStopPropagation(e: React.MouseEvent) {
    e.stopPropagation();
}

/**
 * 遍历对象数组，将对的每个属性输出成字符串，不递归遍历对象属性的子属性
 */
export function printArrayItem(list?: Object[]) {
    let log: string[] = [];
    if (isArray(list)) {
        list.map((item, index) => {
            log[index] = '{'
            forOwn(item, (value, key) => {
                log[index] += key + ": " + value + ", ";
            })
            log[index] += '}';

            return item;
        })
    }
    return log.toString();
}

export function getInitialValue(type: string) {
    let value;

    switch (type) {
        case UserControlType.TextField:
            value = '';
            break;
    }

    return value;
}

/**
 * 输出控制台错误信息
 * @param msg 错误信息
 * @returns errorMsg 处理后的错误信息 {string}
 */
export function error(msg?: string) {
    const errorMsg = `[litten error]: ${msg}`;
    console.error(errorMsg);

    return errorMsg
}

/**
 * 输出控制台警告信息
 * @param msg 
 */
export function warn(msg: string) {
    console.warn(`[litten warning]: ${msg}`);
}