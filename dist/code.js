/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const transformPaintedStyles_1 = __importDefault(__webpack_require__(/*! ./lib/transformPaintedStyles */ "./src/lib/transformPaintedStyles.ts"));
figma.showUI(__html__, { themeColors: true });
figma.ui.onmessage = (msg) => {
    if (msg === 'GET_STYLE') {
        const paintedStyles = (0, transformPaintedStyles_1.default)(figma.getLocalPaintStyles());
        figma.ui.postMessage({ type: "GET_STYLE", data: paintedStyles });
        return;
    }
};


/***/ }),

/***/ "./src/lib/transformPaintedStyles.ts":
/*!*******************************************!*\
  !*** ./src/lib/transformPaintedStyles.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const colors_1 = __webpack_require__(/*! ../utils/colors */ "./src/utils/colors.ts");
const text_1 = __webpack_require__(/*! ../utils/text */ "./src/utils/text.ts");
function transformPaintedStyles(paintedStyles) {
    const obj = {};
    for (const index in paintedStyles) {
        const paintedStyle = paintedStyles[index].paints[0];
        const paintedStylePath = paintedStyles[index].name.split("/").map(a => (0, text_1.normalizePropName)(a));
        const styleColors = [];
        let currentLevel = obj;
        for (let i = 0; i < paintedStylePath.length - 1; i++) {
            const styleNamePart = paintedStylePath[i];
            if (!currentLevel[styleNamePart]) {
                currentLevel[styleNamePart] = {};
            }
            currentLevel = currentLevel[styleNamePart];
        }
        const styleName = paintedStylePath[paintedStylePath.length - 1].replace('--', '');
        switch (paintedStyle.type) {
            case "GRADIENT_LINEAR":
            case "GRADIENT_RADIAL":
                paintedStyle.gradientStops.forEach(stop => {
                    const arrColors = Object.values(stop.color);
                    styleColors.push((0, colors_1.convertFigmaColorToRGBColor)(arrColors));
                });
                break;
            case "SOLID":
                const arrColors = Object.values(paintedStyle.color);
                if (paintedStyle.opacity !== 1) {
                    arrColors.push(paintedStyle.opacity);
                }
                styleColors.push((0, colors_1.convertFigmaColorToHEXColor)(arrColors));
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
exports["default"] = transformPaintedStyles;


/***/ }),

/***/ "./src/utils/colors.ts":
/*!*****************************!*\
  !*** ./src/utils/colors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertFigmaColorToRGBColor = exports.convertFigmaColorToHEXColor = void 0;
function convertFigmaColorToHEXColor(colorsArrRGBA) {
    if (colorsArrRGBA.length > 4 || colorsArrRGBA.length < 3) {
        throw "Array de cores precisa ter de 3 a 4 valores.";
    }
    ;
    const colors = colorsArrRGBA.slice(0, 4).map((a) => {
        const num = Math.round(a * 255).toString(16).toUpperCase();
        return num.padStart(2, '0');
    });
    return '#' + colors.join('');
}
exports.convertFigmaColorToHEXColor = convertFigmaColorToHEXColor;
function convertFigmaColorToRGBColor(colorsArrRGBA) {
    if (colorsArrRGBA.length > 4 || colorsArrRGBA.length < 3) {
        throw "Array de cores precisa ter de 3 a 4 valores.";
    }
    ;
    const colors = [];
    colorsArrRGBA.forEach((val, index) => {
        if (index < 3) {
            colors.push(Math.round(val * 255));
        }
        else {
            colors.push(val);
        }
    });
    return `${'rgba'.slice(0, colorsArrRGBA.length)}(${colors.join(',')})`;
}
exports.convertFigmaColorToRGBColor = convertFigmaColorToRGBColor;


/***/ }),

