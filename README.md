### [socar-server](https://github.com/socar-inc/socar-server) 의 프론트엔드 소스에서 proto 파일을 typescript 인터페이스로 트랜스파일하여 사용할 목적으로 포크하였습니다.

### 원본 소스에서 비어있는 message 파일을 파싱할 때 발생하는 에러를 수정하였고, Enum 파일의 값이 인덱스 대신 프로퍼티 명으로 셋팅하도록 수정하였습니다. 아래의 커밋 메세지 참조 바랍니다.

[수정사항 커밋](https://github.com/socar-inc/tsbuf/commit/c1176268271921bafe489832c427d836dbf79e24)

# 이하 원본 READ.md 파일 내용

# tsbuf  [![npm@version](https://img.shields.io/npm/v/tsbuf.svg)](https://www.npmjs.com/package/tsbuf) [![Build Status](https://travis-ci.org/Means88/tsbuf.svg?branch=master)](https://travis-ci.org/Means88/tsbuf) [![Coverage Status](https://coveralls.io/repos/github/Means88/tsbuf/badge.svg?branch=master)](https://coveralls.io/github/Means88/tsbuf?branch=master)

Generate TypeScript enum and interface with proto buffer.

## Usage
```bash
npm install -g tsbuf
tsbuf example/proto -o example/typescript/global
# or
tsbuf example/proto -o example/typescript/module -m module

```
See `example/`

```console
$ tsbuf -h
Usage: tsbuf [options] <inputPath>

protobuf-parser
Generate TypeScript interface with Protobuf.

Options:
  -V, --version          output the version number
  -o, --output <output>  output path (default: ".")
  -m, --mode <mode>      "global": Global Definition, "module": Module Definition (default: "global")
  -h, --help             output usage information

```

## Example

```proto
syntax = "proto3";

service MyService {
  rpc rpcMethod(Fruit) returns (Package) {}
}

enum Fruit {
  Apple = 0;
  Banana = 1;
}

message Package {
  string id = 1;
  float price = 2;
}

```
Will be transformed to

```typescript
interface MyService {
  rpcMethod: {
    request: Request;
    response: Response;
  };
}

declare enum Fruit {
  Apple = 0,
  Banana = 1,
}

interface Package {
  id: string;
  price: number;
}
```
Or TypeScript module
```typescript
export interface MyService {
  rpcMethod: {
    request: Request;
    response: Response;
  };
}

export enum Fruit {
  Apple = 0,
  Banana = 1,
}

export interface Package {
  id: string;
  price: number;
}

```

### How to use interfaces from service?

Create specified types using TypeScript as follows.

```typescript
import { MyService } from '...';
import { Observable } from 'rxjs';

interface BaseServiceDefinition {
  [key: string]: {
    request: any;
    response: any;
  };
}

type RxService<T extends BaseServiceDefinition> = {
  [K in keyof T]: (request: T[K]['request']) => Observable<T[K]['response']>;
};

/**
 * `RxService<MyService>` equals:
 *
 * interface {
 *   rpcMethod(request: Request): Observable<Response>;
 * }
 *
 **/

```

## Roadmap

- [x] Basic Support
- [x] ExtendedType Field
- [x] Cli
- [x] Oneof Field
- [x] Map Field
- [x] Nested Type
- [x] Generate Global Declaration
- [x] Import (Generate Module)
- [ ] Other Options

## License
MIT
