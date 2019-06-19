"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path = /** @class */ (function () {
    function Path(node, parent, context) {
        if (parent === void 0) { parent = null; }
        if (context === void 0) { context = null; }
        this.parent = null;
        this.node = node;
        this.parent = parent || null;
        this.context = context;
    }
    return Path;
}());
exports.Path = Path;
