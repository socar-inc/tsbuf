import { Path } from './path';
export declare type WalkAction = (node: BaseNode) => void;
export declare type Action = (path: Path, walk: WalkAction) => void;
export interface Visitor {
    [key: string]: Action | Partial<Actions>;
}
export interface Actions {
    enter: Action;
    in: Action;
    exit: Action;
}
