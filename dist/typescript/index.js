"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var prettier = __importStar(require("prettier"));
var const_1 = require("./generator/const");
exports.GenerateMode = const_1.GenerateMode;
var enum_1 = require("./generator/enum");
var interface_1 = require("./generator/interface");
var service_1 = require("./generator/service");
function isGenerateMode(a) {
    return a === const_1.GenerateMode.Global || a === const_1.GenerateMode.Module;
}
function exportSource(result, mode) {
    if (mode === void 0) { mode = const_1.GenerateMode.Global; }
    var services = result.services.map(function (i) { return service_1.generateService(mode)(i); }).join('\n');
    var enums = result.enums.map(enum_1.generateEnum(mode)).join('\n');
    var interfaces = result.interfaces.map(function (i) { return interface_1.generateInterface(mode)(i); }).join('\n');
    var text = services + "\n" + enums + "\n" + interfaces;
    return prettier.format(text, { parser: 'typescript' });
}
exports.exportSource = exportSource;
