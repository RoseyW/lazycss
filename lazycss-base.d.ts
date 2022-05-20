declare interface cssList {
    fatherNode: string;
    width?: number;
    height?: number;
    marginTop?: number;
    marginLeft?: number;
    marginRight?: number;
    marginBottom?: number;
    color?: string;
    backgroundColor?: string;
    backgroundUrl?: string;
    autoGroup?: Object;
}

export declare const rgb: (r: number, g: number, b: number) => string;

export declare const setPresetStyle: ({ ...args }: cssList) => string;

export declare const setStyleLib: (namespace: string, { ...args }: cssList) => styleLib;

export declare const setUnit: (name: string | Array<string>, unit: string) => void;

declare interface styleLib {
    namespace: string;
    cssList: Object;
}

export declare const useLib: (lib: styleLib) => boolean;

export declare const useMedia: (mediaType: string, mediaFeature: string, featureValue: string | number, styleList: cssList) => void;

export declare const useStyle: ({ ...args }: cssList) => any;

export { }
