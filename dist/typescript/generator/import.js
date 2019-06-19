"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var const_1 = require("./const");
function calculatePath(src, from, root) {
    var absoluteSrcPath = path.resolve(src);
    var absoluteFromPath = path.resolve(root, from);
    return path.relative(absoluteSrcPath, absoluteFromPath);
}
exports.generateImport = function (mode, fileName, rootDir) {
    if (mode === void 0) { mode = const_1.GenerateMode.Global; }
    return function (importStatement) {
        if (mode === const_1.GenerateMode.Global) {
            return '';
        }
        if (!fileName || !rootDir) {
            return "import * from '" + importStatement.path.value + "';";
        }
        return "import * from '" + calculatePath(fileName, importStatement.path.value, rootDir) + "';";
    };
};
exports.generateExport = function (mode, fileName, rootDir) {
    if (mode === void 0) { mode = const_1.GenerateMode.Global; }
    return function (importStatement) {
        if (mode === const_1.GenerateMode.Global) {
            return '';
        }
        if (!importStatement.public) {
            return "export * from " + importStatement.path.value + ";";
        }
        if (!fileName || !rootDir) {
            return "export * from '" + importStatement.path.value + "';";
        }
        return "export * from '" + calculatePath(fileName, importStatement.path.value, rootDir) + "';";
    };
};
