import { BrainFuckVM } from './brainfuck-vm'
import { sterilizeProgram } from './utils'

type handlers = { [key: string]: outputFunction[] }
type outputFunction = (output: string, finalTape?: number[]) => any
type eventOptions = 'output' | 'newLine' | 'complete'

export class BrainFuckInterpreter {
  //#region Operating code
  // Initial conditions (not static)
  #program: string
  #input: string = ''

  // Event handlers
  #handlers: handlers = {
    output: [],
    newLine: [],
    complete: [],
  }

  constructor(program: string, input?: string) {
    this.#program = sterilizeProgram(program)
    if (input) this.#input = input
  }

  run(): void {
    const VM = new BrainFuckVM(this.#program, this.#input)

    let lastRes: unknown
    let line = ''
    let result = ''

    let positionInProgram = 0
    while (positionInProgram < this.#program.length) {
      ;[positionInProgram, lastRes] = VM.step(positionInProgram)
      if (!lastRes) continue

      line += lastRes
      result += lastRes

      if (lastRes != '\n') {
        for (const handler of this.#handlers.output) {
          handler(lastRes as string)
        }

        continue
      }

      for (const handler of this.#handlers.newLine) {
        handler(line.trim())
      }

      line = ''
    }

    for (const handler of this.#handlers.complete) {
      handler(result.trim(), VM.State)
    }
  }
  //#endregion

  //#region Getters
  get Program(): string {
    return this.#program
  }
  //#endregion

  on(event: eventOptions, handler: outputFunction): void {
    if (this.#handlers[event]) this.#handlers[event].push(handler)
  }
}
