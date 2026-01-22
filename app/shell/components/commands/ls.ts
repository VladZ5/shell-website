import { TerminalState } from "../../types"

export const ls = (currState: TerminalState, args: string[])  => {
    let current: any = currState.fileSystem;

    for (const dir of currState.currDirPath) {
        current = current[dir];
    }

    const keys = Object.keys(current);

    return {
        output: keys.join(' '),
        newState: currState
    }
}