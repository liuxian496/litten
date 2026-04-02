/**
 * 通用尺寸
 */
export const Size = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

/**
 * 用来指定控件的不同使用模式
 */
export const Mode = {
  primary: 'primary',
  outlined: 'outlined',
  text: 'text',
} as const;

export type Mode = (typeof Mode)[keyof typeof Mode];

/**
 * 用来指定控件的不同使用风格
 */
export const Color = {
  default: 'defaultColor',
  danger: 'danger',
  info: 'info',
  success: 'success',
  warning: 'warning',
  deep: 'deep',
  note: 'note',
} as const;

export type Color = (typeof Color)[keyof typeof Color];

/**
 * 动画状态
 */
export const AnimationState = {
  none: 'animationNone',
  start: 'start',
  end: 'end',
} as const;

export type AnimationState =
  (typeof AnimationState)[keyof typeof AnimationState];

/**
 * 国际化
 */
export const I18N = {
  zhCn: 'zh-cn',
  enUs: 'en-us',
} as const;

export type I18N = (typeof I18N)[keyof typeof I18N];

/**
 * 本地化
 */
export const LocalType = {
  i18n: 'i18n',
  theme: 'theme',
} as const;

export type LocalType = (typeof LocalType)[keyof typeof LocalType];

/**
 * 蓝色
 */
export const Blue = {
  dark: 'rgb(21,101,192)',
  main: 'rgb(25, 118, 210)',
  rippleWave: 'rgba(25,118,210,0.16)',
  rippleFocus: 'rgba(25,118,210,0.3)',
} as const;

export type Blue = (typeof Blue)[keyof typeof Blue];

/**
 * 白色
 */
export const White = {
  main: 'rgb(255,255,255)',
  rippleFocus: 'rgba(255,255,255,0.3)',
} as const;

export type White = (typeof White)[keyof typeof White];

/**
 * 黑色（原名为 Black，但实际只包含 ripple 相关颜色）
 */
export const Black = {
  rippleWave: 'rgba(0,0,0,0.16)',
} as const;

export type Black = (typeof Black)[keyof typeof Black];

/**
 * 红色
 */
export const Red = {
  main: 'rgb(211, 47, 47)',
  dark: 'rgb(198, 40, 40)',
  rippleWave: 'rgba(211,47,47,0.16)',
  rippleFocus: 'rgba(211,47,47,0.3)',
} as const;

export type Red = (typeof Red)[keyof typeof Red];

/**
 * 绿色
 */
export const Green = {
  main: 'rgb(46, 125, 50)',
  dark: 'rgb(27, 94, 32)',
  rippleWave: 'rgba(46, 125, 50, 0.16)',
  rippleFocus: 'rgba(46, 125, 50, 0.30)',
} as const;

export type Green = (typeof Green)[keyof typeof Green];

/**
 * 橙色
 */
export const Orange = {
  main: 'rgb(237,108,2)',
  dark: 'rgb(230, 81, 0)',
  rippleWave: 'rgba(237,108,2,0.16)',
  rippleFocus: 'rgba(237,108,2,0.30)',
} as const;

export type Orange = (typeof Orange)[keyof typeof Orange];

/**
 * wave部件的计算的方式
 */
export const WaveMode = {
  normal: 'normal',
  center: 'center',
} as const;

export type WaveMode = (typeof WaveMode)[keyof typeof WaveMode];
