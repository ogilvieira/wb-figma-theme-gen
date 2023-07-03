# Webet Theme Generator

Criado a partir da ideia de Josué Gomes.

---

## Passo a passo no FIGMA
1 - Baixe e instale o Figma APP correto para seu SO [neste link](https://www.figma.com/downloads/). Para Linux Debian, há esta [opção na Snapcraft](https://snapcraft.io/install/figma-linux/debian).


2 - Para poder usar o plugin local você irá precisar criar uma cópia do arquivo do tema caso não seja o dono.

![Save to Draft](/git/save-to-drafts.png)


3 - [Ative o Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode#Enter_Dev_Mode) no Figma.


4 - Com o modo desenvolvedor ativo, Selecione o menu `Figma > Plugins > Development > Import plugin from manifest`

![Import from Manifest](/git/import-from-manifest.png)

5 - Navegue até a pasta dos arquivos do plugin e selecione o `manifest.json`

6 - Na aba de Plugins, selecione `Run > In-development version`
![Plugins Tab](/git/plugins-tab.png)

7 - Se as variáveis estiverem corretas, o plugin deve gerar o objeto js correto para ser usado na propriedade `colors` da configuração do tema `config.js`.

![Plugin](/git/plugin.png)
