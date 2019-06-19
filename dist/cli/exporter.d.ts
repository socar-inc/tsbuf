import { GenerateMode } from '../typescript';
export declare const logger: {
    log(a?: string): void;
    success(a?: string): void;
    error(a?: string): void;
    warning(a?: string): void;
    pri(a?: string): void;
};
export declare function exportSource(result: any, mode?: GenerateMode, fileName?: string, rootDir?: string): string;
export declare function exportSingleFile(inputFileName: string, outputFileName: string, mode: GenerateMode): void;
export declare class TypeScriptExporter {
    private readonly visitedPath;
    private readonly membersByFile;
    /**
     *
     * @param mode - Generate mode
     * @param fileName - Current source file name
     * @param rootDir - Root directory path for Proto Buffer files
     * @param outDir - Root directory path for generated TypeScript files
     * @param onError - handleError, return true to continue
     * @return members in the file
     */
    private handleSource;
}
