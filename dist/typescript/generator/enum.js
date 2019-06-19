"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const");
exports.generateEnum = function (mode) {
    if (mode === void 0) { mode = const_1.GenerateMode.Global; }
    return function (ast) {
        return "\n    " + (mode === const_1.GenerateMode.Global ? 'declare' : 'export') + " enum " + ast.name.name + " {\n      " + ast.body.map(function (f) { return f.name.name + " = '" + f.name.name + "',"; }).join('\n') + "\n    }\n  ";
    };
};
