# TS Brainfuck

This is an implementation of the famous esoteric programming language, Brainfuck.
This is meant as a fun project and not as an actual "good" implementation, and as such I will be focusing on "proper" best practices and readability.

Supports all [brainfuck commands](https://esolangs.org/wiki/Brainfuck) (but might not support edge cases)

## List of Brainfuck commands:

- `>` to increase the data pointer
- `<` to decrease the data pointer
- `+` to increment the byte at the data pointer
- `-` to increment the byte at the data pointer
- `.` to output the byte at the data pointer
- `,` to store a byte at the data pointer
- `[` & `]` to loop around a block of code, until the byte at the data pointer is 0, or more specifically:
- - `[` Jump past the matching `]` if the byte at the data pointer is 0
- - `]` Jump back to the matching `[` if the cell at the data pointer is nonzero

### Use:

If, for some reason or another, you've also suffered a traumatic brain injury and would like to write some Brainfuck code (you know, for fun), here are the steps for starting:

First, read the basic Brainfuck guide linked [here](https://esolangs.org/wiki/Brainfuck).

Fork the code and clone it to your machine.
Add an example file (or use an existing one), and import the interpreter (`BrainFuckInterpreter`) from src/interpreter/brainfuck.

Instantiate a new program interpreter by calling `new BrainFuckInterpreter` and passing in your program and an optional input.

Add an event handler by calling the `.on` method on your new interpreter object, passing in the type of event(`output`, `newLine`, or `complete`), and finally run the program by calling the `.run` method on your interpreter object.

Additionally, linked [here](https://esolangpark.vercel.app/ide/brainfuck) is a link to an online visualizer to make creating your first program or visualizing it a little bit easier.

Note: the linked visualizer, while incredibly useful, does have some differences from this implementation. Most notably:

- 8-bit cell values.

  > This implementation uses the default JS `number`, whereas the visualizer uses 8-bit values which allow for numbers in the range [-128, 127]

  > JavaScript, for comparison, uses double-precision floating-point format numbers as described in [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754), meaning the maximum integer value moves between +/-`9007199254740991`, or roughly `nine quadrillion`.

- The linked visualizer uses a limited amount of cells.

  > This implementation will absolutely allow you to fill up your RAM

- When moving left of the 0th cell, the linked visualizer will exit with a `RuntimeError: Tape pointer out of bounds`
  > This implementation will add a cell to the left of the tape and simply leave the pointer on the 0th cell (now the new cell)
  >
  > - Note: this includes shifting the entire Tape, which makes this operation quite costly. Use with care.

All this to say, your programs might not work here exactly as they do in the visualizer, and take consideration when moving between the two - if you want to see those differences in action (and why I took this approach in the first place, other than ease of implementation), I implore you to look in [my implementation of the Fibonacci sequence](src/examples/compute-fibonacci.ts).
