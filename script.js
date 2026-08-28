/* =========================================================
   Valentijn Gebbinck — site script
   ---------------------------------------------------------
   1. VIDEOS  — paste your YouTube IDs below (see README.md)
   2. PHOTOS  — add/remove/reorder entries in PHOTOS
   ========================================================= */

/* 1 ─────────── FILM ───────────
   "id" is the part of the YouTube URL after  watch?v=
   e.g. https://www.youtube.com/watch?v=egrxdUJ5Kg8  ->  id: "egrxdUJ5Kg8"
   Entries with an empty id are simply not shown.            */
const VIDEOS = [
  { id: "",            title: "Dior Men",       sub: "S/S 27 Men’s Show · 24.06.2026", poster: "images/poster-dior.jpg" },
  { id: "egrxdUJ5Kg8", title: "Dries Van Noten", sub: "Men S/S 27 · 25.06.2026",        poster: "images/poster-dvn.jpg"  },
  { id: "",            title: "Ernest W. Baker", sub: "S/S 27 Show · 26.06.2026",       poster: "images/poster-ewb.jpg"  }
];

/* 2 ─────────── PORTFOLIO ─────────── */
const PHOTOS = [
  ["pfw-2026-06-24_061717", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_073120", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_075608", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_075623", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_121044", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_121950", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_165420", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_165707", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_182023", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_182106", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_182953", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_183700", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_191303", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_193236", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_203224", "Paris · 24 June 2026"],
  ["pfw-2026-06-25_175718", "Paris · 25 June 2026"],
  ["pfw-2026-06-25_182816", "Paris · 25 June 2026"],
  ["pfw-2026-06-25_225803", "Paris · 25 June 2026"],
  ["ewb-backstage",         "Ernest W. Baker S/S 27 · 26 June 2026"],
  ["pfw-2026-06-26_085613", "Paris · 26 June 2026"],
  ["pfw-2026-06-26_170108", "Paris · 26 June 2026"],
  ["pfw-2026-06-26_173647", "Paris · 26 June 2026"],
  ["pfw-2026-06-27_091701", "Paris · 27 June 2026"]
];

/* ───────────────── build film ───────────────── */
const videoWrap = document.getElementById("videos");
const live = VIDEOS.filter(v => v.id && v.id.trim());
if (!live.length) {
  document.getElementById("videosEmpty").hidden = false;
} else {
  live.forEach(v => {
    const btn = document.createElement("button");
    btn.className = "vid";
    btn.type = "button";
    btn.setAttribute("aria-label", "Play " + v.title);
    btn.innerHTML =
      '<img src="' + v.poster + '" alt="" loading="lazy" decoding="async">' +
      '<span class="vid__play" aria-hidden="true">▶</span>' +
      '<span class="vid__label"><b>' + v.title + "</b>" + v.sub + "</span>";
    btn.addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&rel=0&modestbranding=1";
      f.title = v.title;
      f.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      btn.replaceChildren(f);
      btn.style.cursor = "default";
    }, { once: true });
    videoWrap.appendChild(btn);
  });
}

/* ───────────────── build gallery ───────────────── */
const gallery = document.getElementById("gallery");
PHOTOS.forEach(([slug, caption], i) => {
  const fig = document.createElement("figure");
  fig.className = "shot";
  fig.dataset.index = i;
  fig.innerHTML =
    '<img src="images/thumbs/' + slug + '.jpg" alt="Valentijn Gebbinck — ' + caption + '" loading="lazy" decoding="async">' +
    "<figcaption>" + caption + "</figcaption>";
  fig.addEventListener("click", () => openLightbox(i));
  gallery.appendChild(fig);
});

/* ───────────────── lightbox ───────────────── */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
let current = 0;

function openLightbox(i) {
  current = (i + PHOTOS.length) % PHOTOS.length;
  const [slug, caption] = PHOTOS[current];
  lbImg.src = "images/" + slug + ".jpg";
  lbImg.alt = "Valentijn Gebbinck — " + caption;
  lbCap.textContent = caption;
  lb.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lb.hidden = true;
  lbImg.src = "";
  document.body.style.overflow = "";
}
lb.querySelector(".lb__close").addEventListener("click", closeLightbox);
lb.querySelector(".lb__prev").addEventListener("click", e => { e.stopPropagation(); openLightbox(current - 1); });
lb.querySelector(".lb__next").addEventListener("click", e => { e.stopPropagation(); openLightbox(current + 1); });
lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lb__stage")) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") openLightbox(current - 1);
  if (e.key === "ArrowRight") openLightbox(current + 1);
});

/* ───────────────── reveal on scroll ───────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  });
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
document.querySelectorAll(".reveal, .shot").forEach(el => io.observe(el));

/* ───────────────── nav ───────────────── */
const nav = document.getElementById("nav");
const toggle = nav.querySelector(".nav__toggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll(".nav__links a").forEach(a =>
  a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); })
);

document.getElementById("year").textContent = new Date().getFullYear();
