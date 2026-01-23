"use client"

import { useState, useRef, useEffect } from "react";
import { CommandHandler } from "./CommandHandler";
import { TerminalState } from "../types";
import { initialFileSystem } from "../initialFileSystem";

type HistoryEntry = {
  command: string;
  output: string;
  path: string;
};

export default function Terminal() {
    // Display
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Text editor
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingFile, setEditingFile] = useState("");
    const [editorContent, setEditorContent] = useState("");

    const [terminalState, setTerminalState] = useState<TerminalState>({
        fileSystem: initialFileSystem,
        currDirPath: ['Home'],
        userCreatedItems: [],
    });

    function parseFilePath(path: string) {
        const parts = path.split('/').filter(p => p !== '');
        return {
            dirPath: parts.slice(0, -1),
            filename: parts[parts.length - 1]
        };
    }

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

            if (result.output.startsWith("[OPEN_EDITOR]")) {
                event.preventDefault();
                const filePath = result.output.replace("[OPEN_EDITOR]", "");

                if (!terminalState.userCreatedItems.includes(filePath)) {
                    setHistory(prev => [...prev, {
                        command: input,
                        output: "Permission denied: You can only edit files you created",
                        path: "~/" + terminalState.currDirPath.join('/')
                    }]);
                    setInput("");
                    return;
                }

                const {filename} = parseFilePath(filePath);

                let current: any = terminalState.fileSystem;
                for (const dir of terminalState.currDirPath) {
                    current = current[dir];
                }

                const content = current[filename];

                setIsEditorOpen(true);
                setEditingFile(filePath);
                setEditorContent(content);

                setHistory(prev => [...prev, {command: input, output: "", path: terminalState.currDirPath.join('/')}]);
                setInput("");
            } else {
                setTerminalState(result?.newState);
                setHistory(prev => [...prev, { command: input, output: result?.output, path: terminalState.currDirPath.join('/')}]);
                setInput("");
            }
        }
    };

    const handleSave = () => {
        const {dirPath, filename} = parseFilePath(editingFile);

        const newFileSystem = JSON.parse(JSON.stringify(terminalState.fileSystem));
        let current = newFileSystem;

        for (const dir of dirPath) {
            current = current[dir];
        }

        current[filename] = editorContent;

        setTerminalState({...terminalState, fileSystem: newFileSystem})

        setIsEditorOpen(false);
        setEditingFile("");
        setEditorContent("");
    }

    const handleCancel = () => {
        setIsEditorOpen(false);
        setEditingFile("");
        setEditorContent("");
    }

    return(
        <div className="justify-self-center self-center bg-black w-5/6 h-7/8 rounded-lg p-4">
            <div className="text-green-400 font-mono">
                Hello
            </div>
            
            {/* Render history */}
            {history.map((entry, index) => (
                <div key={index} className="text-green-400 font-mono">
                    <div>vsh {entry.path} &gt; {entry.command}</div>
                    <div>{entry.output}</div>
                </div>
            ))}

            {/* Input line */}
            <div className="flex gap-2">
                <span className="text-green-400 font-mono">vsh ~/{terminalState.currDirPath.join('/')} &gt;  </span>
                <input 
                    className="bg-transparent outline-none border-none text-green-400 flex-1 font-mono caret-transparent" 
                    value={input} 
                    onChange={event => setInput(event.target.value)} 
                    onKeyDown={handleKeyDown}
                    autoFocus
                    ref={inputRef}
                />
            </div>

            {isEditorOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg p-6 w-3/4 h-3/4 flex flex-col">
                        <div className="text-green-400 font-mono mb-4">
                            Editing: {editingFile}
                        </div>

                        <textarea 
                            className="flex-1 bg-black text-green-400 font-mono p-4 rounded border border-green-400 outline-none resize-none"
                            value={editorContent}
                            onChange={(e) => setEditorContent(e.target.value)}
                            autoFocus
                        />

                        <div className="flex gap-4 mt-4">
                            <button 
                                className="bg-green-600 text-black px-6 py-2 rounded font-mono hover:bg-green-500"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button 
                                className="bg-gray-700 text-white px-6 py-2 rounded font-mono hover:bg-gray-600"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}