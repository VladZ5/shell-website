export const argParsing = (latestInput: string) => {
    const parsedArgs = latestInput.split(" ");

    const command = parsedArgs[0];
    const args = parsedArgs.slice(1);

    return {command, args};
}