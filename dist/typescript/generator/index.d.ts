import { Visitor } from '../../visitor/type';
export declare class Generator {
    private static readonly noop;
    private static getActions;
    private readonly ast;
    private readonly visitors;
    private readonly context;
    private currentNode;
    constructor(ast: BaseNode, plugins?: Visitor[]);
    getResult(): any;
    private readonly walk;
}
