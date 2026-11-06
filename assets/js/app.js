// Site enhancements. The site works without this file.
// Accordion strips as buttons (state, title, scroll to inner targets), the Contacts button, and the bottom sheet
// with the full text of an area card on touch devices.
// (The detail sheet comes in plan step 10.)
// The open section is decided by CSS from the URL hash (:target); this file only mirrors it for assistive
// technology and the page title, and scrolls to elements inside a panel.

document.documentElement.classList.add("js");

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const wraps = [...document.querySelectorAll(".panel-wrap")];
const baseTitle = document.title;
// Detail pages (case, service) keep their own title and open the section by themselves; their links leave the page.
const detail = !!document.querySelector("[data-sheet]");

// Strips: links with the button role. Enter already follows the link; Space does the same.
wraps.forEach((wrap) => {
  const link = wrap.querySelector(".strip__link");
  link.setAttribute("role", "button");
  link.setAttribute("aria-controls", `${wrap.id}-panel`);
  link.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      event.preventDefault();
      link.click();
    }
  });
});

// Hash target: the element the URL points to (read from the hash: :target is not set yet when this script runs).
const hashTarget = () => location.hash.length > 1 ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;

// Open section: the one holding the hash target, else the one marked data-open.
const openWrap = () => hashTarget()?.closest(".panel-wrap") ?? wraps.find((w) => w.hasAttribute("data-open"));

const sync = () => {
  const open = openWrap();
  wraps.forEach((wrap) => wrap.querySelector(".strip__link").setAttribute("aria-expanded", String(wrap === open)));
  if (detail) return;
  const label = open?.querySelector(".strip__label").textContent;
  document.title = open && open !== wraps[0] ? `${label} — ${baseTitle.split(" — ")[0]}` : baseTitle;
};

