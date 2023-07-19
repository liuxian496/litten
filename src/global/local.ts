import { LocalType, I18N } from "./enum";
import { Local, Lexicon } from './local.types';
import zhCN from "./zhCN";
import enUS from "./enUS";

const local: Local = {};

let currentI18N: I18N | string = I18N.enUs;

/**
 * 获取当前的国际化类型
 * @param type 国际化对于的类型名称
 */
export function getI18N() {
    return currentI18N;
}

/**
 * 设置组件库的国际化
 * @param type 国际化对于的类型名称
 */
export function setI18N(type: I18N | string) {
    currentI18N = type;
}

/**
 * 获取国际化配置
 * @returns 当前的国际化配装
 */
export function getI18NConfig(): Lexicon {
    return getLocal(LocalType.i18n, currentI18N) as Lexicon;
}

/**
 * 根据类型和子类型，获取全局配置
 * @param type 要获取的类型
 * @param name 要获取的类型的子类型
 * @returns 要获取的配置
 */
export function getLocal(type: string, name: string): object {
    if (local[type]) {
        return local[type][name] || {};
    }
    return {};
}

/**
 * 注册组件库的全局配置
 * @param type 注册的类型
 * @param name 注册的子类型
 * @param config 子类型对应的配置
 */
export function register(type: LocalType, name: string, config: object) {
    if (!local[type]) {
        local[type] = {};
    }
    local[type][name] = config;
}

register(LocalType.i18n, I18N.zhCn, zhCN);
register(LocalType.i18n, I18N.enUs, enUS);