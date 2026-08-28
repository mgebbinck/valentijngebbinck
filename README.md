# Valentijn Gebbinck — portfolio site

A static, single-page model portfolio. No build step, no dependencies — plain HTML, CSS and JavaScript, ready for GitHub Pages.

```
index.html        the page
style.css         all styling
script.js         gallery + film configuration  ← edit this to add content
images/           full-size photos (max 1800px)
images/thumbs/    gallery thumbnails (max 900px)
.nojekyll         tells GitHub Pages to serve files as-is
```

## Publishing on GitHub Pages

1. Create a new repository on GitHub, e.g. `valentijn-gebbinck`.
2. Upload the **contents** of this folder to the repository root (`index.html` must sit at the top level).
3. Go to **Settings → Pages**.
4. Under *Build and deployment* → *Source*, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
5. After a minute the site is live at `https://<username>.github.io/valentijn-gebbinck/`.

For a custom domain (e.g. `valentijngebbinck.com`), add it under Settings → Pages → Custom domain, and point a CNAME record at `<username>.github.io` in your DNS.

## Adding the YouTube films

Open `script.js` and fill in the `VIDEOS` list at the top. Only the video ID is needed — the part after `watch?v=` in the URL:

```
https://www.youtube.com/watch?v=egrxdUJ5Kg8
                                └──────────┘  this is the id
```

```js
{ id: "egrxdUJ5Kg8", title: "Dior Men", sub: "S/S 27 Men’s Show · 24.06.2026", poster: "images/poster-dior.jpg" }
```

An entry with an empty `id` is skipped, so the section never shows a broken player. Currently the Dries Van Noten S/S 27 men's show is linked; add your own uploads for Dior Men and Ernest W. Baker.

Videos are embedded via `youtube-nocookie.com` and only load after a click, so the page stays fast and privacy-friendly.

## Adding or removing photos

1. Drop the full-size image in `images/` and a smaller copy in `images/thumbs/` using the **same filename**.
2. Add a line to the `PHOTOS` list in `script.js`:

```js
["my-new-photo", "Paris · 24 June 2026"],
```

The order of the list is the order on the page. Removing a line removes the photo.

Recommended sizes: full-size max 1800px on the long edge, thumbnails max 900px, JPEG quality ~80. Keeping images below ~500 KB keeps the site quick on mobile.

## Notes

- HEIC files from iPhone are not supported by browsers; export them as JPEG before adding.
- Two HEIC files in the source folder were skipped for that reason.
- The hero image is set in `index.html` (`class="hero__img"`) — swap the filename there to change it.
- Profile details (agencies, measurements) are plain text in `index.html` under the *Profile* and *Representation* sections.
