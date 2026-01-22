import { TerminalState } from "../../types";
import Terminal from "../Terminal";

export const cd = (currState: TerminalState, args: string[]) => {

    // changing to an existing directory
    const directoryName = args[0];

    // going up one level
    if (directoryName === '..') {
        if (currState.currDirPath.length <= 1) {
            return {
                output: "Already at root directory",
                newState: currState
            }
        }

        return {
            output: "",
            newState: {
                ...currState,
                 currDirPath: currState.currDirPath.slice(0, -1)
            }
        }
    }

    // going to the home directory
    if (!directoryName || directoryName === '~') {
        return {
            output: "",
            newState: {
                ...currState,
                currDirPath: ['Home']
            }
        };
    }

    let current: any = currState.fileSystem;

    // handling absolute paths
    if (directoryName[0] === '/') {
        const levels = directoryName.split('/').filter(l => l !== '');
        for (const level of levels) {
            if (!Object.keys(current).includes(level)) {
                return {
                    output: "Invalid path",
                    newState: currState
                }
            }
            if (typeof current[level] !== 'object') {
                return { 
                    output: `${level} is not a directory`, 
                    newState: currState 
                };
            }
            current = current[level];
        }
        return {
            output: "",
            newState: {
                ...currState,
                currDirPath: levels
            }
        }
    }

    for (const dir of currState.currDirPath) {
        current = current[dir];
    }

    if (!(directoryName[0] >= 'A' && directoryName[0] <= 'Z')) {
        return {
            output: "Directory names start with a capital letter",
            newState: currState
        };
    }


    if (!Object.keys(current).includes(directoryName)) {
        return {
            output: "The directory doesn't exist",
            newState: currState
        };
    }

    if (typeof current[directoryName] !== 'object') {
        return {
            output: `${directoryName} is not a directory`,
            newState: currState
        };
    }

    return {
        output: "",
        newState: {
            ...currState,
            currDirPath: [...currState.currDirPath, directoryName]
        }
    };
}