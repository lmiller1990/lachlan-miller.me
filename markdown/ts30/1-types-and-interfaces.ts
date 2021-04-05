type TKind = 'cat' | 'dog' | 'human'

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

interface IHuman extends IAnimal {
  kind: 'human'
}

type TPet = IDog | ICat

const cat: ICat = {
  kind: 'cat',
  name: 'Kitty'
}

const dog: IDog = {
  kind: 'dog',
  name: 'Lucky'
}
