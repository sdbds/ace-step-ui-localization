// 导入风格文本文件
import mainStyleText from './main_style.txt?raw';
import allStyleText from './all_style.txt?raw';

// 从main_style.txt读取主要风格（大类）
export const MAIN_STYLES = mainStyleText
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0);

// 从all_style.txt读取所有风格
export const ALL_STYLES = allStyleText
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0);

// 为了向后兼容，保留原来的GENRE_KEYS（使用主要风格）
export const GENRE_KEYS = MAIN_STYLES;

// 类型定义
export type MainStyle = typeof MAIN_STYLES[number];
export type AllStyle = typeof ALL_STYLES[number];
