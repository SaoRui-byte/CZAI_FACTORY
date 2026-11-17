/**
 * 图表配色契约
 * ------------------------------------------------------------
 * 品牌青蓝紫**不能**用作分类色。实证：用 dataviz 的 validate_palette.js
 * 在 #0A1018 表面校验，紫 #9B8CFF 与蓝 #5B7CFA 的
 *   CVD ΔE 6.4（低于 8 的目标准）· 正常视力 ΔE 9.8（低于 15 硬门槛）
 * 即正常视力都难以区分。因此图表改用经校验的参考色板：
 *   #3987E5 / #D95926 / #199E70 / #C98500  —— 四项检查全部 PASS
 *
 * 文字永远用文本色，不给文字上数据色。
 */
export const SERIES = ['#3987E5', '#D95926', '#199E70', '#C98500'] as const

export const CHART_SURFACE = '#0A1018'
export const GRID_COLOR = 'rgba(255,255,255,0.07)'
export const AXIS_TEXT = '#7A8CA3'
export const SURFACE_COLOR = CHART_SURFACE
