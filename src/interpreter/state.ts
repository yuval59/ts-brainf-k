export class State {
  #pointer: number = 0
  #state: number[] = [0]

  constructor(initialState?: number[]) {
    if (initialState) this.#state = initialState
  }

  private get Ref() {
    return this.#state[this.#pointer]
  }

  private set Ref(value: number) {
    this.#state[this.#pointer] = value
  }

  increment(): void {
    this.Ref++
  }

  decrement(): void {
    this.Ref--
  }

  moveRight(): void {
    this.#pointer++
    if (this.#pointer == this.#state.length) this.#state.push(0)
  }

  moveLeft(): void {
    this.#pointer > 0 ? this.#pointer-- : this.#state.unshift(0)
  }

  get Char(): string {
    return String.fromCharCode(this.Ref)
  }

  get Val(): number {
    return this.Ref
  }

  get Tape(): number[] {
    // For debugging purposes only
    return this.#state
  }

  input(value: number): void {
    this.Ref = value
  }
}
