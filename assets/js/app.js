/* ============================================================
   RETRO//LAB — CYBERPUNK REDESIGN
   App shell de página única (SPA leve, sem build/frameworks)

   Por que SPA? O requisito era um player de música acessível
   "de forma fluida em todas as telas sem atrapalhar a
   navegação". Num site multi-página tradicional o <audio>
   é destruído a cada troca de página e a música reinicia.
   Aqui o <audio> vive no shell (index.html) e nunca é
   desmontado — apenas o conteúdo da view troca por baixo dele.
   ============================================================ */

const viewRoot = document.getElementById("view-root");
const musicPlayer = document.getElementById("music-player");
const audio = document.getElementById("bg-audio");
const mpOrb = document.getElementById("mp-toggle-expand");
const mpPlayPause = document.getElementById("mp-play-pause");
const mpVolume = document.getElementById("mp-volume");
const mpStatus = document.getElementById("mp-status");
const mpToast = document.getElementById("mp-toast");

let toastTimer = null;
let preDuckVolume = null;

/* ---------------- utilidades ---------------- */

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function showToast(msg) {
  mpToast.textContent = msg;
  mpToast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => mpToast.classList.remove("show"), 2600);
}

function parseHash() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [path, queryString] = raw.split("?");
  const params = new URLSearchParams(queryString || "");
  return { path: path || "/", params };
}

function navigate(path) {
  window.location.hash = path;
}

/* ---------------- player de música persistente ---------------- */

function initMusicPlayer() {
  const savedVolume = parseFloat(localStorage.getItem("rl-volume"));
  audio.volume = Number.isFinite(savedVolume) ? savedVolume : 0.5;
  mpVolume.value = audio.volume;

  mpOrb.addEventListener("click", () => {
    musicPlayer.classList.toggle("expanded");
  });

  mpPlayPause.addEventListener("click", () => togglePlay());

  mpVolume.addEventListener("input", () => {
    audio.volume = parseFloat(mpVolume.value);
    localStorage.setItem("rl-volume", String(audio.volume));
  });

  audio.addEventListener("play", () => {
    musicPlayer.classList.add("playing");
    mpPlayPause.textContent = "❚❚";
    mpStatus.textContent = "Tocando";
    localStorage.setItem("rl-playing", "1");
  });

  audio.addEventListener("pause", () => {
    musicPlayer.classList.remove("playing");
    mpPlayPause.textContent = "▶";
    mpStatus.textContent = "Pausado";
    localStorage.setItem("rl-playing", "0");
  });

  // Autoplay é bloqueado pela maioria dos navegadores até haver
  // interação do usuário. Tentamos tocar; se falhar, aguardamos
  // o primeiro clique em qualquer lugar da página.
  const wantsToPlay = localStorage.getItem("rl-playing") !== "0";
  if (wantsToPlay) {
    audio.play().catch(() => {
      showToast("🎵 Clique em qualquer lugar para ativar o áudio");
      document.body.addEventListener(
        "click",
        () => {
          if (audio.paused) audio.play().catch(() => {});
        },
        { once: true },
      );
    });
  }
}

