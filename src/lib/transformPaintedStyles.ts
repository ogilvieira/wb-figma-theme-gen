import { convertFigmaColorToHEXColor, convertFigmaColorToRGBColor } from '../utils/colors';
import { normalizePropName } from '../utils/text';

export default function transformPaintedStyles(paintedStyles: PaintStyle[]) {

    const obj: {[key: string]: any} = {};

    for(const index in paintedStyles) {
        const paintedStyle = paintedStyles[index].paints[0];
        const paintedStylePath:string[] = paintedStyles[index].name.split("/").map(a => normalizePropName(a));
        const styleColors:string[] = [];
        let currentLevel = obj;

        for (let i = 0; i < paintedStylePath.length - 1; i++) {
            const styleNamePart = paintedStylePath[i];
            
            if (!currentLevel[styleNamePart]) {
              currentLevel[styleNamePart] = {}; 
            }

            currentLevel = currentLevel[styleNamePart];
        }

        const styleName = paintedStylePath[paintedStylePath.length - 1].replace('--', '');

        switch(paintedStyle.type) {
            case "GRADIENT_LINEAR":
            case "GRADIENT_RADIAL":
                paintedStyle.gradientStops.forEach(stop => {        
                    const arrColors = Object.values(stop.color);
                    styleColors.push(convertFigmaColorToRGBColor(arrColors));
                });
            break;
            case "SOLID":
                const arrColors: number[] = Object.values(paintedStyle.color);
                if( paintedStyle.opacity !== 1 ) { arrColors.push(paintedStyle.opacity);}
                styleColors.push(convertFigmaColorToHEXColor(arrColors));
            break;
            default:
                continue;
        }

        if (!currentLevel[styleName]) {
            currentLevel[styleName] = styleColors.length !== 1 ? `linear-gradient(270deg, ${styleColors[0]} 0%, ${styleColors[1]} 100%)` : styleColors[0];
        }
      
    }

    return obj;
}