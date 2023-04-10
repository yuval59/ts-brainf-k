import { BrainFuckInterpreter } from '../interpreter/brainfuck'

const programCode = `Calculate the value 256 and test if it's zero
If the interpreter errors on overflow this is where it'll happen
++++++++[>++++++++<-]>[<++++>-]
+<[>-<
    Not zero so multiply by 256 again to get 65536
    [>++++<-]>[<++++++++>-]<[>++++++++<-]
    +>[>
        # Print "32"
        ++++++++++[>+++++<-]>+.-.[-]<
    <[-]<->] <[>>
        # Print "16"
        +++++++[>+++++++<-]>.+++++.[-]<
<<-]] >[>
    # Print "8"
    ++++++++[>+++++++<-]>.[-]<
<-]<
# Print " bit cells\n"
+++++++++++[>+++>+++++++++>+++++++++>+<<<<-]>-.>-.+++++++.+++++++++++.<.
>>.++.+++++++..<-.>>-
Clean up used cells.
[[-]<]`

const prog = new BrainFuckInterpreter(programCode)
prog.on('complete', console.log)
prog.run()
