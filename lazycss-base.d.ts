declare interface cssList {
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

declare interface cssMethod {
    cssName: string;
    result: string | number | Function | boolean;
}

declare const cssMethod: {
    width: (value: any) => {
        width: any;
    };
    height: (value: any) => {
        height: any;
    };
    color: (value: any) => {
        color: any;
    };
    autoFlex: (value: any) => {};
};

declare interface cssMethods {
    method: Array<cssMethod>;
}

export declare const rgb: (r: number, g: number, b: number) => string;

export declare const useStyle: ({ ...args }: cssList, selfMethod?: cssMethods | undefined) => any;

export { }
