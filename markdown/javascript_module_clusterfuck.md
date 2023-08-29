## The JavaScript Module Clusterfuck

JavaScript modules have a long and complicated history. TypeScript works well with both of the most common formats (CommonJS and ES Modules, or ESM). It can even make the two work together, for the most part!

It's important to remember the differences between the two syntaxes - depending on how you configure `tsconfig.json`, you might end up in a situation where the code you build isn't what you expect. Then, when you go to run it, you might run into a cryptic error like

>  exports is not defined in ES module scope

In this post, I'll talk about the module formats, how `tsconfig.json` handles each one, and how to fix some common errors.

*Note*: I could be missing some historical context. I point out some behaviors and decisions that TypeScript makes that I don't really understand. I think TypeScript is a really great tool and I am a happy user - it certainly does some strange things, though, which I'll touch on soon!

## CommonJS

Let's start with a simple example. We will look at some code, compile it, and see the output. This is the best way to understand how TypeScript handles different syntaxes and what the different options in `tsconfig.json` do.

Given `foo.ts`:

```ts
import { bar } from "./bar";
console.log(bar)
```

And `bar.ts`:

```ts
export const bar = "bar";
```

And a basic `tsconfig.json`:

```json
{
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

If you compile this project with `npx tsc --project .` and look in `dist`, we get:

```js
// foo.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bar_1 = require("./bar");
console.log(bar_1.bar);

// bar.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
exports.bar = "bar";
```

Notice something? Where is `import` and `export?` TypeScript compiled your code to CommonJS, even though you wrote ESM! Wild!

That's because the default value for `module` in `tsconfig.json` is `CommonJS`:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "module": "CommonJS"
  }
}
```

The code *does* work as expected, though. `node dist/foo.js` prints "bar".

## Should This Even Work?

It's already clear why things are so confusing nowadays in JavaScript projects. The default behavior for TypeScript, which is more or less the default way to write JavaScript for non-trivial projects, exhibits several unintuitive behaviors:

1. Uses `import` and `export` syntax by default (generally; the documentation primarily uses this)
2. Defaults to `CommonJS` when compiled (but `import` and `export` aren't keywords in CommonJS!)

I think this default behavior is confusing. I think they wanted to decouple the syntax (`import` vs `require`) and the compilation target (CommonJS or ESM). I can't really imagine why this was decided; it would really be a lot more simple if you just had to pick one, and the option to compile to another, different module system wasn't available.

Anyway, let's try changing `module` to something else, and see what happens.

## `module: "es2015"`

What if we change `tsconfig.json`:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "module": "ES2015"
  }
}
```

Now the `module` matches the syntax we are writing. Recompiling the project gives us:

```js
// dist/foo.js

import { bar } from "./bar";
console.log(bar);

// dist/bar.js
export var bar = "bar";
```

`var` is back! It's been a while, old friend - can't say anyone missed you and your weird hoisting behavior. You can fix that to be `const` using `target`, which is another topic for another blog post.

Anyway, the impact of `module` is clear now; it tells TypeScript what kind of module you want to output. We've got ESM now... right?

Well, not really. In ESM, you *must* write the extension. `import { bar } from "./bar"` isn't valid ESM. This isn't any known module format! `import { bar } from "./bar.js" is, though. Extensions are optional in CommonJS; not in ESM.

If you try to run this code with `node dist/foo.js`, you get an all too familiar error:

```
import { bar } from "./bar";
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at Object.compileFunction (node:vm:360:18)
    at wrapSafe (node:internal/modules/cjs/loader:1055:15)
    at Module._compile (node:internal/modules/cjs/loader:1090:27)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1180:10)
    at Module.load (node:internal/modules/cjs/loader:1004:32)
    at Function.Module._load (node:internal/modules/cjs/loader:839:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_ma
in:81:12)
    at node:internal/main/run_main_module:17:47
```

This is another common issue. Nothing to do with the lack of an extension, though. 

"Cannot use import statement outside a module". "But I'm in a module!" you may think. The issue here is by default, Node.js assumes you want to run your code using CommonJS - but since you configured `tsconfig.json` to have `module: 'es2015'`, it output ESM.

Two lines in the error kind of hint at this:

```
SyntaxError: Cannot use import statement outside a module

node:internal/modules/cjs/loader:1055:
```

I wish it would say "You are using `import` but running in a CommonJS environment. Did you mean to use `require`, add a `.mjs` extension or set `"type": "module"` in your `package.json`? That would be nice. But it doesn't. 

