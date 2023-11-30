export function normalizePropName( str:string ) : string {
    let newKey = str
    .replace(/\s(.)/g, (_, c) => c.toUpperCase())
    .replace(/\s/g, '');
    
    if (str[0] === ' ') {
    newKey = ' ' + newKey;
    }

    newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
    return newKey;
}