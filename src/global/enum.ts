/**
 * 通用尺寸
 * @param small small 小号
 * @param medium medium 中号
 * @param large large 大号
 */
export enum Size {
    small = 'small',
    medium = 'medium',
    large = 'large',
}

/**
 * 用来指定控件的不同使用模式
 * @param primary primary 主要的
 * @param outlined outlined 轮廓
 * @param text text 文本
 */
export enum Mode {
    primary = 'primary',
    outlined = 'outlined',
    text = 'text',
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
    default = 'defaultColor',
    danger = 'danger',
    info = 'info',
    success = 'success',
    warning = 'warning',
    deep = 'deep',
    note = 'note'
}

/**
 * 鼠标状态
 */
export enum MouseState {
    mouseup = 'mouseup',
    mouseover = 'mouseover',
    mouseout = 'mouseout',
    mousedown = 'mousedown',
    none = 'mousenone'
}

/**
 * 动画状态
 * @param none animationNone 无动画
 * @param start start 动画开始
 * @param end end 动画结束
 */
export enum AnimationState {
    none = 'animationNone',
    start = 'start',
    end = 'end'
}

/**
 * 形状
 */
export enum Shape {
    circle = 'circle',
    rectangle = 'rectangle'
}


/**
 * 国际化
 * @param zhCn zh-cn 中文
 * @param enUs en-us 英文
 */
export enum I18N {
    zhCn = 'zh-cn',
    enUs = 'en-us'
}

/**
 * 本地化
 */
export enum LocalType {
    i18n = 'i18n',
    theme = 'theme'
}

/**
 * 蓝色
 */
export enum Blue {
    primary = '#1976d2',
    main = '#1976d2',
    dark = '1565c0',
    focus = '#C2D6EF',
    wave = '#9ab9e5'
}

/**
 * 白色
 */
export enum White {
    primary = '#ffffff'
}

/**
 * 灰色
 */
export enum Gray {
    primary = '#e0e0e0'
}

/**
 * 红色
 */
export enum Red {
    main = '#d32f2f',
    dark = '#c62828',
    focus = '#d32f2f',
    wave = '#d32f2f80'
}

/**
 * 绿色
 */
export enum Green {
    main = '#2e7d32',
    dark = '#1b5e20',
    focus = '#11cb5f',
    wave = '#c1f0ca'
}

/**
 * 橙色
 */
export enum Orange {
    main = '#ed6c02',
    dark = '#e65100',
    focus = '#ff9800',
    wave = '#ffb74d'
}

/**
 * UserControl类型
 */
export enum UserControlType {
    TextField = 'TextField',
    Checkbox = 'Checkbox',
    Radio = 'Radio'
}

/**
 * ChangeEvent状态
 */
export enum ChangeEventState {
    //默认状态
    Default = 'Default',
    //用户输入
    UserInput = 'UserInput',
    //
    DevSet = 'DevSet'
}

/**
 * 勾选状态
 */
export enum CheckState {
    // 选中
    checked = "checked",
    // 未选中
    unChecked = "unChecked",
    // 不确定
    indeterminate = "indeterminate"
}

/**
 * 位置
 */
export enum Placement {
    // 上边
    top = "placementTop",
    // 下边
    bottom = "placementBottom",
    // 左边
    left = "placementLeft",
    // 右边
    right = "placementRight"
}