You've got a few options. Two of those are:

1. Change your `package.json` to `"type": "module"`. This will mean Node.js assumes all modules are ESM. This is not usually practical for most established projects.
2. Change the extension to `.mjs` to tell Node.js to load the module as ESM.

The former is not usually an option in any large code base; you are probably using CommonJS only dependencies from npm.

Let's see how both work anyway, for our own understanding.

## Option 1: `"type": "module"`

By setting `"type": "module"` in `package.json`, we change the default module loader from CommonJS to ESM. As a reminder, our project is:

```js
// foo.ts
import { bar } from "./bar";
console.log(bar);

// bar.ts
export const bar = "bar";
```

And our `tsconfig.json`:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "module": "ES2015"
  }
}
```

If we compile our project, the output is very similar to our original code:


```js
// dist/foo.js
import { bar } from "./bar";
console.log(bar);

// dist/bar.js
export var bar = "bar";
```

So now we have the correct module format via `"type": "module":` and we are compiling to ESM using `"module": "es2015"` in our `tsconfig.json`. Everything should work, right?

If you run this with `node dist/foo.js`:

```
node:internal/errors:477
    ErrorCaptureStackTrace(err);
    ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/lachlanmiller/code/dump
/ts/dist/bar' imported from /Users/lachlanmiller/code/dump/ts/dist/foo.js
  ... 
  code: 'ERR_MODULE_NOT_FOUND'
}
```

Frustrating, right? What the heck?! The problem is you are now using ESM, which *requires a file extension*. `import { bar } from "./bar";` is not valid ESM; no extension! I wonder why TypeScript cannot warn us. It knows about `tsconfig.json`, after all, and that we are using `"module": "es2015"`. I suppose it can't assume where we plan to *run* the module, so it assumes we know what we are doing. Unforutantely, most of us don't know what we are doing.

So - the code that is produced is, in fact, this not valid in *any known JavaScript runtime*. TypeScript will generate code that is not valid in under *any* circumstances. The code is dead on arrival. 

I could be missing something, but this is very perplexing and leads to a lot of confusion. I wonder if there's some historical reason for this behavior. 

Despite this, it's not just TypeScript that works with invalid code - we have all been writing this kind of extensionless, invalid ESM for years - what gives? How can this be? We will come back to this soon.

For now, you can fix it by doing:

```js
import { bar } from "./bar.js";
```

Some people don't like extensions, for some reason. I think they are great - that's how you know what kind of file you are dealing with. It can be confusing, though - you need to write `bar.js`, but the only file on your machine is `bar.ts`. The confusion is understandable.

What about the other option, using a different extension all together?

## Option 2: `.mts` Extension

Node.js has interop between CommonJS and ESM. You can have a `.mjs` file, which tells Node.js that module is using ESM, that can import a CommonJS module. For example, this is perfectly valid and works:

```js
// bar.js
// is using CommonJS
module.exports = 'bar'
```

And `foo.mjs`, using ESM, but imports a CommonJS module:

```js
// foo.mjs
// is using ESM, but imports a CommonJS module
import bar from './bar.js'

console.log(bar) //=> 'bar'
```

Weird! But it works. This CommonJS / ESM interop exists to help people migrate projects from CommonJS to ESM incrementally. It works in the opposite direction, too. You can create a `.cjs` file, which does what you'd expect - tells Node.js to handle that file as a CommonJS module.

In the wild, many projects are in a weird state of using both CommonJS an ESM. More often than not, most of the developers don't know or care which module format(s) they are using. They just want to do their job, which is reasonable. And do their job they do, until they hit some weird module error that they cannot solve.

It's not really the developer's fault - it's the ecosystem, adn the mess we are in.

____

Back to our example. The above example uses `.mjs`, but we are using TypeScript. So we need to use `.mts`! So, it looks like this.


```ts
// foo.mts
import { bar } from "./bar.mjs";
console.log(bar);

