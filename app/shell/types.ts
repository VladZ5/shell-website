export type FileSystem = {
    [key: string]: FileSystem | string;
}

export type TerminalState = {
    fileSystem: FileSystem,
    currDirPath: string[],
}

export type CommandResult = {
    output: string,
    newState: TerminalState,
}

export type CommandFunction = (
    state: TerminalState,
    args: string[],
 ) => CommandResult;