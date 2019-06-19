"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs = __importStar(require("fs"));
var mkdirp = __importStar(require("mkdirp"));
var path = __importStar(require("path"));
var prettier = __importStar(require("prettier"));
var parser_1 = require("../parser");
var typescript_1 = require("../typescript");
var generator_1 = require("../typescript/generator");
var enum_1 = require("../typescript/generator/enum");
var import_1 = require("../typescript/generator/import");
var interface_1 = require("../typescript/generator/interface");
// tslint:disable no-console
exports.logger = {
    log: function (a) {
        if (a === void 0) { a = ''; }
        console.log(a);
    },
    success: function (a) {
        if (a === void 0) { a = ''; }
        console.log(chalk_1.default.green('success') + " " + a);
    },
    error: function (a) {
        if (a === void 0) { a = ''; }
        console.log(chalk_1.default.red('error') + " " + a);
    },
    warning: function (a) {
        if (a === void 0) { a = ''; }
        console.log(chalk_1.default.yellow('warning') + " " + a);
    },
    pri: function (a) {
        if (a === void 0) { a = ''; }
        console.log("" + chalk_1.default.blue(a));
    },
};
function exportSource(result, mode, fileName, rootDir) {
    if (mode === void 0) { mode = typescript_1.GenerateMode.Global; }
    var importStatements = result.imports.map(import_1.generateImport(mode, fileName, rootDir)).join('\n');
    var enums = result.enums.map(enum_1.generateEnum(mode)).join('\n');
    var interfaces = result.interfaces.map(function (i) { return interface_1.generateInterface(mode)(i); }).join('\n');
    var exportStatements = result.imports.map(import_1.generateExport(mode, fileName, rootDir)).join('\n');
    var text = importStatements + "\n\n" + enums + "\n" + interfaces + "\n\n" + exportStatements;
    return prettier.format(text, { parser: 'typescript' });
}
exports.exportSource = exportSource;
function exportSingleFile(inputFileName, outputFileName, mode) {
    var proto = fs.readFileSync(inputFileName).toString();
    var ast = parser_1.Parser.parse(proto);
    var generator = new generator_1.Generator(ast);
    var interfaces = generator.getResult();
    var text = exportSource(interfaces, mode);
    mkdirp.sync(path.dirname(outputFileName));
    fs.writeFileSync(outputFileName, text);
}
exports.exportSingleFile = exportSingleFile;
function replaceExt(filePath, oldExt, ext) {
    return path.join(path.dirname(filePath), "" + path.basename(filePath, oldExt) + ext);
}
var TypeScriptExporter = /** @class */ (function () {
    function TypeScriptExporter() {
        this.visitedPath = new Set();
        this.membersByFile = {};
    }
    /**
     *
     * @param mode - Generate mode
     * @param fileName - Current source file name
     * @param rootDir - Root directory path for Proto Buffer files
     * @param outDir - Root directory path for generated TypeScript files
     * @param onError - handleError, return true to continue
     * @return members in the file
     */
    TypeScriptExporter.prototype.handleSource = function (mode, fileName, rootDir, outDir, onError) {
        if (mode === void 0) { mode = typescript_1.GenerateMode.Global; }
        try {
            if (this.visitedPath.has(fileName)) {
                return this.membersByFile[fileName];
            }
            this.visitedPath.add(fileName);
            var proto = fs.readFileSync(fileName).toString();
            var ast = parser_1.Parser.parse(proto);
            var generator = new generator_1.Generator(ast);
            var result = generator.getResult();
            var members = [];
            // Dependencies
            var importString = '';
            var exportString = '';
            for (var _i = 0, _a = result.imports; _i < _a.length; _i++) {
                var importStatement = _a[_i];
                var fullDependencyPath = path.resolve(rootDir, importStatement.path.value);
                var relativeDependencyPath = path.relative(path.dirname(fileName), fullDependencyPath);
                var importedMembers = this.handleSource(mode, fullDependencyPath, rootDir, outDir, onError);
                if (mode !== typescript_1.GenerateMode.Module) {
                    continue;
                }
                var tsDependencyPath = replaceExt(relativeDependencyPath, '.proto', '');
                if (!tsDependencyPath.startsWith('.')) {
                    tsDependencyPath = "." + path.sep + tsDependencyPath;
                }
                importString += "import { " + importedMembers.join(', ') + " } from '" + tsDependencyPath + "';\n";
                if (!importStatement.public) {
                    continue;
                }
                members = members.concat(importedMembers);
                exportString += "export * from '" + tsDependencyPath + "';";
            }
            // Enum
            var enumString = result.enums.map(enum_1.generateEnum(mode)).join('\n');
            members = members.concat(result.enums.map(function (enumAst) { return enumAst.name.name; }));
            // Interface
            var interfaceString = result.interfaces
                .map(function (i) { return interface_1.generateInterface(mode)(i); })
                .join('\n');
            members = members.concat(result.interfaces.map(function (i) { return i.node.name; }));
            var outputText = prettier.format([importString, enumString, interfaceString, exportString].join('\n'), {
                parser: 'typescript',
            });
            // Generate file
            var relativePath = path.relative(rootDir, fileName);
            var absoluteOutputPath = path.resolve(outDir, relativePath);
            var outputDir = path.dirname(absoluteOutputPath);
            var basename = path.basename(absoluteOutputPath, '.proto');
            var ext = (mode === 'global' ? '.d' : '') + ".ts";
            var outputFileName = path.resolve(outputDir, "" + basename + ext);
            mkdirp.sync(path.dirname(outputFileName));
            fs.writeFileSync(outputFileName, outputText);
            exports.logger.success("Generate " + path.relative(outDir, outputFileName));
            this.membersByFile[fileName] = members;
            return members;
        }
        catch (e) {
            this.visitedPath.delete(fileName);
            if (onError && onError(fileName)) {
                return [];
            }
            throw e;
        }
    };
    return TypeScriptExporter;
}());
exports.TypeScriptExporter = TypeScriptExporter;
