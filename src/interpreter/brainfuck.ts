import { BrainFuckVM } from './brainfuck-vm'

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
    this.#program = program.trim()
    if (input) this.#input = input
  }

  run(): void {
    let pointer = 0
    const VM = new BrainFuckVM(this.#program, this.#input)

    let lastRes: unknown
    let line = ''
    let result = ''

    while (pointer < this.#program.length) {
      ;[pointer, lastRes] = VM.step(pointer)
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
