import { CommandResult, TerminalState } from "../types";
import { argParsing } from "../argParsing";

import { pwd } from "./commands/pwd";
import { mkdir } from "./commands/mkdir";
import { ls } from "./commands/ls";
import { cd } from "./commands/cd";
import { touch } from "./commands/touch";

export const CommandHandler = (latestInput: string, state: TerminalState): CommandResult => {
    const {command, args} = argParsing(latestInput);
    switch (command) {
        case 'help':
            return {
                output: `Available commands:
  cat        - Display file contents
  cd         - Change directory
  clear      - Clear the terminal
  contact    - Get my contact information
  education  - See my educational background
  experience - View my work experience
  github     - View my GitHub profile
  linkedin   - View my LinkedIn profile
  ls         - List directory contents
  mkdir      - Create a new directory
  projects   - View my projects
  pwd        - Print working directory
  resume     - Download my resume
  rm         - Remove files or directories
  skills     - See my technical skills
  touch      - Create a new file
  whoareyou  - Learn about me`,
                newState: state
            };

        case 'cat':
            return { output: "cat: command not yet implemented", newState: state };

        case 'cd':
            return cd(state, args);

        case 'clear':
            return { output: "", newState: state }; // Special case - Terminal will handle clearing

        case 'contact':
            return { output: "contact: command not yet implemented", newState: state };

        case 'education':
            return { output: "education: command not yet implemented", newState: state };

        case 'experience':
            return { output: "experience: command not yet implemented", newState: state };

        case 'github':
            return { output: "github: command not yet implemented", newState: state };

        case 'linkedin':
            return { output: "linkedin: command not yet implemented", newState: state };

        case 'ls':
            return ls(state, args);

        case 'mkdir':
            return mkdir(state, args);

        case 'projects':
            return { output: "projects: command not yet implemented", newState: state };

        case 'pwd':
            return pwd(state, args);

        case 'resume':
            return { output: "resume: command not yet implemented", newState: state };

        case 'rm':
            return { output: "rm: command not yet implemented", newState: state };

        case 'skills':
            return { output: "skills: command not yet implemented", newState: state };

        case 'touch':
            return touch(state, args);

        case 'whoareyou':
            return { output: "whoareyou: command not yet implemented", newState: state };
    
        default:
            return {
                output: `Command not found: ${command}\nType 'help' for available commands.`,
                newState: state
            };
    }
};