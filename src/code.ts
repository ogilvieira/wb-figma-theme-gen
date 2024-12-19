import transformVariable from "./lib/transformVariable";
import { normalizePropName } from './utils/text';

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

    const variablesFiltered = {};

    for( const selectedMode of pluginMessage.selectedModes ) {
      variablesFiltered[normalizePropName(selectedMode.name)] = {
        id: selectedMode.modeId,
        variables: (variables || []).filter((variable) => {
          return variable.variableCollectionId === pluginMessage.collectionId && !!variable.valuesByMode[selectedMode.modeId];
        })
      };
    }

    try {
      
      for( const selectedMode of Object.keys(variablesFiltered) ) {
        variablesFiltered[selectedMode] = transformVariable(variablesFiltered[selectedMode].variables, variablesFiltered[selectedMode].id);
      }
      
      figma.ui.postMessage({ type: "GET_STYLE", data: variablesFiltered }); 
    } catch (err) {
      console.error(err);
    }

    return;
  }
};