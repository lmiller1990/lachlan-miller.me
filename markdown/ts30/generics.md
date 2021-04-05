Good programming langauges let us write reusable code. How about types? One of the most powerful parts of any typed language is it's ability to create reusable *types*.

This article will discuss the basics of generic types, or *generics*, in TypeScript.

## Hello Generics

The identity function can be considered the "hello, world" of generics. It's a functino returns whatever you pass in. Ideally, it will return the result with the correct type. 

A naive implementation for a string might look like this:

```ts
function identity(value: string): string {
  return value
}

const foo = identity('hello')
```

In this example `foo` is correctly inferred to be a string by the my IDE (via the TypeScript compiler and language server).

TypeScript is smart - we can remove the return type:

```ts
function identity(value: string) { 
  return message
}
```

`message` is still inferred as a `string`. Great! What about for a number? You might try to use the intersection operator:

```ts
function identity(value: string | number) { 
  return value
}

const foo = identity('hello')
const bar = identity(1)
```

Alas, TypeScript is not that smart. Both `foo` and `bar` are typed as `string | number`. How about a [function overload](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)?

```ts
function identity(value: string): string
function identity(value: number): number
function identity(value: any) { 
  return value
}

const foo = identity('hello')
const bar = identity(1)
```

It works! Great... until you need to support an array type. Now you need another overload. Not ideal!

## Generics to the Rescue

I said TypeScript wasn't that smart in the previous section - actually, TypeScript is much smarter - the problem is, we are using the wrong tool for the job. What we really want to is return the type of `value`, whatever is happens to be. Something like this:

```ts
function identity(value: TheType): TheType {
  return value
}
```

This won't work - TypeScript will look for a `TheType` type, which we have not declared. What we need is a special kind of type - a *type variable*. You can declare one of those with the `<Type>` syntax.

```ts
function identity<TheType>(value: TheType): TheType {
  return value
}
```

Now TypeScript knows we are trying to capture the input type - not just declare it. Here we declared it as `TheType`, but you can call it whatever you like. It's idiomatic to name a single type variable `T`. T

Using a type variable works great, for `string` and `number`:

```ts
function identity<T>(value: T): T {
  return value
}

const foo = identity('hello') // inferred as `string`
const bar = identity(1) // inferred as `number`
```

... and even more complex types!

```ts
interface Person {
  id: number
  name: string
}

const alice: Person = {
  id: 1,
  name: 'Alice'
}

const person = identity(alice) // inferred as `Person`!
```

## Creating a Generic `shift` Function

A more interesting example using generics is creating an `shift` function. `shift` takes an array an removes the first element. This is a destructive operation - the input array is modified. It returns the removed element. If the array is empty, it returns undefined. 

This can be accomplished with a type variable. Note, you can use the type variable as an array, or even as more complex type!

```ts
/**
 * Removes the first element from an array and returns it.
 * If the array is empty, undefined is returned and the array is not modified.
 */
function shift<T>(array: T[]): T | undefined {
  if (!array.length) {
    return undefined
  }

  const [first, ...rest] = array
  array = rest
  return first
}
```

## In the Wild

A more advanced example comes from the React types. React has a `useState` function. It takes one argument, the initial value, and returns a tuple (basically, an array with two elements). The first is the current value, and the second is a function to update the value.

```ts
const [count, setCount] = useState(5)
```

We can write a generic version of `useState` to infer the type based on the initial value. The user can also specify the value. Finally, `setCount` should expect the same type that is inferred, or provided.

A minimal function matching the required types might look something like this:

```ts
function useState<S>(initialState: S): [S, (newValue: S) => void] {
  function updateState(newValue: S) {
    // ... react magic ...
  }

  return [
    initialState,
    updateState
  ]
}

const [count, setCount] = useState(5)
```

`count` is inferred to be a `number`. `setCount` will also fail to compile if anything but a number is provided!

You can provide a custom type manually, too:

```ts
interface Person {
  id: number
  name: string
}

const [person, setPerson] = useState<Person>({ id: 1, name: 'Alice' })
```

Check out the full type defintion for React's `useState` function [here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/2b494d6717f6c6b8c15c5f7e95d964455890b6d3/types/react/index.d.ts#L911). It's not that different to the one we wrote. 