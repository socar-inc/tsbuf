import { Binding } from './binding';
import { Path } from './path';
import { Scope } from './scope';
export declare class ScopeStack {
    private readonly stack;
    pushScope(scope: Scope): void;
    popScope(): Nullable<Scope>;
    getBinding(id: string): Nullable<Binding>;
    createBinding(path: Path): boolean;
    private getTopScope;
}
