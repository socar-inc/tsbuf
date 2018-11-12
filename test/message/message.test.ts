import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import { Parser } from '../../src/parser';
import { Generator } from '../../src/typescript/generate-interface';
import { exportText } from '../../src/typescript/helper';

const protoFileName = path.resolve(__dirname, './message.proto');
const proto = fs.readFileSync(protoFileName).toString();

const tsFileName = path.resolve(__dirname, './message.ts');
const ts = fs.readFileSync(tsFileName).toString();

describe('message', () => {
  it('should generate interface', () => {
    const ast = Parser.parse(proto);
    const generator = new Generator(ast);
    const interfaces = generator.getInterfaces();
    expect(interfaces).not.to.equal(null);
    const text = exportText(interfaces);
    expect(text).to.equal(ts);
  });
});
