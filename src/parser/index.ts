import * as fs from 'fs';
import * as path from 'path';
import * as peg from 'pegjs';

const defination = fs.readFileSync(path.resolve(__dirname, './protobuf.pegjs')).toString();
export const Parser = peg.generate(defination);
