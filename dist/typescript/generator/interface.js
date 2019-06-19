"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("../../util/type");
var const_1 = require("./const");
function getType(field, it) {
    var scopeNames = it.children.map(function (c) { return c.node.name; });
    var name = type_1.typeMapping(field.typeName);
    var fullName = scopeNames.indexOf(name) === -1 ? name : it.node.name + "." + name;
    if (field.repeated) {
        fullName += '[]';
    }
    return fullName.replace(/[A-Za-z]+\./g, "");
}
function generateNormalField(f, it) {
    return "" + f.name + (f.optional ? '?' : '') + ": " + getType(f, it) + ";";
}
function generateMapField(f, it) {
    return "" + f.name + (f.optional ? '?' : '') + ": {\n    [key: string]: " + getType(f, it) + ",\n  };";
}
exports.generateInterface = function (mode) { return function (i) {
    return "\n" + (mode === const_1.GenerateMode.Global ? '' : 'export ') + "interface " + i.node.name + " {\n  " + i.node.fields
        .map(function (f) {
        if (f.type === 'normal') {
            return generateNormalField(f, i);
        }
        if (f.type === 'map') {
            return generateMapField(f, i);
        }
        return '';
    })
        .join('') + "\n}\n\n" + (i.children.length <= 0
        ? ''
        : (mode === const_1.GenerateMode.Global ? 'declare' : 'export') + " namespace " + i.node.name + " {\n  " + i.children.map(function (j) { return exports.generateInterface(const_1.GenerateMode.Module)(j); }).join('\n') + "\n}");
}; };
