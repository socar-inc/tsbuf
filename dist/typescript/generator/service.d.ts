import { GenerateMode } from './const';
export interface RpcMethodField {
    type: 'rpc';
    name: string;
    argTypeName: Type;
    returnTypeName: Type;
}
export interface ServiceTree {
    name: string;
    methods: RpcMethodField[];
}
export declare const generateService: (mode: GenerateMode) => (i: ServiceTree) => string;
