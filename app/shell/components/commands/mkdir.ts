import { TerminalState } from "../../types"

export const mkdir = (currState: TerminalState, args: string[]) => {
   if (args.length === 0) {
    return {output: "Please enter a directory name", newState: currState};
   } 
   
   if (args.length > 1) {
    return {output: "Please enter a single word for the directory name", newState: currState};
   }

   const name = args[0];
   
   if (!(name[0] >= 'A' && name[0] <= 'Z')) {
       return {output: "All directory names must start with a capital letter", newState: currState}
   }

   // Create deep copy of filesystem
   const newFileSystem = JSON.parse(JSON.stringify(currState.fileSystem));
   
   let current = newFileSystem;
   
   for (const dir of currState.currDirPath) {
       current = current[dir];  
   }

   if (current[name]) {
       return {output: `mkdir: ${name} already exists`, newState: currState};
   }
   

   current[name] = {};
   
   return {
       output: "",
       newState: {
           ...currState,              
           fileSystem: newFileSystem   
       }
   };
}