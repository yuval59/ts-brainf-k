import { State } from './state'

type handlers = { [action: string]: outputFunction[] }
type outputFunction = (output: string) => any
type eventOptions = 'output' | 'newLine' | 'complete'

export class Program {
  //#region Operating code
  // Initial conditions (not static)
  #program: string
  #input: string = ''

  // Program state
  #state: State
  #pointer: number = 0

  // Event handlers
  #handlers: handlers = {
    output: [],
    newLine: [],
    complete: [],
  }

  constructor(program: string, input?: string) {
    this.#program = program
    if (input) this.#input = input
    this.#state = new State()

    this.#run()
  }

  private get Command(): string {
    return this.#program[this.#pointer]
  }

  private get PreviousCommand(): string {
    return this.#program[this.#pointer - 1]
  }

  #run(): void {
    let line = ''
    let result = ''

    while (this.#pointer < this.#program.length) {
      const stepResult = this.#step()
      if (!stepResult) continue

      line += stepResult
      result += stepResult

      for (const handler of this.#handlers.output) {
        handler(stepResult as string)
      }

      if (stepResult != '\n') continue

      for (const handler of this.#handlers.newLine) {
        handler(line)
      }

      line = ''
    }

    for (const handler of this.#handlers.complete) {
      handler(result)
    }
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
  //#endregion

  //#region Getters
  get Program(): string {
    return this.#program
  }

  get State(): number[] {
    return this.#state.Tape
  }
  //#endregion

  on(event: eventOptions, handler: outputFunction): void {
    if (this.#handlers[event]) this.#handlers[event].push(handler)
  }
}
