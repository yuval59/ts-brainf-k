import { State } from './state'

export class Program {
  // Initial conditions (not static)
  #program: string
  #input: string = ''

  // Program state
  #state: State
  #pointer: number = 0

  // Final condition
  #result: string = ''

  constructor(program: string, input?: string) {
    this.#program = program
    if (input) this.#input = input
    this.#state = new State()

    this.#run()
    console.log(this.Result)
  }

  private get Command(): string {
    return this.#program[this.#pointer]
  }

  private get PreviousCommand(): string {
    return this.#program[this.#pointer - 1]
  }

  #run(): void {
    let res = ''

    while (this.#pointer < this.#program.length) {
      const stepResult = this.#step()
      if (stepResult) res += stepResult
    }

    this.#result = res
  }

  #step(): unknown {
    switch (this.Command) {
      case '+': {
        this.#state.increment()
        this.#pointer++
        break
      }

      case '-': {
        this.#state.decrement()
        this.#pointer++
        break
      }

      case '>': {
        this.#state.moveRight()
        this.#pointer++
        break
      }

      case '<': {
        this.#state.moveLeft()
        this.#pointer++

        break
      }

      case '.': {
        this.#pointer++
        return this.#state.Char
      }

      case ',': {
        this.#state.input(this.#input.charCodeAt(0))
        this.#input = this.#input.slice(1)

        this.#pointer++
        break
      }

      case '[': {
        if (this.#state.Val) {
          this.#pointer++
          break
        }

        while (this.PreviousCommand != ']') this.#pointer++

        break
      }

      case ']': {
        if (!this.#state.Val) {
          this.#pointer++
          break
        }

        // If you don't use a type assertion here, TypeScript will complain about the comparison appearing unintentionally.
        while ((this.Command as string) != '[') this.#pointer--

        break
      }

      default:
        this.#pointer++
    }
  }

  get Program(): string {
    return this.#program
  }

  get State(): number[] {
    return this.#state.Tape
  }

  get Result(): string {
    return this.#result
  }
}
