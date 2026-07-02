/* ============================================================
   RETRO//LAB — Catálogo de jogos
   Extraído de pages/home.html (original) e centralizado aqui
   para alimentar grid, busca, filtro e a tela de jogo.
   ============================================================ */

const GAMES = [
  // ---------------- NES ----------------
  {
    slug: "choujin-sentai-jetman",
    title: "Choujin Sentai Jetman",
    console: "nes",
    img: "img/nes/ChoujinSentaiJetman.png",
    embed:
      "https://www.retrogames.cc/embed/21566-choujin-sentai-jetman-japan.html",
  },
  {
    slug: "felix-the-cat",
    title: "Felix The Cat",
    console: "nes",
    img: "img/nes/FelixTheCat.png",
    embed: "https://www.retrogames.cc/embed/21044-felix-the-cat-europe.html",
  },
  {
    slug: "cocoron",
    title: "Cocoron",
    console: "nes",
    img: "img/nes/Cocoron.png",
    embed:
      "https://www.retrogames.cc/embed/21048-cocoron-japan-en-by-magic-destiny-v1-0.html",
  },
  {
    slug: "darkwing-duck",
    title: "Darkwing Duck",
    console: "nes",
    img: "img/nes/DarkwingDuck.png",
    embed: "https://www.retrogames.cc/embed/20587-darkwing-duck-europe.html",
  },
  {
    slug: "ninja-gaiden",
    title: "Ninja Gaiden",
    console: "nes",
    img: "img/nes/NinjaGaiden.png",
    embed:
      "https://www.retrogames.cc/embed/17678-ninja-gaiden-episode-ii-the-dark-sword-of-chaos-usa.html",
  },
  {
    slug: "mario",
    title: "Mario Edição de Aniversário 35 Anos",
    console: "nes",
    img: "img/nes/Mario1.png",
    embed:
      "https://www.retrogames.cc/embed/43736-smb-special-35th-anniversary-edition.html",
  },
  {
    slug: "mario-2",
    title: "Mario II",
    console: "nes",
    img: "img/nes/MarioII.png",
    embed: "https://www.retrogames.cc/embed/44559-return-to-subcon.html",
  },
  {
    slug: "sonic",
    title: "Sonic The Hedgehog",
    console: "nes",
    img: "img/nes/Sonic.png",
    embed:
      "https://www.retrogames.cc/embed/44498-sonic-the-hedgehog-vol-2.html",
  },
  {
    slug: "megaman",
    title: "MegaMan",
    console: "nes",
    img: "img/nes/MegaMan.png",
    embed:
      "https://www.retrogames.cc/embed/44977-megaman-1-the-new-lands-remastered.html",
  },
  {
    slug: "dbz-supersonic-warriors",
    title: "Dragon Ball Z - Supersonic Warriors (K)(ProjectG)",
    console: "nes",
    img: "img/nes/dragon-ball-z-supersonic-warriors-k-projectg.webp",
    embed:
      "https://www.retrogames.cc/embed/28096-dragon-ball-z-supersonic-warriors-k-projectg.html",
  },

  // ---------------- N64 ----------------
  {
    slug: "duck-dodgers",
    title: "Duck Dodgers",
    console: "n64",
    img: "img/n64/duckdodgers-1646017434474.webp",
    embed:
      "https://www.retrogames.cc/embed/32388-daffy-duck-starring-as-duck-dodgers-europe-en-fr-de-es-it-nl.html",
  },
  {
    slug: "mario-64",
    title: "Mario 64",
    console: "n64",
    img: "img/n64/Mario64.webp",
    embed:
      "https://www.retrogames.cc/embed/42138-super-ultra-kaizo-memeio-road-128-tars-extreme-edition-revenge-deluxe.html",
  },
  {
    slug: "banjo-tooie",
    title: "Banjo Tooie",
    console: "n64",
    img: "img/n64/Banjo Tooie.webp",
    embed: "https://www.retrogames.cc/embed/32886-banjo-tooie-usa.html",
  },
  {
    slug: "donald-duck-goin",
    title: "Donald Duck - Goin' Quackers",
    console: "n64",
    img: "img/n64/Donald Duck - Goin.webp",
    embed:
      "https://www.retrogames.cc/embed/32212-donald-duck-goin-quackers-usa-en-fr-de-es-it.html",
  },
  {
    slug: "zelda-ocarina-of-time",
    title: "Zelda Ocarina Of Time",
    console: "n64",
    img: "img/n64/Zelda Ocarina Of Time.webp",
    embed:
      "https://www.retrogames.cc/embed/42737-shifting-sand-dungeon.html",
  },

  // ---------------- PS1 ----------------
  {
    slug: "crash-bandicoot",
    title: "Crash Bandicoot",
    console: "ps1",
    // Bug corrigido: o original apontava para img/n64/Crash Bandicoot.webp
    // (pasta errada). A imagem correta já existia em img/ps1/.
    img: "img/ps1/crashbandicoot.webp",
    embed: "https://www.retrogames.cc/embed/40784-crash-bandicoot.html",
  },
];

const CONSOLE_LABELS = {
  all: "TODOS",
  nes: "NES",
  n64: "NINTENDO 64",
  ps1: "PLAYSTATION 1",
};
