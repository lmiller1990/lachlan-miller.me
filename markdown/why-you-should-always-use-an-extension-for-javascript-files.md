# Why You Should Always Use an Extension for JavaScript Files

Back in the day, JavaScript only ran in the browser. The way to do something simple was:

```html
<script>
  /* your code here
</script>
```

If you wanted to write a lot of JavaScript, though, which some people did, you could put it in a separate file:

```html
<script src="/code.js"></script>
```

This also made is easy to load third party modules. Great!

Notice the extension? `code.js`. It tells you the file is a JavaScript file! This makes it easy for a browser to know it's JavaScript file, and to handle it like one. Extensions are good, they help other programs know what to expect when encountering a file.

# CommonJS

CommonJS is a project to standardize the module ecosystem for JavaScript outside of web browsers. At the time, browsers didn't have a module system (they'd get one eventually, more on that soon). Node.js made CommonJS popular. CommonJS is the one with `require` and `module.exports`. 

One weird thing about CommonJS is you don't need an extension. If you have 

```js
// code.js
module.exports = 'FOO'
```

You can load it with

```js
require('./foo')
```

Node.js figures it out! Even in the early days, there were other extensions available in Node.js, such as `.json` (JSON format) and `.node` (native add-on). Now there is `.mjs` (ES module) and `.cjs` (CommonJS) as well.

When you require a module in Node.js, it does something called *module resolution*. Node.js module resolution is very complex, partially because extensions are optional. This is something [Ryan Dahl lamented about Node.js](https://deno.com/learn/nodes-complexity-problem). In his new project, Deno, extensions are required!

# ES Modules

CommonJS is a module format for the server. For various reasons, [some discussed here](https://requirejs.org/docs/whyamd.html), it was not adopted for the browser. After lots of back and forth, a new specification, ES Modules, or ESM, was finalized and are now supported across all major browsers and in Node.js. ESM is the one with `import` and `export`. 

A single module system to rule them all! Kind of!

ESM works great. You can have a static import:

```js
import { foo } from './foo.js'

// do foo things
foo()
```

Or a dynamic import, which is fetched asynchronously:

```js
async function main () {
  const mod = await import('./foo.js')
  // do something with mod
}
```

Much like `<script src="/foo.js"></script>`, you need an extension. Extensions are good! Free information about the file for the browser! 

# Historical Baggage

While we waited for ESM to be finalized and implemented, bundlers like webpack became popular. JavaScript developers don't like waiting for things. Webpack implemented its own module resolution algorithm. It works with everything - CommonJS, ESM, and a bunch of other things. It also works for ESM without extensions! Which isn't really ESM, because ESM has extensions as part of the specification. 

Webpack lets you write:

```js
import './foo'
```

This is not valid in ESM - you need an extension. The reason you can get away with this is that the code you write isn't the code your bundler produces. Bundlers can be set to target various module formats - if you are targeting ESM, it will generally output a `.js` extension. Or, in the case of webpack, they ship their own runtime that handles modules differently to a browser. 

# The Future

If you are writing code to target a real ESM runtime without using a bundler, like Node.js or a browser, you need extensions. If you are using a bundler, you (generally) have the option of omitting the extension.

Other than aethestics, there isn't really a good reason to NOT have an extension. Even if you aren't targeting a real ESM runtime right now, you might want to in the future. If you are writing TypeScript, it will work fine too - if you have a `foo.ts`, you can still write:

```ts
import './foo.js'
```

And TypeScript knows what to do.

It works fine for `.tsx` too - you can write `.jsx`. Knowing if a file is going to contain JSX before hand is very useful information for compilers and preprocessors.

# moduleResolution: bundler

TypeScript 5.0 recently [landed a new `moduleResolution` configuration option](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#moduleresolution-bundler) that handles the CommonJS / ESM hybrid format, where you can do things like omit the `.js` extension for `import` statements. I've been calling it ChimeraJS.

This hybrid format doesn't have an official spec, though. I'd still recommend using an extension, even if you are using this format - extensions work with CommonJS, ESM and ChimeraJS. It's free! Why not? You've got nothing to lose, and you'll be writing ESM compliant modules, which is the only module system that is officially supported and works in the browser, Node.js, Deno, and more.

We finally have a single module system - let's use it and rejoice, instead of carrying forward the historical baggage. CommonJS served us well, but it's time to move forward.