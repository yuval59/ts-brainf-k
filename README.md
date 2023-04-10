# ts-brainf-k

This is an implementation of the famous esoteric programming language, Brainfuck.
This is meant as a fun project and not as an actual "good" implementation, and as such I will be focusing on "proper" best practices and readability.

Supports all [brainfuck commands](https://en.wikipedia.org/wiki/Brainfuck) (but might not support edge cases):

- `>` to increase the data pointer
- `<` to decrease the data pointer
- `+` to increment the byte at the data pointer
- `-` to increment the byte at the data pointer
- `.` to output the byte at the data pointer
- `,` to store a byte at the data pointer
- `[` & `]` to loop around a block of code, until the byte at the data pointer is 0

  Or more specifically:

- `[` Jump past the matching `]` if the byte at the data pointer is 0
- `]` Jump back to the matching `[` if the cell at the data pointer is nonzero
