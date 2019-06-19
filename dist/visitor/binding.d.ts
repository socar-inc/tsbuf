import { Path } from './path';
import { Scope } from './scope';
export declare enum BindingKind {
    MESSAGE = "message",
    ENUM = "enum"
}
export declare class Binding {
    readonly id: Identifier;
    readonly scope: Scope;
    readonly path: Path;
    readonly kind: BindingKind;
    constructor(params: {
        id: Identifier;
        scope: Scope;
        path: Path;
        kind: BindingKind;
    });
}
