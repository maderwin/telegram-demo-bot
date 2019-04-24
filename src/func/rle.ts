export function encode (str: string): string {
    const length = str.length;
    let newStr = '';
    let countChar = 1;
    for (let i = 0; i < length; i++){
        if (i !== length - 1 && str[i] === str[i + 1]){
            countChar++;
        } else if (countChar > 1){
            newStr += str[i] + countChar;
            countChar = 1;
        }else {
            newStr += str[i];
        }
    }
    return newStr;
}

export function decode (str: string): string {
    return str.replace(/(\w)(\d*)/g, (_, currChar, count) =>
        currChar.repeat(count || 1));
}
