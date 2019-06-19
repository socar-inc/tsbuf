import { Visitor } from '../../visitor/type';
export declare class InterfaceVisitor {
    private readonly rootInterfaces;
    private readonly interfaceScopeStack;
    private readonly visitor;
    getVisitor(): Visitor;
    private enterInterface;
    private exitInterface;
    private getInterfaceScope;
}
