"use client"

import { useState, useRef, useEffect } from "react";
import { CommandHandler } from "./CommandHandler";
import { TerminalState } from "../types";
import { initialFileSystem } from "../initialFileSystem";

type HistoryEntry = {
  command: string;
  output: string;
};

export default function Terminal() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const [terminalState, setTerminalState] = useState<TerminalState>({
        fileSystem: initialFileSystem,
        currDirPath: ['Home']
    });

    // Keeps focus in terminal input
    useEffect(() => {
      const handleClick = (): void => {
        inputRef.current?.focus();
      };
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const result = CommandHandler(input, terminalState);
            setTerminalState(result?.newState);
            setHistory(prev => [...prev, { command: input, output: result?.output}]);
            setInput("");
        }
    };

    return(
        <div className="justify-self-center self-center bg-black w-5/6 h-7/8 rounded-lg p-4">
            <div className="text-green-400 font-mono">
                Hello
            </div>
            
            {/* Render history */}
            {history.map((entry, index) => (
                <div key={index} className="text-green-400 font-mono">
                    <div>vsh &gt; {entry.command}</div>
                    <div>{entry.output}</div>
                </div>
            ))}

            {/* Input line */}
            <div className="flex gap-2">
                <span className="text-green-400 font-mono">vsh &gt;  </span>
                <input 
                    className="bg-transparent outline-none border-none text-green-400 flex-1 font-mono caret-transparent" 
                    value={input} 
                    onChange={event => setInput(event.target.value)} 
                    onKeyDown={handleKeyDown}
                    autoFocus
                    ref={inputRef}
                />
            </div>
        </div>
    );
}