## Types and Interfaces

In this article we explore the intricaties of types and interfaces - defined via `type` and `interface` - in TypeScript. There are some similarities, but also some differences to look out for.

## Not Types, but Type Aliases

If we look at the [official documentation](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases), we will see types are actually referred to as "Type Aliases". When you define a type, you are creating an alias, or a new *name*, to an existing definition. A type alias (often just referred to as a type for short, like in this article) defines data. 

An `interface`, on the other hand, is used to describe the shape of some data - usually an object. 

Despite this somewhat ambiguous definition, you can use a type aliases in a similar capacity to interfaces. Time for some examples.

## The Animal Type

In this example we define an `Animal` type. To make it clear it's a type, not an interface, we prepend the type with `T`.

```ts
type TAnimal = {
  kind: 'cat' | 'dog'   
  name: string
}

const kitty: TAnimal = {
  kind: 'cat',
  name: 'Kitty'
}

const lucky: TAnimal = {
  kind: 'dog',
  name: 'Lucky'
}
```

We created a new `TAnimal` type. In the tiny little world we are defining, there are only two types of animals - cats and dogs. Creating a `TAnimal` with a `kind` other than `cat` or `dog` will throw an error.

## Types in Types

Instead of specifying the `kind` every time we define a `TAnimal`, we can create another type alias. Type aliases can use type aliases!

```ts
type TKind = 'cat' | 'dog'

type TAnimal = {
  kind: TKind
  name: string
}
```

## TDog and TCat Type Aliases

If dogs and cats are so common in our system, we might like a `TDog` and `TCat` type. The both share some common definitions - namely, they have `kind` and `name` properties. Thinking ahead when we want to add some more animals to our world, maybe a `TBird`, we decide having a shared base type sounds like a pretty good idea.

This is where type aliases might not be the best choice.

Let's try it out. We will define a `TCat` and `TDog` which use a base type, `TAnimal`. This introduces a new operator, `&`, the intersection operator.

```ts
type TKind = 'cat' | 'dog'

type TAnimal = {
  kind: TKind
  name: string
}

type TDog = {
  kind: 'dog'
} & TAnimal

type TCat = {
  kind: 'cat'
} & TAnimal

const cat: TCat = {
  kind: 'cat',
  name: 'Kitty'
}

const dog: TDog = {
  kind: 'dog',
  name: 'Lucky'
}
```

A little awkward, but we did it! The intersection operator basically smooshes all the types together. A concise example would be:

```ts
type HasStatusCode = {
  code: number
}

type HasBody = {
  body: string
}

type Request = HasStatus & HasBody
```

A valid `Request` must now have a `code` and a `body`.

While w *can* compose complex type aliases by combining them, there is a more idiomatic way: `interface`, which works with the `extends` keyword.

## Refactoring to Interface

Whenever you are defining a base type that is you intend to extend, using an interface probably makes sense. Let's do a refactor, using `interface` where possible:

```ts
type TKind = 'cat' | 'dog'

interface IAnimal {
  kind: TKind
  name: string
}

interface IDog extends IAnimal {
  kind: 'dog'
}

interface ICat extends IAnimal {
  kind: 'cat'
}

const cat: ICat = {
  kind: 'cat',
  name: 'Kitty'
}

const dog: IDog = {
  kind: 'dog',
  name: 'Lucky'
}
```

When it comes to actually *using* the interface, it's exaclty the same syntax: `const dog: <type or interface> = { ... }`. 

Notice we will have one type alias - `type TKind = 'cat' | 'dog'`. You can't use `interface` to alias types like this. `interface IKind = 'dog' | 'cat'` is simply not valid. A general rule of thumb could be use `interface` for defining types intended as base definitions, and use `type` for aliasing multiple types.

Another example using `type` to group types could be if we added a `IHuman` to the system, but would like to capture `IDog` and `ICat` as a subset of the `IAnimal` type. This also introduces a new operator, the `|` union operator.

```ts
type TKind = 'cat' | 'dog' | 'human'

// interface ICat, IDog ...

interface IHuman extends IAnimal {
  kind: 'human'
}

type TPet = IDog | ICat
```

`|` means `TPet` can either be an `IDog` *or* and `ICat` - but not an `IHuman`. `TPet` *unites* the two type aliases - that's why `|` is called the `union` operator.

## Further Extending Interfaces

`interface` has a another neat feature - you can extend the *same* interface in multiple places in the same file (which isn't very useful), but also in different files (which is very useful).

A common example of this is extending the built-in `Window` interface. Perhaps you added something on `window` in your application, and would like to type it:

```ts
interface Window {
  foo: string
}

window.foo // strongly typed!
```

Another common example is extending an API defined by a third party module. The [Cypress](https://cypress.io) test runner ships with a number of useful commands on the `cy` variable, which is makes available globally. You can also [extend it](https://docs.cypress.io/guides/tooling/typescript-support#Types-for-custom-commands), adding your own strongly typed methods. This makes use of the `namespace` keyword, which I discuss in another article. In this example we extend the `Chainable` interface, defining a `dataCy` method:

```ts
declare namespace Cypress {
  interface Chainable<Element> {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>
  }
}
```

## Under the Hood

There are also some under-the-hood implications when deciding to use a type alias or an interface. For most people, these won't matter, but it's good to know either way.

## Interfaces Over Intersections

Microsoft recommends [interfaces over intersections](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections). This is basically for performance reasons - type intersections are much more complex to evaluate under the hood. They also display a little better in IDEs like VS Code.

Where you can, instead of:

```ts
type Foo = Bar & Baz & {
    someProp: string;
}
```

Do this:

```ts
interface Foo extends Bar, Baz {
    someProp: string;
}
```

## Prefer Base Types Over Unions

Another [Microsoft recommendation](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-base-types-over-unions). The example they provide is this:

```ts
interface WeekdaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
  wake: Time
  startWork: Time
  endWork: Time
  sleep: Time
}

interface WeekendSchedule {
  day: 'Saturday' | 'Sunday'
  wake: Time
  familyMeal: Time
  sleep: Time
}

function printSchedule(schedule: WeekdaySchedule | WeekendSchedule) {
  // ...
}
```

This works fine - but `WeekdaySchedule` and `WeekendSchedule` are fairly complex types. More complex types will slow down the TypeScript compiler. This has no runtime cost, since you are compiling to typeless JavaScript at the end of the day, but it's nice to keep things as fast and performant as possible, even during development.

An alternative would be to use `interface` and the `extends` keyword, like we saw before:

```ts
interface Schedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  wake: Time
  sleep: Time
}

interface WeekdaySchedule extends Schedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
  startWork: Time
  endWork: Time
}

interface WeekendSchedule extends Schedule {
  day: 'Saturday' | 'Sunday'
  familyMeal: Time
}

function printSchedule(schedule: Schedule) {
  // ...
}
```

This results in a much easier comparison for the TypeScript compiler to execute. The more you know. 