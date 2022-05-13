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

declare const _default: {
    useStyle: ({ ...args }: cssList) => any;
    rgb: (r: number, g: number, b: number) => string;
};
export default _default;

export { }
