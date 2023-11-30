# Webet Theme Generator 2.0
Gerador de variáveis de tema para WeBet

---

## Passo a passo no FIGMA
### 1 - Baixar e Instalar Figma App
Baixe e instale o Figma APP correto para seu SO [neste link](https://www.figma.com/downloads/). Para Linux Debian, há esta [opção na Snapcraft](https://snapcraft.io/install/figma-linux/debian).


### 2 - Cria uma cópia do design
Para poder usar o plugin local você irá precisar criar uma cópia do arquivo do tema caso não seja o dono.

![Save to Draft](/git/save-to-drafts.png)


### 3 - Ative o Dev Mode no Figma
Instruções para [ativar o Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode#Enter_Dev_Mode) no Figma.


### 4 - Carregue o Plugin
- Com o modo desenvolvedor ativo, Selecione o menu `Figma > Plugins > Development > Import plugin from manifest`

![Import from Manifest](/git/import-from-manifest.png)

- Navegue até a pasta dos arquivos do plugin e selecione o `manifest.json`

- Na aba de Plugins, clique duas vezes sobre o plugin


7 - Se as variáveis estiverem corretas, o plugin deve gerar a `Tabela de Prévia` e o `Objeto JavasScript`corretamente para ser usado na propriedade `colors` da configuração do tema `themes/${NOME_DO_TEMA}/config.js`.

![Tabela de Prévia](/git/plugin-2.png)
![Objeto JSON](/git/plugin-2.png)
