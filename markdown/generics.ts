function identity<T>(value: T): T {
  return value
}

const foo = identity('hello')
const bar = identity(1)

interface Person {
  id: number
  name: string
}

const alice: Person = {
  id: 1,
  name: 'Alice'
}

const person = identity(alice)

function shift<T>(array: T[]): T | undefined {
  if (!array.length) {
    return undefined
  }

  const [first, ...rest] = array
  array = rest
  return first
}

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

const [person, setPerson] = useState<Person>({ id: 1, name: 'Alice' })