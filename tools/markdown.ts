export type TokenType = "h1" | "h2" | "cr" | "text";

export interface TokenIdentifier {
  token: TokenType;
  regexp: RegExp;
}

export const tokensTypes: TokenIdentifier[] = [
  { token: "h1", regexp: /(#)/ },
  { token: "cr", regexp: /(<CR>)/ },
  { token: "text", regexp: /\b([A-Za-z].+?)\b/ },
];

export interface Token {
  token: TokenType;
  value: string;
}

export class Tokenizer {
  #markdown: string[] = [];

  constructor(text: string) {
    this.#markdown = text
      .replaceAll(/(\n)\1+/gi, "<CR>")
      .replaceAll(/\n/gi, "")
      .split(" ")
      .map((t) => t.trim().split(/(<CR>)/))
      .flat()
      .filter((t) => !!t);
  }

  matchOneToken(elm: string): TokenType {
    for (const { token, regexp } of tokensTypes) {
      const match: RegExpMatchArray | null = elm.match(regexp);
      if (match && match[1]) {
        return token;
      }
    }

    throw Error(`Could not match ${elm}`);
  }

  tokenize() {
    const tokens: Token[] = [];

    for (const elm of this.#markdown) {
      const match = this.matchOneToken(elm);
      tokens.push({ token: match, value: elm });
    }
    return tokens;
  }
}

interface TextNode {
  type: "text_node";
  text: string;
}

interface CarriageReturnNode {
  type: "cr_node";
}

interface HeaderNode {
  type: "header_node";
  level: 1 | 2;
  text: string;
}

export type Node = TextNode | CarriageReturnNode | HeaderNode;

export class Parser {
  #tokens: Token[] = [];
  #tree: Node[] = [];

  constructor(tokens: Token[]) {
    this.#tokens = tokens;
  }

  peek(expectedToken: TokenType) {
    return this.#tokens[0].token === expectedToken;
  }

  consume(expectedToken: TokenType) {
    const token = this.#tokens.shift();
    if (!token) {
      throw Error("EOF");
    }

    if (token.token === expectedToken) {
      return token;
    }

    throw Error(`Expected ${expectedToken}, got ${token.token}`);
  }

  parseHeaderNode() {
    this.consume("h1");
    const text: string[] = [];
    while (!this.peek("cr")) {
      const word = this.consume("text");
      text.push(word.value);
    }
    console.log(text);
    this.#tree.push({
      type: "header_node",
      level: 1,
      text: text.join(" "),
    });
  }

  parseCarriageReturn() {
    this.consume("cr");
  }

  parseTextNode() {
    const text: string[] = [];
    while (!this.peek("cr")) {
      const word = this.consume("text");
      text.push(word.value);
    }
    this.#tree.push({
      type: "text_node",
      text: text.join(" "),
    });
  }

  parse() {
    this.parseHeaderNode();
    this.parseCarriageReturn();
    this.parseTextNode();
    this.parseCarriageReturn();

    return this.#tree;
  }
}

export class Generator {
  #nodes: Node[] = [];

  constructor(nodes: Node[]) {
    this.#nodes = nodes;
  }

  generate() {
    let code: string = "";

    for (const node of this.#nodes) {
      if (node.type === "header_node") {
        code += `<h${node.level}>${node.text}</h${node.level}>\n`;
      }

      if (node.type === "text_node") {
        code += `<p>\n  ${node.text}\n</p>`;
      }
    }

    return code;
  }
}
