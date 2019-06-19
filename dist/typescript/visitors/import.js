"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImportVisitor = /** @class */ (function () {
    function ImportVisitor() {
        var _this = this;
        this.imports = [];
        this.visitor = {
            Proto: {
                enter: function (path) {
                    path.context.imports = _this.imports;
                },
            },
            ImportStatement: {
                exit: function (path) {
                    var importStatement = path.node;
                    _this.imports.push(importStatement);
                },
            },
        };
    }
    ImportVisitor.prototype.getVisitor = function () {
        return this.visitor;
    };
    return ImportVisitor;
}());
exports.ImportVisitor = ImportVisitor;
