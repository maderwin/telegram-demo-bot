export default (str: string): string =>
    str.replace(/(\w)(\d*)/g, (_, currChar, count) =>
        currChar.repeat(count || 1));
