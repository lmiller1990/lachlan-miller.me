## `extends` and `keyof`

We've seen a very basic usage of `extends` in Types and Interfaces. `extends` is a whole lot more powerful than what we have seen so far, and can allow us to define highly dynamic types. This article will present an alternative way of thinking about `extends`, and how you can combine it with `keyof` to create a strongly typed `update` function, the kind you might see in an ORM.

## Extending Your Thinking

We've seen `extends` like this:

```ts
interface Person {
  name: string
}

interface Athlete extends Person {
  sport: string
}

interface FamilyMember extends Person {
  relation: string
}
```

You can think of this as "`Athlete` has all values of `Person`, and some more". Another observation you can make is "`Person` cannot have any properties `Athlete` does not have". A more concise way to state this is "`Person` is a subset of `Athlete`". 

Keep this "sebset" way of thinking in mind as we move forward. Let's try and write a function that can be used to greet anyone who extends the `Person` interface. It's really easy:

```ts
function greet(person: Person) {
  console.log(`Hello ${person.name}`)
}

const michael: Athlete = {
  name: 'michael',
  sport: 'basketball'
}

greet(michael)
```

No errors. Thing is, we didn't supply `Person` like `greet` expects. In TypeScript, as long as the payload meets the minimum subset required, it's fine. So `greet` doesn't really take a `Person` - it takes any object that meets the minimum subset of the `Person` interface, which is just a `name`.

What if we want `greet` to return the person it receives? This is where it's a bit more tricky. You might try just returning `person`:

```ts
function greet(person: Person) {
  console.log(`Hello ${person.name}`)
  return person
}

const result = greet(michael)
```

`result` is typed as `Person` - what we really want is it to be typed as `Athlete`.

Let's try using a generic variable:

```ts
function greet(person: T): T {
  console.log(`Hello ${person.name}`)
  return person
}

const result = greet(michael)
```

Now we have an error. `Property 'name' does not exist on type 'T'.ts(2339)`. What we need to do is extend the generic type:

```ts
function greet<T extends Person>(person: T) {
  console.log(`Hello ${person.name}`)
  return person
}
```

Success! As you can see `extends` works with generic types as well.

## Building an Strongly Typed Update Function

The next goal will be more challenging. Imagine you are writing an ORM. You might like to update your entity (say an `Athlete`). 

```ts
let michael: Athlete = {
  name: 'michael',
  sport: 'basketball'
}

let michael = update(michael, 'sport', 'baseball')
```

We want everything to be typesafe. The following should not be valid:

```ts
// should not compile - type is incorrect
update(michael, 'sport', {})

// should not compile - invalid key
update(michael, 'legs', 2)
```

Let's get to work writing `update`.

## Typing the Object

We need two type three parameters: the source object, the key, and the value. The source object is fairly straight-forward - we aleady saw how to do it in the `greet` example. This time, we will support any object, not just a `Human`:

```ts
function update<T extends object>(
  object: T, 
  key: any, 
  value: any
): T {
  throw Error('not implemented')
}
```

So far this is fine. We have the correct return type, and any object can be passed. 

## Typing the Key

Typing the `key` is a little more challenging. We need the keys of the type `T`. This is known as an indexed access type. We'll use the `keyof` keyword.

```ts
function update<T extends object>(
  object: T, 
  key: keyof T, 
  value: any
): T {
  throw Error('not implemented')
}
```

Excellent! Now only valid keys can be passed:

```ts
// error - `height` isn't a valid key
update('michael', 'height', 100) 
```

## Strongly Typed Value Via Mapped Types

Many developers, been familiar with JavaScript, might try to use `typeof` here in combination with the previously defined type for `key`. Something like:

```ts
function partialUpdate<T extends object>(
  object: T, 
  key: keyof T, 
  value: typeof keyof T
): T {
  throw Error('not implemented')
}
```

Not quite! TypeScript now thinks you are trying to apply `typeof` on some variable called `keyof`, which doesn't exist. `typeof` belongs to JavaScript world, and only works with objects. You can't use it with types.

Another thing you might try is creating a new type, `K`, and combine it with an indexed access type, which use the `[]` syntax.

```ts
function partialUpdate<
  T extends object,
  K
>(
  object: T, 
  key: keyof T, 
  value: T[K],
): T {
  throw Error('not implemented')
}
```

Close! Now we have an error: `Type 'K' cannot be used to index type 'T'`. TypeScript doesn't know what `K` is. This is where `extends` as a subset comes in. We can give TypeScript a hint: `K` belongs to the subset of keys in `T`!

```ts
function partialUpdate<
  T extends object,
  K extends keyof T
>(
  object: T, 
  key: keyof T, 
  value: T[K]
): T {
  throw Error('not implemented')
}
```

It works now! Everything is typed correctly. 

## A Refactor

We can actually makes things more concise. I wanted to take this example as an opportunity to showcase how to use `extends` with a generic and the `keyof` keyword. In this particular scenario, we can simply inline the mapped type:

```ts
function partialUpdate<T extends object>(
  object: T, 
  key: keyof T, 
  value: T[keyof T]
): T {
  throw Error('not implemented')
}
```

An alternative, if you don't want to repeat yourself, makes use of our original solution by defining a new type `K` that `extends keyof T`:

```ts
function partialUpdate<T extends object, K extends keyof T>(
  object: T, 
  key: K,
  value: T[K]
): T {
  throw Error('not implemented')
}
```