"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binding_1 = require("./binding");
var Scope = /** @class */ (function () {
    function Scope(path, parentScope) {
        this.bindings = {};
        this.path = path;
        this.parent = parentScope;
        this.block = path.node;
        this.parentBlock = path.parent;
    }
    Scope.prototype.createBinding = function (path) {
        if (path.node.type !== 'Identifier') {
            throw new Error("Should bind with Identifier but got " + path.node.type);
        }
        if (!path.parent) {
            throw new Error('Identifier found in top level');
        }
        var bindingKind;
        if (path.parent.type === 'Message') {
            bindingKind = binding_1.BindingKind.MESSAGE;
        }
        if (path.parent.type === 'Enum') {
            bindingKind = binding_1.BindingKind.ENUM;
        }
        if (!bindingKind) {
            return false;
        }
        var identifier = path.node;
        this.bindings[identifier.name] = new binding_1.Binding({
            id: identifier,
            path: path,
            scope: this,
            kind: bindingKind,
        });
        return true;
    };
    Scope.prototype.getBinding = function (id) {
        return this.bindings[id] || null;
    };
    return Scope;
}());
exports.Scope = Scope;
