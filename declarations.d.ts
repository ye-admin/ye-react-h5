// declare module '*.module.less' {
//     const classes: { [className: string]: string };
//     export default classes;
// };
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'react-fittext';

declare const VERSION: string;
declare const SERVER_ENV: 'default' | 'dev' | 'test' | 'prod' | 'live' | false;

