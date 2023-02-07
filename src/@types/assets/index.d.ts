
declare module "*.svg" {
    import { SVGProps } from 'react';
    declare const Url: string;
    export default Url;
}

declare module '*.png';
declare module '*.webp';