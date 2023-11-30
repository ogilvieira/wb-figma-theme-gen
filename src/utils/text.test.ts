import { expect, test } from '@jest/globals';
import { normalizePropName } from './text';



test('Normaliza nomes de propriedades', () => {
    expect(normalizePropName("Brand Custom")).toBe("brandCustom");
    expect(normalizePropName("Categories")).toBe("categories");
    expect(normalizePropName("--Brand-Custom")).toBe("--Brand-Custom");
});