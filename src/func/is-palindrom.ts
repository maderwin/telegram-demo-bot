export default function (str: string): string {
    let start = 0;
    let end = str.length - 1;

    while (start < end){
        if (str[start] === ' '){
            start++;
            continue;
        }
        if (str[end] === ' '){
            end--;
            continue;
        }
        if (str[start].toLowerCase() !== str[end].toLowerCase()){
            return 'Не палиндром';
        }
        start++;
        end--;
    }
    return 'Палиндром';
}
