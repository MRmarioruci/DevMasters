declare module '*.png' {
    const value: any;
    export = value;
}
declare module '*.jpg' {
    const value: any;
    export = value;
}
declare module '*.jpeg' {
    const value: any;
    export = value;
}
declare module 'use-react-screenshot' {
    export function useScreenshot(): [string, () => Promise<void>];
}
declare module 'react-copy-to-clipboard';
declare module 'react-lottie-player';