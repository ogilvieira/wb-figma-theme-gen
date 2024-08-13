import transformVariable from "./lib/transformVariable";

figma.showUI(__html__, { themeColors: true, width: 650, height: 500 });

figma.ui.onmessage = async (pluginMessage) => {

  if ( pluginMessage.func === 'GET_DEFAULT_COLLECTION' ) {
    const localCollections = await figma.variables.getLocalVariableCollectionsAsync();
    const themeDefault = localCollections.find(a => a.name === "Tema Default");

    if( themeDefault ) {
      const obj = {
        collectionId: themeDefault.id,
        modes: themeDefault.modes,
        defaultModeId: themeDefault.defaultModeId
      }
      figma.ui.postMessage({ type: "GET_DEFAULT_COLLECTION", data: obj });
    }

    return null;

  }

  if( pluginMessage.func === 'GET_STYLES') {   

    const variables = await figma.variables.getLocalVariablesAsync();
    const variablesFiltered = (variables || []).filter((variable) => {
      return variable.variableCollectionId === pluginMessage.collectionId && !!variable.valuesByMode[pluginMessage.selectedMode];
    });

    try {
      const style = transformVariable(variablesFiltered, pluginMessage.selectedMode);
      figma.ui.postMessage({ type: "GET_STYLE", data: style });  
    } catch (err) {
      console.error(err);
    }

    return;
  }
};