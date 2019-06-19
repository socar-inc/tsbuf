"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("../../util/type");
var const_1 = require("./const");
function generateGenrnicRpcMethod(method) {
    return method.name + ": {\n    request: " + type_1.typeMapping(method.argTypeName) + ",\n    response: " + type_1.typeMapping(method.returnTypeName) + ",\n  };";
}
exports.generateService = function (mode) { return function (i) { return "\n" + (mode === const_1.GenerateMode.Global ? '' : 'export ') + "interface " + i.name + " {\n" + i.methods.map(generateGenrnicRpcMethod).join('\n') + "\n}\n"; }; };
