export default function (str: string): string {
    const length = str.length;
    let newStr = '';
    for (let i = 0; i < length; i++){
        if (i < length - 1 && Number(str[i + 1]) >= 0){
            let index = 1;
            let countNum = Number(str[i + 1]);
            while (i + index < length - 1 && Number(str[i + 1 + index]) >= 0){
                countNum = countNum * 10 + Number(str[i + 1 + index]);
                index++;
            }
            newStr += str[i].repeat(countNum);
            i += index;
        } else {
            newStr += str[i];
        }
    }
    return newStr;
}
