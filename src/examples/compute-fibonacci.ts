import { BrainFuckInterpreter } from '../interpreter/brainfuck'

const programCode = `
This is my first experience writing an actual proper BrainFuck program; Be gentle

++++++++++ Make first cell newLine for printing
>+>+<< Set starting conditions 
>> Move to C

A = 10 (newline)
B = 1
C = 1
K = 1

Cell reference
|A|B|C|D|E|F|
[
    Starting at C
    [
        Copy C to D
        - Decrease C
        >+ Increase D
        < Go back to C
    ]
    
    > Move to D
    
    [
        Copy D to C and B
        - Decrease D
        <+ Increase C
        <+ Increase B
        >> Go back to D
    ]
    
    Print B
        << Move to B
        >>[-] Set D to 0
        >[-]+>[-]+< Set E and F to one to start loop
        [ Loop on 'E'
            >[-<- On the first loop
                <<<[->>+>+<<<] Copy B into D and E
                >>[-<<+>>] Restore B from D
                >> Go to D
            ]
            ++++++++++>[-]+>[-]>[-]>[-]<<<<< Init for the division by 10
            [->-[>+>>]>[[-<+>]+>+>>]<<<<<] Full division
            >>-[-<<+>>] Store remainder into E
            <[-]++++++++[-<++++++>]  Make it an ASCII digit; clear F
            >>[-<<+>>] Move quotient into F
            << Shuffle; new E is where F was and old E is a digit
        ] End loop when E is zero
        <[.[-]<] Move to where D should be and output the digits till we find D
        << Back to B
    <.> Newline
    
    [
        Copy B to C and D
        - Decrease B
        >+ Increase C
        >+ Increase D
        << Go back to B
    ]
    
    Move to D
    >>
    
    [
        Move D to B
        - Decrease D
        <<+ Increase B
        >> Go back to D
    ]
    
    Print C
        < Go to C
        >[-] Set D to 0
        >[-]+>[-]+< Set E and F to one to start loop
        [ Loop on 'E'
            >[-<- On the first loop
                <<[->+>+<<]  Copy C into E (and D)
                >[-<+>] Restore C from D
                >> Go to D
            ]
            ++++++++++>[-]+>[-]>[-]>[-]<<<<< Init for the division by 10
            [->-[>+>>]>[[-<+>]+>+>>]<<<<<] Full division
            >>-[-<<+>>] Store remainder into E
            <[-]++++++++[-<++++++>]  Make it an ASCII digit; clear F
            >>[-<<+>>] Move quotient into F
            << Shuffle; new E is where F was and old E is a digit
        ] End loop when E is zero
        <[.[-]<] Move to where D should be and output the digits till we find D
        < Back to C
    <<.>> Newline
]
`

const prog = new BrainFuckInterpreter(programCode)
prog.on('newLine', console.log)
prog.run()
