import { TerminalState } from "../../types";

export const pwd = (currState: TerminalState, args: string[]) => {
    const currPath: string[] = currState.currDirPath;
    var formattedPath = "";

    for (const level of currPath) {
        formattedPath += '/';
        formattedPath += level;
    }

    return {
        output: formattedPath, 
        newState: currState
    };
}