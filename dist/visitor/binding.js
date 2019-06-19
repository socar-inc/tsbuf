"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BindingKind;
(function (BindingKind) {
    BindingKind["MESSAGE"] = "message";
    BindingKind["ENUM"] = "enum";
})(BindingKind = exports.BindingKind || (exports.BindingKind = {}));
var Binding = /** @class */ (function () {
    function Binding(params) {
        this.id = params.id;
        this.scope = params.scope;
        this.path = params.path;
        this.kind = params.kind;
    }
    return Binding;
}());
exports.Binding = Binding;
