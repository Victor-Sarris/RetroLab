# Retro//Lab — Proposta de Redesign Cyberpunk

Redesign completo do RetroLab original (3 páginas HTML soltas) para uma experiência imersiva cyberpunk, com player de música persistente. Zero frameworks/build — só HTML/CSS/JS puro, igual ao projeto original.

## Como abrir

Abra `index.html` diretamente no navegador (funciona via `file://`, sem servidor necessário).

## O que mudou e por quê

### 1. Arquitetura: de 3 páginas para 1 shell (SPA leve)

O pedido era um player de música "acessível de forma fluida em todas as telas sem atrapalhar a navegação". No projeto original, cada página (`index.html`, `home.html`, `player.html`) carregava seu próprio `<audio>` — a música reiniciava do zero a cada clique, e `index.html` nem tinha os elementos que o script referenciava (bug).

Solução: `index.html` agora é um **shell único**. O `<audio>` e o player flutuante vivem fora da área de conteúdo (`#view-root`) e nunca são recriados. Um roteador por hash (`#/`, `#/biblioteca`, `#/jogo/<slug>`) troca só o conteúdo — a música toca ininterrupta em qualquer navegação. Isso também elimina o recarregamento do `particles.js` a cada troca de tela (melhor performance).

### 2. Paleta de cores

| Token | Hex | Uso |
|---|---|---|
| `--bg-void` | `#030014` | Fundo base |
| `--bg-surface` | `#0b0818` | Cards, painéis |
| `--bg-glass` | `rgba(14,10,28,.55)` | Vidro fumê (header, player, modais) |
| `--neon-cyan` | `#05d9e8` | Ação primária, foco, HUD |
| `--neon-pink` | `#ff2ad4` | Ação secundária/destaque, glitch |
| `--neon-purple` | `#9d00ff` | Detalhes, linhas do grid de fundo |
| `--neon-yellow` | `#f9f002` | Reservada para alertas (uso futuro) |
| `--text-primary` | `#f4f2fb` | Texto principal |
| `--text-muted` | `#9a93b3` | Texto secundário |

Contraste texto-primário sobre `--bg-void` ~15:1 (AAA). Botões cyan/pink sobre fundo escuro passam AA para texto grande.

### 3. Tipografia

- **Orbitron** — títulos e HUD (identidade futurista/cyberpunk)
- **Rajdhani** — corpo de texto (já usada no original, mantida)
- **Share Tech Mono** — labels técnicos, breadcrumb, chips (efeito terminal)
- **Press Start 2P** — mantida como Easter egg pontual, ligando a nostalgia retro-arcade à estética cyberpunk

### 4. Elementos visuais cyberpunk

- Glitch animado no título da tela inicial (`data-text` + camadas cyan/pink deslocadas)
- Cards com vidro fumê, borda que troca de cor no hover e brilho neon (`box-shadow`)
- Grid de linhas sutil + scanlines + vinheta fixos no fundo, reforçando a sensação de "tela CRT/HUD"
- Botões com cantos cortados (clip-path) em vez de retângulos simples
- Badge de console (NES/N64/PS1) sobreposto na imagem do card, para escanear a biblioteca sem precisar filtrar

### 5. Jornada do usuário

**Tela inicial** → CTA único e claro ("INICIAR SISTEMA") leva à biblioteca. Player de música aparece como um orbe flutuante discreto no canto inferior direito, expansível com um clique — não compete com o CTA principal.

**Biblioteca** → O modal de categoria do original foi trocado por uma **barra de chips sempre visível** (Todos/NES/N64/PS1) + campo de busca por nome. Isso reduz de 2 cliques (abrir modal → escolher) para 1 clique, e a busca cobre o caso de catálogo crescer. Cards mostram o console de cada jogo diretamente, sem precisar filtrar para saber.

**Tela de jogo** → Breadcrumb (Biblioteca / Console / Jogo) situa o usuário. Botão de tela cheia dedicado. A trilha do site é **automaticamente reduzida** (ducking de volume) ao entrar num jogo — evita som conflitando com o emulador — e volta ao volume normal ao sair. Um toast discreto avisa isso na primeira vez.

**Player de música (todas as telas)** → Orbe fixo; expande para mostrar nome da faixa, equalizador animado, play/pause e volume. Estado (tocando/pausado, volume) persiste em `localStorage`, então volta do jeito que o usuário deixou mesmo depois de fechar a aba.

### 6. Bugs corrigidos do original

- `index.html` chamava `#bg-music`/`#music-toggle` que não existiam no HTML — o script quebrava.
- Card do "Crash Bandicoot" (PS1) usava uma imagem da pasta `img/n64/`; corrigido para `img/ps1/crashbandicoot.webp`, que já existia mas não era usado.
- Autoplay de áudio sem tratamento de erro consistente entre páginas — agora há fallback único com aviso claro ("clique para ativar o áudio"), cumprindo as políticas de autoplay dos navegadores.

## Estrutura de arquivos

```
RetroLab-Cyberpunk/
├── index.html                 # shell único (SPA)
├── assets/
│   ├── css/style.css          # design tokens + todos os componentes
│   └── js/
│       ├── games-data.js      # catálogo de jogos (fonte única de dados)
│       └── app.js             # router, views, player de música, particles
├── img/                        # assets originais, reaproveitados
└── music/                      # trilha original, reaproveitada
```

## Próximos passos sugeridos (não implementados aqui)

- Recolorir os cursores customizados (`img/cursor/*.png`) em tons cyan/pink para reforçar a identidade
- Adicionar 2-3 faixas extra e transformar o player num mini-playlist (a versão atual foi definida como escopo: player simples de uma faixa)
- Testar contraste em modo de "baixo estímulo" (usuários sensíveis a glitch/neon) — considerar um toggle de "modo calmo" que desliga glitch e reduz brilho
