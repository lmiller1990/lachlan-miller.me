import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { Generator, Parser, Token, Tokenizer, Node } from "./markdown.ts";

Deno.test("Tokenizer#tokenize", () => {
  const text = `# My great post.




  It has 
  two lines.`;

  const actual = new Tokenizer(text).tokenize();
  const expected: Token[] = [
    { token: "h1", value: "#" },
    { value: "My", token: "text" },
    { value: "great", token: "text" },
    { value: "post.", token: "text" },
    { value: "<CR>", token: "cr" },
    { value: "It", token: "text" },
    { value: "has", token: "text" },
    { value: "two", token: "text" },
    { value: "lines.", token: "text" },
  ];

  assertEquals(actual, expected);
});

Deno.test("Parser#parse", () => {
  const tokens: Token[] = [
    { token: "h1", value: "#" },
    { token: "text", value: "hello" },
    { token: "text", value: "world." },
    { token: "cr", value: "<CR>" },
    { token: "text", value: "Content" },
    { token: "cr", value: "<CR>" },
  ];
  const expected: Node[] = [
    { type: "header_node", level: 1, text: "hello world." },
    { type: "text_node", text: "Content" },
  ];

  const actual = new Parser(tokens).parse();

  assertEquals(actual, expected);
});

Deno.test("Generator#generate", () => {
  const nodes: Node[] = [
    { type: "header_node", level: 1, text: "hello world." },
    { type: "text_node", text: "Content" },
  ];
  const expected: string = `<h1>hello world.</h1>
<p>
  Content
</p>`;

  const actual = new Generator(nodes).generate();

  assertEquals(actual, expected);
});
