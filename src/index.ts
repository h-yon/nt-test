import { ok, Result } from 'neverthrow'

const tuple = <T extends unknown[]>(...args: T): T => args

type SomeObject = {
  string: string
  number: number

  numbers1: number[]
  numbers2: number[]
  numbers3: number[]
  numbers4: number[]
}

const generate = (): Result<SomeObject, never> => {
  const string = ok('string')
  const number = ok(1)

  const numbers1 = Result.combine([...Array(1).keys()].map(ok))
  const numbers2 = Result.combine([...Array(2).keys()].map(ok))
  const numbers3 = Result.combine([...Array(3).keys()].map(ok))
  const numbers4 = Result.combine([...Array(4).keys()].map(ok))

  const values = Result.combine(tuple(string, number, numbers1, numbers2, numbers3, numbers4))

  return values.map(([string, number, numbers1, numbers2, numbers3, numbers4]) => ({
    string,
    number,
    numbers1,
    numbers2,
    numbers3,
    numbers4,
  }))
}

function main() {
  const _result = generate().match(
    (t) => console.dir(t, { depth: null }),
    (e) => {
      throw e
    }
  )
}

main()
