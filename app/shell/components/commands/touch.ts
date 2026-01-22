import { TerminalState } from "../../types";

export const touch = (currState: TerminalState, args: string[]) => {
    const filename = args[0];
    if (!filename) {
        return {
            output: "Please provide a filename",
            newState: currState
        }
    }

    if (!(filename[0] >= 'a' && filename[0] <= 'z')) {
        return {
            output: "All file names must start with a lower case letter",
            newState: currState
        }
    }

    const newFileSystem = JSON.parse(JSON.stringify(currState.fileSystem));
    let current = newFileSystem

    for (const dir of currState.currDirPath) {
        current = current[dir];
    }

    if (Object.keys(current).includes(filename)) {
        return {
            output: `touch: ${filename} already exists`,
            newState: currState
        }
    }

    current[filename] = "";

    return {
        output: "",
        newState: {
            ...currState,
            fileSystem: newFileSystem
        }
    }
}