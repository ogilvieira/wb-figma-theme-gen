import { convertFigmaColorToHEXColor, convertFigmaColorToRGBColor } from '../utils/colors';
import { normalizePropName } from '../utils/text';


const getValueFromMode = (valuesByMode, selectedMode, variables) => {
    const res = valuesByMode[selectedMode];
    if(!res) { return; }

    if( res.type && res.type === 'VARIABLE_ALIAS' ) {
        const variableEl = variables.find(a => a.id === res.id);
        return getValueFromMode(variableEl.valuesByMode, selectedMode, variables)
    }
    return res;
}

export default function transformVariable(variables: Variable[], selectedMode: String) {

    const obj: {[key: string]: any} = {};

    for(const variable of variables) {

        const stylePath:string[] = variable.name.split("/").map(a => normalizePropName(a));
        let currentLevel = obj;

        for (let i = 0; i < stylePath.length - 1; i++) {
            const styleNamePart = stylePath[i];           
            if (!currentLevel[styleNamePart]) {
              currentLevel[styleNamePart] = {}; 
            }
            currentLevel = currentLevel[styleNamePart];
        }

        const styleName = stylePath[stylePath.length - 1].replace('--', '');
        const styleColors = [];

        const variableValue = getValueFromMode(variable.valuesByMode, selectedMode, variables);


        switch(variable.resolvedType) {
            // case "GRADIENT_LINEAR":
            // case "GRADIENT_RADIAL":
            //     paintedStyle.gradientStops.forEach(stop => {        
            //         const arrColors = Object.values(stop.color);
            //         styleColors.push(convertFigmaColorToRGBColor(arrColors));
            //     });
            // break;
            case "COLOR":
                const arrColors: number[] = Object.values(variableValue);
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