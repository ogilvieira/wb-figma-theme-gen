"use strict";
// This plugin will open a tab that indicates that it will monitor the current
// selection on the page. It cannot change the document itself.
// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { themeColors: true });
figma.on('run', () => {
    const styless = getPaintStyles();
    const formatted = transformKeys(styless);
    const result = JSON.stringify(formatted, null, 2);
    figma.ui.postMessage(result);
});
// Função para converter cor RGB para hexadecimal
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) | ((r & 255) << 16) | ((g & 255) << 8) | (b & 255)).toString(16).slice(1);
}
// function toCamelCase(obj: {[key: string]: any}): Object {
//   const newObj: {[key: string]: any} = {};
//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       const value = obj[key];
//       // Remove os hífens e converte as chaves com espaço para camelCase
//       const newKey = key
//         .replace(/--/g, '')
//         .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
//           return index === 0 ? word.toLowerCase() : word.toUpperCase();
//         })
//         .replace(/\s+/g, '');
//       // Remove aspas simples ou duplas da chave, se ela for composta apenas por letras e números
//       newObj[newKey] = typeof value === 'object' && !Array.isArray(value)
//         ? toCamelCase(value)
//         : value;
//     }
//   }
//   return newObj;
// }
// Função para obter os estilos de cores do Figma
function transformKeys(obj) {
    const newObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            let newKey = key
                .replace(/\s(.)/g, (_, c) => c.toUpperCase())
                .replace(/\s/g, '');
            if (key[0] === ' ') {
                newKey = ' ' + newKey;
            }
            // Transforma a primeira letra em minúscula
            newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
            newObj[newKey] = typeof value === 'object' && !Array.isArray(value)
                ? transformKeys(value)
                : value;
        }
    }
    return newObj;
}
function getPaintStyles() {
    const paintStyles = figma.getLocalPaintStyles();
    const stylesData = {}; // Objeto JSON para armazenar os dados dos estilos de cores
    // Percorre os estilos de cores e obtém as informações relevantes
    paintStyles.forEach(style => {
        let styleColor = ''; // Variável para armazenar o valor hex do estilo de cor
        // Verifica o tipo de pintura e obtém o valor hex correspondente
        if (style.paints[0].type === "SOLID") {
            const { r, g, b } = style.paints[0].color; // Obtém os valores RGB da cor sólida
            styleColor = rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)); // Converte os valores RGB para hexadecimal
        }
        else if (style.paints[0].type === "GRADIENT_LINEAR" || style.paints[0].type === "GRADIENT_RADIAL") {
            console.info(style.paints);
            // Para estilos de cores gradientes, obtém os valores hex dos pontos de cor
            styleColor = style.paints[0].gradientStops.map(stop => {
                const { r, g, b, a } = stop.color; // Obtém os valores RGB do ponto de cor
                return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${a})`; // Converte os valores RGB para hexadecimal
            });
        }
        const styleNameParts = style.name.split("/"); // Divide o nome do estilo de cor em partes com base no caractere "/"
        let currentLevel = stylesData; // Define o nível atual como o objeto raiz
        // Percorre as partes do nome do estilo de cor e cria os níveis correspondentes no objeto JSON
        for (let i = 0; i < styleNameParts.length - 1; i++) {
            const styleNamePart = styleNameParts[i];
            if (!currentLevel[styleNamePart]) {
                currentLevel[styleNamePart] = {}; // Cria um novo objeto vazio para o nível atual, se ainda não existir
            }
            currentLevel = currentLevel[styleNamePart]; // Atualiza o nível atual para o próximo nível
        }
        // Verifica se a chave já existe no último nível do objeto JSON e assume o valor da chave como valor
        const styleName = styleNameParts[styleNameParts.length - 1].replace('--', '');
        if (!currentLevel[styleName]) {
            currentLevel[styleName] = Array.isArray(styleColor) ? `linear-gradient(270deg, ${styleColor[0]} 0%, ${styleColor[1]} 100%)` : styleColor;
        }
    });
    return stylesData;
}
