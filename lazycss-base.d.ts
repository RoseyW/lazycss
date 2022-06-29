declare interface cssList {
    fatherNode?: string;
    namespace?: string;
    width?: number;
    height?: number;
    marginTop?: number;
    marginLeft?: number;
    marginRight?: number;
    marginBottom?: number;
    color?: string;
    backgroundColor?: string;
    backgroundUrl?: string;
}

declare interface mediaCondition {
    maxWidth?: number | string;
    maxHeight?: number | string;
}

declare interface mediaConfig {
    condition: mediaCondition;
}

export declare const rgb: (r: number, g: number, b: number) => string;

export declare const setGlobalUnit: (name: string | Array<string>, unit: string) => void;

export declare const setPresetStyle: ({ ...args }: cssList) => string;

export declare const setStyleLib: (namespace: string, { ...args }: Object) => styleLib;

export declare const setUnit: (name: string | Array<string>, unit: string, namespace?: string) => void;

declare interface styleLib {
    namespace: string;
    cssList: Object;
}

/**
 * useClass: add class when used useStyle
 * */
export declare const useClass: (className: string, { ...args }: Object, namespace?: string) => void;

export declare const useEffect: (elementName: string, func: Function) => void;

export declare const useLib: (lib: styleLib) => boolean;

export declare const useMedia: (DomName: string, config: mediaConfig, styleList: cssList, namespace?: string) => void;

export declare const useStyle: ({ ...args }: Object, namespace?: string, presetStyle?: Object) => any;

export { }
