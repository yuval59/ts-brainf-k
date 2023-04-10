import { BrainFuckInterpreter } from '../interpreter/brainfuck'

const programCode = `This program doesn't terminate; you will have to kill it.
Daniel B Cristofani (cristofdathevanetdotcom)
http://www.hevanet.com/cristofd/brainfuck/

>++++++++++>+>+[
    [+++++[>++++++++<-]>.<++++++[>--------<-]+<<<]>.>>[
        [-]<[>+<-]>>[<<+>+>-]<[>+<-[>+<-[>+<-[>+<-[>+<-[>+<-
            [>+<-[>+<-[>+<-[>[-]>+>+<<<-[>+<-]]]]]]]]]]]+>>>
    ]<<<
]`

const prog = new BrainFuckInterpreter(programCode)
prog.on('output', console.log)
prog.run()
