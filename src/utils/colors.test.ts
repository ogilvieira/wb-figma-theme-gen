import { expect, test } from '@jest/globals';
import { convertFigmaColorToHEXColor, convertFigmaColorToRGBColor } from './colors';



test('Converter cor figma para cor HEX com e sem opacidade', () => {
    expect(convertFigmaColorToHEXColor([0,0,0])).toBe("#000000");
    expect(convertFigmaColorToHEXColor([1,1,1])).toBe("#FFFFFF");
    expect(convertFigmaColorToHEXColor([1, 0.4745098039215686, 0.7764705882352941])).toBe("#FF79C6");
    expect(convertFigmaColorToHEXColor([1, 0.4745098039215686, 0.7764705882352941,1])).toBe("#FF79C6FF");
    expect(convertFigmaColorToHEXColor([1, 0.4745098039215686, 0.7764705882352941,0])).toBe("#FF79C600");
    expect(convertFigmaColorToHEXColor([1, 0.4745098039215686, 0.7764705882352941,.5])).toBe("#FF79C680");
});


test('Converter cor figma para cor RGB com e sem opacidade', () => {
    expect(convertFigmaColorToRGBColor([0,0,0])).toBe("rgb(0,0,0)");
    expect(convertFigmaColorToRGBColor([1,1,1])).toBe("rgb(255,255,255)");
    expect(convertFigmaColorToRGBColor([1, 0.4745098039215686, 0.7764705882352941])).toBe("rgb(255,121,198)");
    expect(convertFigmaColorToRGBColor([1, 0.4745098039215686, 0.7764705882352941,1])).toBe("rgba(255,121,198,1)");
    expect(convertFigmaColorToRGBColor([1, 0.4745098039215686, 0.7764705882352941,0])).toBe("rgba(255,121,198,0)");
    expect(convertFigmaColorToRGBColor([1, 0.4745098039215686, 0.7764705882352941,.5])).toBe("rgba(255,121,198,0.5)");
});
  