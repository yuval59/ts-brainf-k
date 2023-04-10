import { Program } from '../interpreter/program'

const programCode = `Basic Hello World ! program

++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.

This ends with a newline`

const execution = new Program(programCode)
execution.on('complete', (output: string) => console.log(output))
