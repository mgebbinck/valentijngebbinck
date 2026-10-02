/* =========================================================
   Valentijn Gebbinck — site script
   ---------------------------------------------------------
   1. VIDEOS  — add YouTube IDs or local MP4 files below
   2. PHOTOS  — add/remove/reorder entries in PHOTOS
   ========================================================= */

/* 1 ─────────── FILM ───────────
   Use "id" for YouTube or "src" for a local MP4 in the repository. */
const VIDEOS = [
  { src: "videos/gucci-milan-ss27.mp4", title: "Gucci", sub: "S/S 27 Show · Milan Fashion Week", poster: "images/poster-gucci-video.jpg", description: "A Milan runway appearance for Gucci, adding a new chapter to Valentijn’s Spring/Summer 2027 season." },
  { id: "E5jf3-mMws0", title: "Dior Men",       sub: "S/S 27 Show · Paris",             poster: "images/poster-dior.jpg", description: "Valentijn opened his Spring/Summer 2027 season on the Dior Men runway in Paris." },
  { id: "egrxdUJ5Kg8", title: "Dries Van Noten", sub: "Men S/S 27 · 25.06.2026",        poster: "images/poster-dvn.jpg", description: "A second Paris runway appearance in three days, for Dries Van Noten’s Spring/Summer 2027 men’s show." },
  { id: "ZqDEHSAR7vo", title: "Ernest W. Baker", sub: "S/S 27 Show · Paris",             poster: "images/poster-ewb.jpg", description: "The third show in Valentijn’s three-day Paris run, completing his Spring/Summer 2027 opening season." }
];

/* 2 ─────────── PORTFOLIO ─────────── */
const PHOTOS = [
  ["gucci-ss27-milan",           "Gucci S/S 27 · Milan · September 2026"],
  ["gucci-ss27-milan-portfolio", "Gucci S/S 27 · Milan · September 2026"],
  ["pfw-2026-06-24_061717", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_165420", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_165707", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_182023", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_182106", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_182953", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_183700", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_191303", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_193236", "Paris · 24 June 2026"],
  ["pfw-2026-06-24_203224", "Paris · 24 June 2026"],
  ["pfw-2026-06-25_225803", "Paris · 25 June 2026"],
  ["ewb-backstage",         "Ernest W. Baker S/S 27 · 26 June 2026"],
  ["pfw-2026-06-26_085613", "Paris · 26 June 2026"],
  ["pfw-2026-06-26_170108", "Paris · 26 June 2026"],
  ["pfw-2026-06-26_173647", "Paris · 26 June 2026"],
  ["pfw-2026-06-27_091701", "Paris · 27 June 2026"]
];

function attachImageFallback(img, fallbackText = "Image unavailable") {
  if (!img) return;

  img.addEventListener("error", () => {
    img.dataset.broken = "true";
    img.alt = fallbackText;
    img.style.display = "none";

    if (img.closest(".lightbox")) {
      img.hidden = true;
      if (typeof lbCap !== "undefined" && lbCap) {
        lbCap.textContent = fallbackText;
      }
    }
  }, { once: true });
}

/* ───────────────── build film ───────────────── */
const videoWrap = document.getElementById("videos");
const live = VIDEOS.filter(v => (v.src && v.src.trim()) || (v.id && v.id.trim()));
if (!live.length) {
  document.getElementById("videosEmpty").hidden = false;
} else {
  live.forEach(v => {
    if (v.src) {
      const card = document.createElement("article");
      card.className = "video-card";

      const playerFigure = document.createElement("figure");
      playerFigure.className = "vid vid--local";

      const player = document.createElement("video");
      player.controls = true;
      player.preload = "metadata";
      player.playsInline = true;
      player.poster = v.poster;
      player.setAttribute("aria-label", v.title + " — " + v.sub);

      const source = document.createElement("source");
      source.src = v.src;
      source.type = "video/mp4";
      player.appendChild(source);

      const caption = document.createElement("figcaption");
      caption.className = "vid__label";
      const title = document.createElement("b");
      title.textContent = v.title;
      caption.append(title, document.createTextNode(v.sub));
      playerFigure.append(player, caption);
      card.appendChild(playerFigure);
      const description = document.createElement("p");
      description.className = "video-card__description";
      description.textContent = v.description;
      card.appendChild(description);
      videoWrap.appendChild(card);
      return;
    }

    const card = document.createElement("article");
    card.className = "video-card";
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
    attachImageFallback(btn.querySelector("img"), v.title + " poster unavailable");
    card.appendChild(btn);
    const description = document.createElement("p");
    description.className = "video-card__description";
    description.textContent = v.description;
    card.appendChild(description);
    videoWrap.appendChild(card);
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
  attachImageFallback(fig.querySelector("img"), caption + " image unavailable");
  fig.addEventListener("click", () => openLightbox(i));
  gallery.appendChild(fig);
});

document.querySelectorAll("img:not(#lbImg)").forEach(img => attachImageFallback(img, "Image unavailable"));

/* ───────────────── lightbox ───────────────── */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
attachImageFallback(lbImg, "Image unavailable");
let current = 0;

function openLightbox(i) {
  current = (i + PHOTOS.length) % PHOTOS.length;
  const [slug, caption] = PHOTOS[current];
  lbImg.hidden = false;
  lbImg.style.display = "";
  lbImg.src = "images/" + slug + ".jpg";
  lbImg.alt = "Valentijn Gebbinck — " + caption;
  lbCap.textContent = caption;
  lb.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lb.hidden = true;
  lbImg.hidden = false;
  lbImg.style.display = "";
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
