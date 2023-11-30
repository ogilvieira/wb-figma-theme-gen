import transformPaintedStyles from "./lib/transformPaintedStyles";

figma.showUI(__html__, { themeColors: true });

figma.ui.onmessage = (msg) => {
  if( msg === 'GET_STYLE') {
    const paintedStyles = transformPaintedStyles(figma.getLocalPaintStyles());  
    figma.ui.postMessage({ type: "GET_STYLE", data:paintedStyles });
    return;
  }
};