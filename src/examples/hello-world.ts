import { BrainFuckInterpreter } from '../interpreter/brainfuck'

const programCode = `Basic Hello World ! program

++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.

This ends with a newline

<.>.

Output an exclamation mark to check the event is firing correctly`

const prog = new BrainFuckInterpreter(programCode)
prog.on('newLine', console.log)
prog.run()
