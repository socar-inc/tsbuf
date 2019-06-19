"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function typeMapping(typeName) {
    if (typeName.type === 'KeywordType') {
        return keywordTypeMapping(typeName);
    }
    return extendedTypeMapping(typeName);
}
exports.typeMapping = typeMapping;
function keywordTypeMapping(typeName) {
    var map = {
        bool: 'boolean',
        string: 'string',
        bytes: 'string',
        int32: 'number',
        fixed32: 'number',
        uint32: 'number',
        sint32: 'number',
        sfixed32: 'number',
        int64: 'string',
        fixed64: 'string',
        uint64: 'string',
        sint64: 'string',
        sfixed64: 'string',
        float: 'number',
        double: 'number',
    };
    return map[typeName.typeName] || 'any';
}
exports.keywordTypeMapping = keywordTypeMapping;
function extendedTypeMapping(typeName) {
    if (!typeName.path || typeName.path.length === 0) {
        return typeName.identifier.name;
    }
    return typeName.path.map(function (id) { return id.name; }).concat([typeName.identifier.name]).join('.');
}
exports.extendedTypeMapping = extendedTypeMapping;
