import { State } from './state'

export class BrainFuckVM {
  //#region Operating code
  // Initial conditions (not static)
  #program: string
  #input: string = ''

  // Program state
  #state: State = new State()
  #pointer: number = 0

  constructor(program: string, input: string) {
    this.#program = program
    if (input) this.#input = input
  }

  private get Command(): string {
    return this.#program[this.#pointer]
  }

  private get PreviousCommand(): string {
    return this.#program[this.#pointer - 1]
  }

  get State(): number[] {
    return this.#state.Tape
  }

  step(pointer: number): [number, unknown?] {
    this.#pointer = pointer

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
        return [this.#pointer, this.#state.Char]
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

    return [this.#pointer]
  }
  //#endregion
}
