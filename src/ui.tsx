import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";

// declare function require(path: string): any;

function App() {
  const textAreaRef = React.useRef(null);
  const [lastUpdate, setLastUpdate] = React.useState(null);
  const [dataContent, setdataContent] = React.useState(null);
  const [defaultCollection, setDefaultCollection] = React.useState(null);
  const [selectedMode, setSelectedMode] = React.useState('');
  const [tab, setTab] = React.useState('table');
  const [isCopied, setIsCopied] = React.useState(false);
  const parsedDataDataContent = React.useMemo(() => (!!dataContent ? JSON.stringify(dataContent, null, 2) : ''), [dataContent]);

  const getCssKeys = (obj, res?) => {
    res = res || [];

    if( Array.isArray(obj)) {
        obj.forEach(a => {
            return getCssKeys(a, res);
        });
    } else if( typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
            if( typeof obj[key] === 'string' ) {
                res.push([key, obj[key]]);
            }
        });
        return getCssKeys(Object.values(obj).filter( a => typeof a !== 'string'), res);
    }
    return res;
  }


  const cssKeys: {key: string, light: string, dark: string}[]  = React.useMemo(() => {
    const data = JSON.parse(JSON.stringify(dataContent));
    const obj = { dark: getCssKeys(data?.darkMode || []), light: getCssKeys(data?.lightMode || []) };

    const res = {};

    obj.light.forEach( a => {
      if(!res[a[0]]){ res[a[0]] = { key: a[0] } };
      res[a[0]].light = a[1];
    });

    obj.dark.forEach( a => {
      if(!res[a[0]]){ res[a[0]] = { key: a[0] } };
      res[a[0]].dark = a[1];
    });


    return Object.values(res);
  }, [dataContent]);


  window.onmessage = (event) => {
    const message = event.data.pluginMessage;

    if( message.type === 'GET_DEFAULT_COLLECTION') {
      setDefaultCollection(message.data);
    }

    if( message.type === 'GET_STYLE') {
      setdataContent(message.data);
      setLastUpdate(new Date());
    }

  }

  const onGetDefaultCollection = () => {
    parent.postMessage({ pluginMessage: { func:'GET_DEFAULT_COLLECTION' } }, '*');
  };

  React.useEffect(
    onGetDefaultCollection,
    []
  )

  const onGetStyles = () => {
    if(!defaultCollection?.modes.length) {
      setdataContent('');
      setLastUpdate(null);
      return;
    }

    parent.postMessage({ pluginMessage: { 
      func: 'GET_STYLES',
      collectionId: defaultCollection.collectionId, 
      selectedModes: defaultCollection?.modes,
      variables: defaultCollection.variableIds      
    } }, '*');
  };


  const onCopy = async () => {
    textAreaRef.current.select();
    document.execCommand('copy');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000)
  };
 
  return (
    <main>
      <section>
        {defaultCollection?.modes.length && (<button className="brand" onClick={() => onGetStyles()}>
          {lastUpdate ? 'Atualizar variáveis' : 'Gerar'} 
        </button>)}

        <div>
        { lastUpdate && (<div>
          <small>Atualizado em: {lastUpdate.toLocaleString('pt-br')}</small>
        </div>) }          
        </div>

      </section>

      {!!cssKeys && cssKeys.length > 0 && (<section className="tabs">
        <div className={`tab${tab === 'table' ? ' is-active' : ''}`} onClick={() => setTab('table')}>Tabela</div>
        <div className={`tab${tab === 'code' ? ' is-active' : ''}`} onClick={() => setTab('code')}>Código</div>
      </section>)}
      {tab === 'table' && (<section>
        {!!cssKeys && cssKeys.length > 0 && (<>
          <div className="table">
          <div className="table-row">
            <div className="table-column">Chave CSS</div>
            <div className="table-column">Light</div>
            <div className="table-column">Dark</div>
          </div>
          {cssKeys.map( (cssKey) => (
            <div className="table-row" key={'dark-' + cssKey}>
              <div className="table-column"> <span className="key-code">--{cssKey.key}</span></div>
              <div className="table-column">
                {!!cssKey.light && (<div className="key-square" style={{'background': cssKey.light}}></div>)}
              </div>
              <div className="table-column">
                {!!cssKey.dark && (<div className="key-square" style={{'background': cssKey.dark}}></div>)}
              </div>
            </div>
          ))}
          </div>
        </>)}


      </section>)}
      
      {tab === 'code' && (<section>
        <textarea ref={textAreaRef} value={parsedDataDataContent} readOnly onClick={onCopy}></textarea>
      </section>)}
      { isCopied && (<section>
          Código Copiado!
        </section>)}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />);