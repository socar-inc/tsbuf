"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scope_1 = require("../visitor/scope");
var scope_stack_1 = require("../visitor/scope-stack");
function pushScope(path) {
    var topScope = path.context.scopeStack.getTopScope();
    path.context.scopeStack.pushScope(new scope_1.Scope(path, topScope));
}
function popScope(path) {
    return path.context.scopeStack.popScope();
}
exports.semanticVisitor = {
    Proto: {
        enter: function (path) {
            var scopeStack = new scope_stack_1.ScopeStack();
            path.context.scopeStack = scopeStack;
        },
        in: function (path, walk) {
            var proto = path.node;
            path.context.scopeStack.pushScope(new scope_1.Scope(path, null));
            for (var _i = 0, _a = proto.body; _i < _a.length; _i++) {
                var node = _a[_i];
                walk(node);
            }
        },
        exit: function (path) {
            path.context.scopeStack.popScope();
        },
    },
    Enum: function (path, walk) {
        var enumeration = path.node;
        walk(enumeration.name);
        for (var _i = 0, _a = enumeration.body; _i < _a.length; _i++) {
            var node = _a[_i];
            walk(node);
        }
    },
    EnumField: function (path, walk) {
        var enumField = path.node;
        walk(enumField.name);
        walk(enumField.value);
        for (var _i = 0, _a = enumField.options || []; _i < _a.length; _i++) {
            var option = _a[_i];
            walk(option);
        }
    },
    EnumValueOption: function (path, walk) {
        var enumValueOption = path.node;
        walk(enumValueOption.name);
        walk(enumValueOption.value);
    },
    Message: function (path, walk) {
        var message = path.node;
        walk(message.name);
        pushScope(path);
        for (var _i = 0, _a = message.body; _i < _a.length; _i++) {
            var node = _a[_i];
            walk(node);
        }
        popScope(path);
    },
    Oneof: function (path, walk) {
        var oneof = path.node;
        walk(oneof.name);
        for (var _i = 0, _a = oneof.body; _i < _a.length; _i++) {
            var node = _a[_i];
            walk(node);
        }
    },
    Identifier: function (path, walk) {
        path.context.scopeStack.createBinding(path);
    },
    Service: function (path, walk) {
        var service = path.node;
        for (var _i = 0, _a = service.body; _i < _a.length; _i++) {
            var rpc = _a[_i];
            walk(rpc);
        }
    },
};
