interface Person {
  name: string
  meta?: {
    age: number
  }
}

interface Athlete extends Person {
  sport: string
}

interface FamilyMember extends Person {
  relation: string
}

function greet<T extends Person>(person: T) {
  console.log(`Hello ${person.name}`)
  return person
}

const michael: Athlete = {
  name: 'michael',
  sport: 'basketball'
}

const g = greet(michael)


function reactive<T extends object>(object: T): T {
  return object
}

const foo = reactive({ bar: 'bar' })

console.log(
  reactive.length
)

function sayLength<T>(val: string | T[]) {
  console.log(val.length)
}

interface Human {
  id: number
  name: string
  meta: {
    color: Color
  }
}

type Color = 'black' | 'brown'

const lachlan: Human = {
  id: 1,
  name: 'lachlan',
  meta: {
    color: 'brown'
  }
}

function keys<T extends object>(value: T): Array<keyof T> {
  const arr: Array<keyof T> = []
  for (const k in value) {
    arr.push(k)
  }
  return arr
}

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

// entries<T extends { [key: string]: any }, K extends keyof T>(o: T): [keyof T, T[K]][];

// function partialUpdate<T extends object, K extends keyof T, V extends T[K]>(
//   object: T, 
//   key: K, 
//   value: V
// ) {
//   throw Error('not implemented')
// }

function partialUpdate<
  T extends object,
  K extends keyof T
>(
  object: T, 
  key: K,
  value: T[K]
): T {
  throw Error('not implemented')
}

let bleh = partialUpdate(michael, 'name', mich)
bleh = partialUpdate(michael, 'meta', { age: 40 })

export type KeyValuePair<T> = {
  [P in keyof T]: T[P]
};

function partialUpdates<T extends object>(
  // object: T, values: Partial<KeyValuePair<T>>
  object: T, values: Partial<T>
) {
  throw Error('not implemented')
}

/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

partialUpdate(lachlan, 'id', 1)
partialUpdate(lachlan, 'name', '1')
partialUpdate(lachlan, 'meta', { color: 'black' })
partialUpdates(lachlan, {
  id: 1,
  name: '1',
})