function togglePlay() {
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

// Reduz o volume da trilha ambiente enquanto um jogo carrega
// (evita conflito com o áudio do emulador) e restaura ao sair.
function duckAudio() {
  if (preDuckVolume === null) {
    preDuckVolume = audio.volume;
    audio.volume = Math.min(audio.volume, 0.15);
    mpVolume.value = audio.volume;
    showToast("🎵 Música reduzida durante o jogo");
  }
}

function restoreAudio() {
  if (preDuckVolume !== null) {
    audio.volume = preDuckVolume;
    mpVolume.value = audio.volume;
    preDuckVolume = null;
  }
}

/* ---------------- views ---------------- */

function renderLanding() {
  restoreAudio();
  viewRoot.innerHTML = `
    <section class="view-landing">
      <p class="brand-tag">// SYSTEM ONLINE</p>
      <h1 class="landing-title glitch" data-text="RETRO LAB">
        RETRO<span>//</span>LAB
      </h1>
      <p class="landing-sub">
        Uma plataforma que hospeda os maiores clássicos de NES, N64 e PS1 —
        agora em uma interface cyberpunk.
      </p>
      <a href="#/biblioteca" class="btn btn--pink">▶ INICIAR SISTEMA</a>

      <section class="about-dev glass">
        <h2>Minhas redes sociais</h2>
        <div class="social-icons">
          <a href="https://github.com/victor-Sarris/" target="_blank" rel="external" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/victorsarris/" target="_blank" rel="external" aria-label="LinkedIn">
            <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/linkedin/default.svg" alt="LinkedIn" />
          </a>
          <a href="https://www.instagram.com/victorsax7_/" target="_blank" rel="external" aria-label="Instagram">
            <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/instagram/default.svg" alt="Instagram" />
          </a>
        </div>
      </section>
    </section>
  `;
}

function renderLibrary(params) {
  restoreAudio();
  const activeConsole = params.get("console") || "all";
  const query = params.get("q") || "";

  viewRoot.innerHTML = `
    <header class="hud-header">
      <a href="#/" class="hud-logo">RETRO<span>//</span>LAB</a>
      <a href="#/" class="btn btn--ghost">← MENU PRINCIPAL</a>
    </header>

    <h1 class="library-title">Biblioteca de Clássicos</h1>

    <div class="toolbar">
      <input
        type="search"
        id="search-input"
        class="search-input"
        placeholder="Buscar jogo..."
        value="${query.replace(/"/g, "&quot;")}"
      />
      <div class="chip-row" id="chip-row">
        ${Object.entries(CONSOLE_LABELS)
          .map(
            ([key, label]) => `
          <button class="chip${key === activeConsole ? " active" : ""}" data-console="${key}">
            ${label}
          </button>`,
          )
          .join("")}
      </div>
    </div>

    <div class="grid" id="game-grid"></div>
  `;

  const grid = document.getElementById("game-grid");
  const searchInput = document.getElementById("search-input");
  const chipRow = document.getElementById("chip-row");

  function renderGrid() {
    const cons = new URLSearchParams(window.location.hash.split("?")[1] || "")
      .get("console") || "all";
    const q = (
      new URLSearchParams(window.location.hash.split("?")[1] || "").get(
        "q",
      ) || ""
    ).toLowerCase();

    const filtered = GAMES.filter((g) => {
      const matchesConsole = cons === "all" || g.console === cons;
      const matchesQuery = g.title.toLowerCase().includes(q);
      return matchesConsole && matchesQuery;
    });

    grid.innerHTML =
      filtered
        .map(
          (g) => `
        <a class="card" href="#/jogo/${g.slug}">
          <span class="card-badge">${CONSOLE_LABELS[g.console]}</span>
          <div class="card-img-wrap">
            <img src="${g.img}" alt="${g.title}" loading="lazy" />
          </div>
          <div class="card-body">
            <p>${g.title}</p>
          </div>
        </a>`,
        )
        .join("") ||
      `<p class="empty-state">Nenhum jogo encontrado para essa busca/filtro.</p>`;
  }

  function updateHash({ console: c, q } = {}) {
    const p = new URLSearchParams(window.location.hash.split("?")[1] || "");
    if (c !== undefined) c === "all" ? p.delete("console") : p.set("console", c);
    if (q !== undefined) q ? p.set("q", q) : p.delete("q");
    const qs = p.toString();
    history.replaceState(null, "", `#/biblioteca${qs ? "?" + qs : ""}`);
  }

  chipRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    chipRow
      .querySelectorAll(".chip")
      .forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    updateHash({ console: btn.dataset.console });
    renderGrid();
  });

  let debounce;
  searchInput.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      updateHash({ q: searchInput.value.trim() });
      renderGrid();
    }, 200);
  });

  renderGrid();
}

function renderPlayer(slug) {
  const game = GAMES.find((g) => g.slug === slug);

  viewRoot.innerHTML = `
    <header class="hud-header">
      <a href="#/" class="hud-logo">RETRO<span>//</span>LAB</a>
      <a href="#/biblioteca" class="btn btn--ghost">← VOLTAR PARA BIBLIOTECA</a>
    </header>

    <p class="breadcrumb">
      <a href="#/biblioteca">Biblioteca</a> /
      ${game ? `<a href="#/biblioteca?console=${game.console}">${CONSOLE_LABELS[game.console]}</a> / ${game.title}` : "Jogo não encontrado"}
    </p>

    <h1 class="game-title">${game ? "Jogando: " + game.title : "Erro: Jogo não encontrado"}</h1>

    ${
      game
        ? `
      <div class="game-container">
        <iframe
          id="game-frame"
          src="${game.embed}"
          allowfullscreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          scrolling="no"
        ></iframe>
      </div>
      <div class="player-actions">
        <button id="btn-fullscreen" class="btn btn--ghost">⛶ TELA CHEIA</button>
        <a href="#/biblioteca" class="btn btn--ghost">← OUTRO JOGO</a>
      </div>
      <p class="audio-note">A trilha sonora do site é reduzida automaticamente durante a partida.</p>
    `
        : `<p class="audio-note">Volte para a <a href="#/biblioteca" style="color:var(--neon-cyan)">biblioteca</a> e escolha um jogo.</p>`
    }
  `;

  if (game) {
    duckAudio();
    const fsBtn = document.getElementById("btn-fullscreen");
    fsBtn.addEventListener("click", () => {
      const container = document.querySelector(".game-container");
      if (container.requestFullscreen) container.requestFullscreen();
    });
  }
}

/* ---------------- router ---------------- */

function router() {
  const { path, params } = parseHash();

  if (path === "/" ) {
    renderLanding();
  } else if (path === "/biblioteca") {
    renderLibrary(params);
  } else if (path.startsWith("/jogo/")) {
    renderPlayer(path.replace("/jogo/", ""));
  } else {
    renderLanding();
  }

  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", () => {
  initMusicPlayer();
  initParticles();
  router();
});

/* ---------------- fundo de partículas ---------------- */

function initParticles() {
  if (typeof particlesJS === "undefined") return;
  particlesJS("particles-js", {
    particles: {
      number: { value: 70 },
      color: { value: ["#05d9e8", "#ff2ad4"] },
      shape: { type: "edge" },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#9d00ff",
        opacity: 0.35,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.8,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
      },
    },
    retina_detect: true,
  });
}
