
import { isString } from 'lodash';
import { isEmptyString } from '../../global/util';

/**
 * 获取控件css前缀
 * @param componentName 控件名称 {string}
 * @param customizePrefix 用户自定义前缀 {string}
 * @returns prefix 控件css类前缀 {string}
 */
export function getPrefixNs(componentName: string, customizePrefix?: string): string {
    return isString(customizePrefix) && !isEmptyString(customizePrefix) ? customizePrefix + '-' + componentName : `litten-${componentName}`;
}