// A hash that points inside a panel: scroll the panel to it (not the page), once the section has opened.
const scrollToInner = () => {
  const target = hashTarget();
  if (detail || !target || target.classList.contains("panel-wrap")) return;
  setTimeout(() => target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" }), reduceMotion.matches ? 0 : 400);
};

// hashchange also fires for back and forward, so it covers the browser history.
addEventListener("hashchange", () => { sync(); scrollToInner(); });
sync();
scrollToInner();

// Contacts button: if the first section is closed, open it first and wait for the strip animation to end,
// then scroll to the contacts block (smooth, instant with reduced motion). Without JS the link still jumps.
document.querySelector(".strip__contact")?.addEventListener("click", (event) => {
  if (detail) return;
  const target = document.getElementById("contatti");
  const section = document.getElementById("omniaevo");
  if (!target || !section) return;
  event.preventDefault();
  const reduce = reduceMotion.matches;
  const scroll = () => {
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#contatti");
  };

  const closed = location.hash && location.hash !== "#omniaevo" && !target.closest(":target");
  if (!closed) return scroll();

  location.hash = "omniaevo";
  if (reduce) return scroll();
  // Wait for the section to finish growing (the fallback timer covers a missing transitionend).
  let done = false;
  const go = () => { if (!done) { done = true; scroll(); } };
  section.addEventListener("transitionend", (e) => e.propertyName === "flex-grow" && go(), { once: true });
  setTimeout(go, 800);
});

const sheet = document.getElementById("area-sheet");
const touch = matchMedia("(hover: none)");

if (sheet) {
  const fill = (selector, value) => { sheet.querySelector(selector).textContent = value; };
  let opener = null;

  const open = (card) => {
    opener = card;
    fill("[data-sheet-num]", card.querySelector(".area__num").textContent);
    fill("[data-sheet-title]", card.querySelector(".area__title").textContent);
    // innerHTML: the text comes from the page itself and keeps its key words (<strong>)
    sheet.querySelector("[data-sheet-text]").innerHTML = card.querySelector(".area__full").innerHTML;
    sheet.showModal();
  };

  document.querySelectorAll(".area").forEach((card) => {
    card.addEventListener("click", () => touch.matches && open(card));
    card.addEventListener("keydown", (event) => {
      if (touch.matches && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        open(card);
      }
    });
  });

  sheet.querySelector(".sheet__close").addEventListener("click", () => sheet.close());
  // A click on the backdrop lands on the dialog itself, outside its content box.
  sheet.addEventListener("click", (event) => {
    const r = sheet.getBoundingClientRect();
    if (event.clientY < r.top || event.clientX < r.left || event.clientX > r.right) sheet.close();
  });
  sheet.addEventListener("close", () => opener?.focus());
}

// Gallery of a detail sheet: arrows, thumbnails and dots follow the strip (swipe or scroll). Without JS the
// strip scrolls and the links jump to #img-n.
const initGallery = (root) => root.querySelectorAll(".gallery--multi").forEach((gallery) => {
  const track = gallery.querySelector(".gallery__track");
  const slides = [...track.children];
  const thumbs = [...gallery.querySelectorAll(".gallery__thumbs a")];
  const dots = [...gallery.querySelectorAll(".gallery__dots a")];
  const list = gallery.querySelector(".gallery__thumbs");
  const [prev, next] = ["prev", "next"].map((name) => gallery.querySelector(`[data-gallery="${name}"]`));
  const behavior = () => (reduceMotion.matches ? "auto" : "smooth");

  const current = () => slides.reduce((best, slide, i) =>
    Math.abs(slide.offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - track.scrollLeft) ? i : best, 0);

  const show = (i) => {
    [thumbs, dots].forEach((items) => items.forEach((el, k) => el.toggleAttribute("aria-current", k === i)));
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
    // Thumbnail window: three visible, it follows the selected image.
    const first = thumbs[Math.max(0, Math.min(i - 1, slides.length - 3))].parentElement;
    list.scrollTo({ top: first.offsetTop, behavior: behavior() });
  };

  const goTo = (i) => track.scrollTo({ left: slides[i].offsetLeft, behavior: behavior() });

  track.addEventListener("scroll", () => show(current()), { passive: true });
  prev.addEventListener("click", () => goTo(Math.max(0, current() - 1)));
  next.addEventListener("click", () => goTo(Math.min(slides.length - 1, current() + 1)));
  [...thumbs, ...dots].forEach((link, k) => link.addEventListener("click", (event) => {
    event.preventDefault();
    goTo(k % slides.length);
  }));
  // Left and right arrows move through the images when the focus is inside the gallery.
  gallery.addEventListener("keydown", (event) => {
    const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (!step || event.target.closest("input, textarea")) return;
    event.preventDefault();
    goTo(Math.max(0, Math.min(slides.length - 1, current() + step)));
  });
  show(0);
});
initGallery(document);

// Detail sheet: a card ([data-detail] link) opens its detail page in the shared <dialog> without leaving the page.
// The URL is pushed, Back and Esc close the sheet, the focus goes back to the card. If anything fails the link
// works as a normal link. A detail page opened directly has its sheet already open: it becomes modal, and
// closing it follows the close link (back to the section).
const dialog = document.getElementById("detail-sheet") ?? document.querySelector("[data-sheet]");
if (dialog) {
  const cache = new Map();
  let opener = null;
  let pushed = false;

  const load = (href) => {
    if (!cache.has(href)) {
      cache.set(href, fetch(href).then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      }).then((html) => new DOMParser().parseFromString(html, "text/html")).catch((e) => { cache.delete(href); throw e; }));
    }
    return cache.get(href);
  };

  const hide = () => {
    const finish = () => { dialog.removeAttribute("data-closing"); dialog.close(); opener?.focus(); opener = null; sync(); };
    if (reduceMotion.matches) return finish();
    dialog.setAttribute("data-closing", "");
    dialog.addEventListener("animationend", finish, { once: true });
  };

  const show = async (href, link) => {
    const doc = await load(href);
    const sheet = doc.querySelector("[data-sheet]");
    dialog.innerHTML = sheet.innerHTML;
    dialog.style.setProperty("--i", sheet.style.getPropertyValue("--i"));
    document.title = `${doc.querySelector("h1").textContent} — ${baseTitle.split(" — ")[0]}`;
    initGallery(dialog);
    opener = link ?? opener;
    if (!dialog.open) dialog.showModal();
    scrollInSheet(new URL(href, location.href).hash);
  };

  // A link to an anchor inside the text (contents, #cookie) scrolls the sheet, not the page, and adds no history entry.
  const scrollInSheet = (hash) => {
    const target = hash.length > 1 && dialog.querySelector(`#${CSS.escape(decodeURIComponent(hash.slice(1)))}`);
    if (target) target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    return !!target;
  };

  const close = () => (pushed ? history.back() : hide());

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("[data-detail]");
    if (!link || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || detail) return;
    event.preventDefault();
    show(link.href, link).then(() => { history.pushState(null, "", link.href); pushed = true; }, () => location.assign(link.href));
  });
  ["pointerenter", "focusin"].forEach((type) => document.addEventListener(type, (event) => {
    const link = event.target.closest?.("[data-detail]");
    if (link && !detail) load(link.href).catch(() => {});
  }, true));

  addEventListener("popstate", () => {
    if (detail) return;
    const link = [...document.querySelectorAll("[data-detail]")].find((l) => l.pathname === location.pathname);
    if (link && dialog.open) return;
    if (link) { pushed = true; show(link.href, link).catch(() => location.reload()); }
    else if (dialog.open) { pushed = false; hide(); }
  });

  dialog.addEventListener("cancel", (event) => { event.preventDefault(); detail ? location.assign(dialog.querySelector(".sheet__close").href) : close(); });
  dialog.addEventListener("click", (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor && !event.defaultPrevented && scrollInSheet(anchor.hash)) return event.preventDefault();
    const close_ = event.target.closest(".sheet__close");
    if (close_ && !detail) { event.preventDefault(); close(); }
    // A click on the backdrop lands on the dialog itself.
    else if (event.target === dialog) detail ? location.assign(dialog.querySelector(".sheet__close").href) : close();
  });

  if (detail) { dialog.close(); dialog.showModal(); }
}