/***/ "./src/utils/text.ts":
/*!***************************!*\
  !*** ./src/utils/text.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.normalizePropName = void 0;
function normalizePropName(str) {
    let newKey = str
        .replace(/\s(.)/g, (_, c) => c.toUpperCase())
        .replace(/\s/g, '');
    if (str[0] === ' ') {
        newKey = ' ' + newKey;
    }
    newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
    return newKey;
}
exports.normalizePropName = normalizePropName;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/code.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpREFBaUQsbUJBQU8sQ0FBQyx5RUFBOEI7QUFDdkYseUJBQXlCLG1CQUFtQjtBQUM1QztBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isd0NBQXdDO0FBQ3ZFO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNiYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUIsbUJBQU8sQ0FBQyw4Q0FBaUI7QUFDMUMsZUFBZSxtQkFBTyxDQUFDLDBDQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlDQUFpQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RkFBNEYsZ0JBQWdCLE1BQU0sZ0JBQWdCO0FBQ2xJO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDM0NGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1DQUFtQyxHQUFHLG1DQUFtQztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsY0FBYyxzQ0FBc0MsR0FBRyxpQkFBaUI7QUFDeEU7QUFDQSxtQ0FBbUM7Ozs7Ozs7Ozs7O0FDL0J0QjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7Ozs7Ozs7VUNiekI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYmV0LXRoZW1lLWZpbGUtZ2VuZXJhdG9yLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vd2ViZXQtdGhlbWUtZmlsZS1nZW5lcmF0b3IvLi9zcmMvbGliL3RyYW5zZm9ybVBhaW50ZWRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vd2ViZXQtdGhlbWUtZmlsZS1nZW5lcmF0b3IvLi9zcmMvdXRpbHMvY29sb3JzLnRzIiwid2VicGFjazovL3dlYmV0LXRoZW1lLWZpbGUtZ2VuZXJhdG9yLy4vc3JjL3V0aWxzL3RleHQudHMiLCJ3ZWJwYWNrOi8vd2ViZXQtdGhlbWUtZmlsZS1nZW5lcmF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViZXQtdGhlbWUtZmlsZS1nZW5lcmF0b3Ivd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJldC10aGVtZS1maWxlLWdlbmVyYXRvci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2ViZXQtdGhlbWUtZmlsZS1nZW5lcmF0b3Ivd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdHJhbnNmb3JtUGFpbnRlZFN0eWxlc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi90cmFuc2Zvcm1QYWludGVkU3R5bGVzXCIpKTtcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB0aGVtZUNvbG9yczogdHJ1ZSB9KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBpZiAobXNnID09PSAnR0VUX1NUWUxFJykge1xuICAgICAgICBjb25zdCBwYWludGVkU3R5bGVzID0gKDAsIHRyYW5zZm9ybVBhaW50ZWRTdHlsZXNfMS5kZWZhdWx0KShmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCkpO1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiR0VUX1NUWUxFXCIsIGRhdGE6IHBhaW50ZWRTdHlsZXMgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2xvcnNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9jb2xvcnNcIik7XG5jb25zdCB0ZXh0XzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdGV4dFwiKTtcbmZ1bmN0aW9uIHRyYW5zZm9ybVBhaW50ZWRTdHlsZXMocGFpbnRlZFN0eWxlcykge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgIGZvciAoY29uc3QgaW5kZXggaW4gcGFpbnRlZFN0eWxlcykge1xuICAgICAgICBjb25zdCBwYWludGVkU3R5bGUgPSBwYWludGVkU3R5bGVzW2luZGV4XS5wYWludHNbMF07XG4gICAgICAgIGNvbnN0IHBhaW50ZWRTdHlsZVBhdGggPSBwYWludGVkU3R5bGVzW2luZGV4XS5uYW1lLnNwbGl0KFwiL1wiKS5tYXAoYSA9PiAoMCwgdGV4dF8xLm5vcm1hbGl6ZVByb3BOYW1lKShhKSk7XG4gICAgICAgIGNvbnN0IHN0eWxlQ29sb3JzID0gW107XG4gICAgICAgIGxldCBjdXJyZW50TGV2ZWwgPSBvYmo7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFpbnRlZFN0eWxlUGF0aC5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlTmFtZVBhcnQgPSBwYWludGVkU3R5bGVQYXRoW2ldO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50TGV2ZWxbc3R5bGVOYW1lUGFydF0pIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TGV2ZWxbc3R5bGVOYW1lUGFydF0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRMZXZlbCA9IGN1cnJlbnRMZXZlbFtzdHlsZU5hbWVQYXJ0XTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdHlsZU5hbWUgPSBwYWludGVkU3R5bGVQYXRoW3BhaW50ZWRTdHlsZVBhdGgubGVuZ3RoIC0gMV0ucmVwbGFjZSgnLS0nLCAnJyk7XG4gICAgICAgIHN3aXRjaCAocGFpbnRlZFN0eWxlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJHUkFESUVOVF9MSU5FQVJcIjpcbiAgICAgICAgICAgIGNhc2UgXCJHUkFESUVOVF9SQURJQUxcIjpcbiAgICAgICAgICAgICAgICBwYWludGVkU3R5bGUuZ3JhZGllbnRTdG9wcy5mb3JFYWNoKHN0b3AgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb2xvcnMgPSBPYmplY3QudmFsdWVzKHN0b3AuY29sb3IpO1xuICAgICAgICAgICAgICAgICAgICBzdHlsZUNvbG9ycy5wdXNoKCgwLCBjb2xvcnNfMS5jb252ZXJ0RmlnbWFDb2xvclRvUkdCQ29sb3IpKGFyckNvbG9ycykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlNPTElEXCI6XG4gICAgICAgICAgICAgICAgY29uc3QgYXJyQ29sb3JzID0gT2JqZWN0LnZhbHVlcyhwYWludGVkU3R5bGUuY29sb3IpO1xuICAgICAgICAgICAgICAgIGlmIChwYWludGVkU3R5bGUub3BhY2l0eSAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhcnJDb2xvcnMucHVzaChwYWludGVkU3R5bGUub3BhY2l0eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0eWxlQ29sb3JzLnB1c2goKDAsIGNvbG9yc18xLmNvbnZlcnRGaWdtYUNvbG9yVG9IRVhDb2xvcikoYXJyQ29sb3JzKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudExldmVsW3N0eWxlTmFtZV0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRMZXZlbFtzdHlsZU5hbWVdID0gc3R5bGVDb2xvcnMubGVuZ3RoICE9PSAxID8gYGxpbmVhci1ncmFkaWVudCgyNzBkZWcsICR7c3R5bGVDb2xvcnNbMF19IDAlLCAke3N0eWxlQ29sb3JzWzFdfSAxMDAlKWAgOiBzdHlsZUNvbG9yc1swXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gdHJhbnNmb3JtUGFpbnRlZFN0eWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb252ZXJ0RmlnbWFDb2xvclRvUkdCQ29sb3IgPSBleHBvcnRzLmNvbnZlcnRGaWdtYUNvbG9yVG9IRVhDb2xvciA9IHZvaWQgMDtcbmZ1bmN0aW9uIGNvbnZlcnRGaWdtYUNvbG9yVG9IRVhDb2xvcihjb2xvcnNBcnJSR0JBKSB7XG4gICAgaWYgKGNvbG9yc0FyclJHQkEubGVuZ3RoID4gNCB8fCBjb2xvcnNBcnJSR0JBLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgdGhyb3cgXCJBcnJheSBkZSBjb3JlcyBwcmVjaXNhIHRlciBkZSAzIGEgNCB2YWxvcmVzLlwiO1xuICAgIH1cbiAgICA7XG4gICAgY29uc3QgY29sb3JzID0gY29sb3JzQXJyUkdCQS5zbGljZSgwLCA0KS5tYXAoKGEpID0+IHtcbiAgICAgICAgY29uc3QgbnVtID0gTWF0aC5yb3VuZChhICogMjU1KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIG51bS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIH0pO1xuICAgIHJldHVybiAnIycgKyBjb2xvcnMuam9pbignJyk7XG59XG5leHBvcnRzLmNvbnZlcnRGaWdtYUNvbG9yVG9IRVhDb2xvciA9IGNvbnZlcnRGaWdtYUNvbG9yVG9IRVhDb2xvcjtcbmZ1bmN0aW9uIGNvbnZlcnRGaWdtYUNvbG9yVG9SR0JDb2xvcihjb2xvcnNBcnJSR0JBKSB7XG4gICAgaWYgKGNvbG9yc0FyclJHQkEubGVuZ3RoID4gNCB8fCBjb2xvcnNBcnJSR0JBLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgdGhyb3cgXCJBcnJheSBkZSBjb3JlcyBwcmVjaXNhIHRlciBkZSAzIGEgNCB2YWxvcmVzLlwiO1xuICAgIH1cbiAgICA7XG4gICAgY29uc3QgY29sb3JzID0gW107XG4gICAgY29sb3JzQXJyUkdCQS5mb3JFYWNoKCh2YWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA8IDMpIHtcbiAgICAgICAgICAgIGNvbG9ycy5wdXNoKE1hdGgucm91bmQodmFsICogMjU1KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb2xvcnMucHVzaCh2YWwpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGAkeydyZ2JhJy5zbGljZSgwLCBjb2xvcnNBcnJSR0JBLmxlbmd0aCl9KCR7Y29sb3JzLmpvaW4oJywnKX0pYDtcbn1cbmV4cG9ydHMuY29udmVydEZpZ21hQ29sb3JUb1JHQkNvbG9yID0gY29udmVydEZpZ21hQ29sb3JUb1JHQkNvbG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm5vcm1hbGl6ZVByb3BOYW1lID0gdm9pZCAwO1xuZnVuY3Rpb24gbm9ybWFsaXplUHJvcE5hbWUoc3RyKSB7XG4gICAgbGV0IG5ld0tleSA9IHN0clxuICAgICAgICAucmVwbGFjZSgvXFxzKC4pL2csIChfLCBjKSA9PiBjLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgIC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIGlmIChzdHJbMF0gPT09ICcgJykge1xuICAgICAgICBuZXdLZXkgPSAnICcgKyBuZXdLZXk7XG4gICAgfVxuICAgIG5ld0tleSA9IG5ld0tleS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIG5ld0tleS5zbGljZSgxKTtcbiAgICByZXR1cm4gbmV3S2V5O1xufVxuZXhwb3J0cy5ub3JtYWxpemVQcm9wTmFtZSA9IG5vcm1hbGl6ZVByb3BOYW1lO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvZGUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=