import { GenerateMode } from './const';
export declare const generateImport: (mode?: GenerateMode, fileName?: string | undefined, rootDir?: string | undefined) => (importStatement: ImportStatement) => string;
export declare const generateExport: (mode?: GenerateMode, fileName?: string | undefined, rootDir?: string | undefined) => (importStatement: ImportStatement) => string;
