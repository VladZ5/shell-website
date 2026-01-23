import { TerminalState } from "../../types";

export const edit = (currState: TerminalState, args: string[]) => {
    if (args.length != 1) {
        return {
            output: "Please only enter the command and the file path to be edited",
            newState: currState
        }
    }

    const filename = args[0];

    let current: any = currState.fileSystem;

    for (const dir of currState.currDirPath) {
        current = current[dir];
    }

    if (typeof current[filename] !== 'string') {
       return { 
            output: `${filename} is not a file`, 
            newState: currState 
        };
   }

    if (!Object.keys(current).includes(filename)) {
        return {
            output: "Please create the file (using the command touch) or select an existing one",
            newState: currState
        }
    } else {
        const fullFilePath = '/' + currState.currDirPath.join('/') + '/' + filename;
        return {
            output: "[OPEN_EDITOR]" + fullFilePath,
            newState: currState
        }
    }
}