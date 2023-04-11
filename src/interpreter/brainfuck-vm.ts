import { State } from './state'

const recognizedCommands = [',', '.', '-', '+', '<', '>', '[', ']']

export class BrainFuckVM {
  // Initial conditions (not static)
  #program: string
  #input: string = ''

  // Program state
  #state: State = new State()
  #pointer: number = 0

  constructor(program: string, input?: string) {
    this.#program = program
      .split('')
      .filter((char) => recognizedCommands.includes(char))
      .join('')
    if (input) this.#input = input
  }

  #getCommand(): string {
    return this.#program[this.#pointer]
  }

  get State(): number[] {
    return this.#state.Tape
  }

  step(pointer: number): [number, unknown?] {
    this.#pointer = pointer

    switch (this.#getCommand()) {
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
        if (this.#state.Val != 0) {
          this.#pointer++
          break
        }

        let counter = 1
        while (counter > 0) {
          this.#pointer++

          if (this.#getCommand() == '[') counter++
          if (this.#getCommand() == ']') counter--
        }
        this.#pointer++

        break
      }

      case ']': {
        let counter = 1

        while (counter > 0) {
          this.#pointer--

          if (this.#getCommand() == ']') counter++
          if (this.#getCommand() == '[') counter--
        }

        break
      }
    }

    return [this.#pointer]
  }
}
