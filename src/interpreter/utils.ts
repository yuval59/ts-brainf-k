const recognizedCommands = [',', '.', '-', '+', '<', '>', '[', ']']

export const sterilizeProgram = (program: string): string =>
  program
    .split('')
    .filter((char) => recognizedCommands.includes(char))
    .join('')