// bar.mts:
export const bar = "bar";
```

Note that you write `bar.mjs`. There is no such file on our file system! Only `bar.mts` That's okay, though - TypeScript knows what you mean. When you compile the code, you get two files: `dist/foo.mjs` and `dist/bar.mjs`.

`dist/foo.mjs` is:

```js
import { bar } from "./bar.mjs";
console.log(bar);
```

and `dist/bar.mjs`:

```js
export var bar = "bar";
```

Which is pretty close to what you originally wrote! It runs just fine. If you run `node dist/foo.mjs`, it prints out `bar`.

## Module Resolution

This whole process of how the runtime figures out where to find a module is called *module resolution*. You can configure that is `tsconfig.json`, too. There are a bunch of different ones. You can find a list in the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/module-resolution.html).

## But I Don't Like Extensions!

A lot of people don't want to write extensions, like `js` and `mts`. Historically, you didn't need to - CommonJS doesn't require them. Not doing so was "one of my biggest regrets" according to the original author of Node.js, in fact!

The reality is *ESM requires a `.js` extension*. If you want to use ESM, the official runtime of JavaScript that runs in both Node.js and the browser, that's what you need to do.

If you use a bundler, however, the rules no longer apply.

## "moduleResolution": "clusterfuck"

JavaScript developers have been (over) eager to get their handes on new features far before they are widely supported. Can you blame us? The language hasn't exactly got a great standard library, and the lack of modules, among the (many) other quicks of JavaScript prior to ES2015 left much to be desired.

Since ESM was not widely supported, bundlers like webpack decided to implement their own version. webpack's ESM syntax support did not require extensions, nor did you need to specify a module at all. webpack happily handles CommonJS and extensionless ESM in the same file. This set a precedent and expectation for all future bundlers to also handle modules in a similarly flexible way. Vite is the same; it will handle extensionless ESM, CommonJS, any lots of other things, too!

TypeScript's new `"moduleResolution": "bundler"` configuration flag brings better support for this community defined mishmash of module resolution rules. I've been calling it Chimera.js; a Chimera is an animal mixed from two animals (like a human with a lion head, or something). Chimera.js is a weird mix of CommonJS (extensionless imports), ESM (using `import` and `export` and having support for async modules, like `await import(...)`, and probably some other things.

TypeScript is doing what it needs to do; evolving to become the language and tool chain the community wants. What does the community want, you ask? Definitely not a single module system and a cohesive, simple way to build JavaScript applications, that's for sure. For years, we had no module system; now we've got one, and it works *everywhere*.

![](https://imgs.xkcd.com/comics/standards.png)

Despite this, instead of standardizing on ESM, we are not only keeping the historical baggage of CommonJS, but actually bringing parts of it into ESM, like extensionless imports. No wonder debugging is so hard; the module system you are debugging isn't specified anywhere! Who's to say what should and should not work.

`"moduleResolution": "bundler"` really should not be necessary. Just write the extension. Use the module resolution rules in the ESM specification (or CommonJS, if you are using CommonJS). 

I really wish TypeScript had not implemented this. From a tooling point of view, I understand the decision; this is how everyone writes code, and TypeScript is evolving to serve the community. Having said that, I think, as a community, we should be moving towards more specification compliant code. This will be far less likely now that TypeScript has first class support for this weird, imaginary module format I'm calling Chimera.js. Any new tool that does NOT implement this mess can never see adoption or traction, since it won't work with many existing tools or projects.

## The Future

The module clusterfuck is almost certainly here to stay. It's like python 2 -> python 3, except I don't think we will ever truly move away from CommonJS to ESM. Even if we do, it's unlikely bundlers will get more strict.

For someone wants a more sane, strict alternative, there is Deno. It apparently works with npm now, but it doesn't seem to be getting a tremendous amount of momentum. It sure is nice, though; it requires extensions, it has a great standard library, and has the original author of Node.js behind it.

What about the current situation? Perhaps we need a formal specification for Chimera.js? That way, if you want to build a bundler, you'll at least have a good idea of what you should support if you want people to be able to adopt or migrate to your bundler.

Alternatively, maybe Vite or TypeScript (or both) could offer a strict mode, that requires you to write valid ESM code. Or valid CommonJS. But not a mix of the two. You need to pick a module system! 

The obvious issue with this proposal is how do you handle non-standard formats like `vue`, `svelte` and `jsx` formats? I suppose it would be the same as now TypeScript can figure out that `import 'bar.js'` actually refers to the `bar.ts` file on your machine. This might actually lead to more confusion, though? Would it really be any more confusing than the current state of things?

## Conclusion

I love the innovation and eagerness the JavaScript has to try new things and move the language and ecosystem forward. The ecosystem is in a messy state; two official module specifications, another unofficial one that merges the two; dev servers, transpilers, type systems... JavaScript Fatigue is real and it has well and truly come for me.

