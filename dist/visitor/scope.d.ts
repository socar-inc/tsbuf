import { Binding } from './binding';
import { Path } from './path';
export declare class Scope {
    readonly path: Path;
    readonly parent: Nullable<Scope>;
    readonly block: BaseNode;
    readonly parentBlock: Nullable<BaseNode>;
    readonly bindings: {
        [id: string]: Binding;
    };
    constructor(path: Path, parentScope: Nullable<Scope>);
    createBinding(path: Path): boolean;
    getBinding(id: string): Nullable<Binding>;
}
