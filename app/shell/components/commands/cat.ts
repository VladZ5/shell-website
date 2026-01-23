import { TerminalState } from "../../types";

export const cat = (currState: TerminalState, args: string[]) => {
    if (args.length != 1) {
        return {
            output: "Please enter a single argument of the file you want to read",
            newState: currState
        }
    }

    const filename = args[0];

    let current: any = currState.fileSystem;
    for (const dir of currState.currDirPath) {
        current = current[dir]
    }

    if(typeof current[filename] !== 'string') {
        return {
            output: `${filename} is not a file`, 
            newState: currState
        }
    }

    if(!Object.keys(current).includes(filename)) {
        return {
            output: "Please create the file (using the command touch) or select an existing one",
            newState: currState
        }
    } else {
        return {
            output: current[filename],
            newState: currState
        }
    }
}