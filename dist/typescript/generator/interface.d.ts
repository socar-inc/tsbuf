import { GenerateMode } from './const';
export interface InterfaceTreeNormalField {
    type: 'normal';
    typeName: Type;
    name: string;
    repeated: boolean;
    optional?: boolean;
}
export interface InterfaceTreeMapField {
    type: 'map';
    typeName: Type;
    name: string;
    repeated?: false;
    optional?: boolean;
}
declare type InterfaceTreeField = InterfaceTreeNormalField | InterfaceTreeMapField;
export interface InterfaceTree {
    node: {
        name: string;
        fields: InterfaceTreeField[];
    };
    children: InterfaceTree[];
}
export declare const generateInterface: (mode: GenerateMode) => (i: InterfaceTree) => string;
export {};
