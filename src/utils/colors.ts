export function convertFigmaColorToHEXColor(colorsArrRGBA: number[]) {
    if( colorsArrRGBA.length > 4 || colorsArrRGBA.length < 3) {
        throw "Array de cores precisa ter de 3 a 4 valores."
    };
    const colors = colorsArrRGBA.slice(0, 4).map((a:number) => {
        const num = Math.round( a * 255 ).toString(16).toUpperCase();
        return num.padStart(2, '0');
    });

    return '#' + colors.join('');
}

export function convertFigmaColorToRGBColor(colorsArrRGBA: number[]) {
    if( colorsArrRGBA.length > 4 || colorsArrRGBA.length < 3) {
        throw "Array de cores precisa ter de 3 a 4 valores."
    };

    const colors = [];


    colorsArrRGBA.forEach((val, index) => {
        if( index < 3 ) {
            colors.push(Math.round( val * 255 ));
        } else {
            colors.push(val);
        }
    })

    return `${'rgba'.slice(0, colorsArrRGBA.length)}(${colors.join(',')})`;
}