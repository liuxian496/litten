/**
 * 通用尺寸
 * @param small small 小号
 * @param medium medium 中号
 * @param large large 大号
 */
export enum Size {
    small = "small",
    medium = "medium",
    large = "large",
}

/**
 * 用来指定控件的不同使用模式
 * @param primary primary 主要的
 * @param outlined outlined 轮廓
 * @param text text 文本
 */
export enum Mode {
    primary = "primary",
    outlined = "outlined",
    text = "text",
}

/**
 * 用来指定控件的不同使用风格
 * @defaul defaultColor 默认
 * @danger danger 危险
 * @info info 摘要
 * @success success 成功
 * @warning warning 警告
 * @deep deep 深入探讨
 * @note note 笔记
 */
export enum Color {
    default = "defaultColor",
    danger = "danger",
    info = "info",
    success = "success",
    warning = "warning",
    deep = "deep",
    note = "note",
}

/**
 * 动画状态
 * @param none animationNone 无动画
 * @param start start 动画开始
 * @param end end 动画结束
 */
export enum AnimationState {
    none = "animationNone",
    start = "start",
    end = "end",
}

/**
 * 国际化
 * @param zhCn zh-cn 中文
 * @param enUs en-us 英文
 */
export enum I18N {
    zhCn = "zh-cn",
    enUs = "en-us",
}

/**
 * 本地化
 */
export enum LocalType {
    i18n = "i18n",
    theme = "theme",
}

/**
 * 蓝色
 */
export enum Blue {
    dark = "rgb(21,101,192)",
    main = "rgb(25, 118, 210)",
    // ripple组件wave部件的颜色
    rippleWave = "rgba(25,118,210,0.16)",
    // ripple组件focus部件的颜色
    rippleFocus = "rgba(25,118,210,0.3)",
}

/**
 * 白色
 */
export enum White {
    main = "rgb(255,255,255)",
    // ripple组件focus部件的颜色
    rippleFocus = "rgba(255,255,255,0.3)",
}

/**
 * 灰色
 */
export enum Black {
    // ripple组件wave部件的颜色
    rippleWave = "rgba(0,0,0,0.16)",
}

/**
 * 红色
 */
export enum Red {
    main = "rgb(211, 47, 47)",
    dark = "rgb(198, 40, 40)",
    // ripple组件wave部件的颜色
    rippleWave = "rgba(211,47,47,0.16)",
    // ripple组件focus部件的颜色
    rippleFocus = "rgba(211,47,47,0.3)",
}

/**
 * 绿色
 */
export enum Green {
    main = "rgb(46, 125, 50)",
    dark = "rgb(27, 94, 32)",
    // ripple组件wave部件的颜色
    rippleWave = "rgba(46, 125, 50, 0.16)",
    // ripple组件focus部件的颜色
    rippleFocus = "rgba(46, 125, 50, 0.30)",
}

/**
 * 橙色
 */
export enum Orange {
    main = "rgb(237,108,2)",
    dark = "rgb(230, 81, 0)",
    // ripple组件wave部件的颜色
    rippleWave = "rgba(237,108,2,0.16)",
    // ripple组件focus部件的颜色
    rippleFocus = "rgba(237,108,2,0.30)",
}

/**
 * wave部件的计算的方式
 */
export enum WaveMode {
    // 用一个足够大的圆全覆盖父定位容器
    normal = "normal",
    // wave的圆心是容器的中心
    center = "center",
}
