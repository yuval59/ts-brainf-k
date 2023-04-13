import { BrainFuckInterpreter } from '../interpreter/brainfuck'

const input = '{'

const programCode = `
Really simple program; just accepts an ascii character as an input and outputs the ascii value of the character

, set A to input

>>[-]+>[-]+< Set C and D to one to start loop
[ Loop on
    >[-<- On the first loop
        <<[->+>+<<]  Copy B into D (and D)
        >[-<+>] Restore B from C
        >> Go to C
    ]
    ++++++++++>[-]+>[-]>[-]>[-]<<<<< Init for the division by 10
    [->-[>+>>]>[[-<+>]+>+>>]<<<<<] Full division
    >>-[-<<+>>] Store remainder into D
    <[-]++++++++[-<++++++>]  Make it an ASCII digit; clear E
    >>[-<<+>>] Move quotient into E
    << Shuffle; new D is where E was and old D is a digit
] End loop when D is zero
<[.[-]<] Move to where C should be and output the digits till we find C

[-] set B to 0
++++++++++. print newline
`

const prog = new BrainFuckInterpreter(programCode, input)

prog.on('newLine', console.log)

prog.run()
