import { createToken, ITokenConfig, Lexer, TokenType } from 'chevrotain';

export const tokens: TokenType[] = [];

function c(config: ITokenConfig): TokenType {
  const token = createToken(config);
  tokens.push(token);
  return token;
}

export const WhitespaceToken = c({
  name: 'WhitespaceToken',
  pattern: /[ \t\f]+/,
  group: Lexer.SKIPPED,
});

export const LineTerminatorToken = c({
  name: 'LineTerminatorToken',
  pattern: /\n|\r|\r\n/,
  line_breaks: true,
  group: Lexer.SKIPPED,
});

export const SemicolonToken = c({
  name: 'SemicolonToken',
  pattern: /;/,
});

export const EqualToken = c({
  name: 'EqualToken',
  pattern: /=/,
});

export const LeftBraceToken = c({
  name: 'LeftBraceToken',
  pattern: /{/,
});

export const RightBraceToken = c({
  name: 'RightBraceToken',
  pattern: /}/,
});

export const LineCommentToken = c({
  name: 'LineCommentToken',
  pattern: /\/\/.*/,
  // group: "singleLineComments"
});

export const StringLiteralToken = c({
  name: 'StringLiteralToken',
  pattern: /"(:?[^\\"]|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
});

export const IntegerToken = c({
  name: 'IntegerToken',
  pattern: /\d+/,
});

export const IdentifierToken = c({
  name: 'IdentifierToken',
  pattern: /[a-zA-Z_][a-zA-Z_0-9]*/,
});
