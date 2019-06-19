"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScopeStack = /** @class */ (function () {
    function ScopeStack() {
        this.stack = [];
    }
    ScopeStack.prototype.pushScope = function (scope) {
        this.stack.push(scope);
    };
    ScopeStack.prototype.popScope = function () {
        return this.stack.pop() || null;
    };
    ScopeStack.prototype.getBinding = function (id) {
        var scope = this.getTopScope();
        while (scope !== null) {
            if (id in scope.bindings) {
                return scope.bindings[id];
            }
            scope = scope.parent;
        }
        return null;
    };
    ScopeStack.prototype.createBinding = function (path) {
        return this.getTopScope().createBinding(path);
    };
    ScopeStack.prototype.getTopScope = function () {
        return this.stack.slice(-1)[0] || null;
    };
    return ScopeStack;
}());
exports.ScopeStack = ScopeStack;
