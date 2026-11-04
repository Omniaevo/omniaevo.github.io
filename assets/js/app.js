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
  const label = open?.querySelector(".strip__label").textContent;
  document.title = open && open !== wraps[0] ? `${label} — ${baseTitle.split(" — ")[0]}` : baseTitle;
};

// A hash that points inside a panel: scroll the panel to it (not the page), once the section has opened.
const scrollToInner = () => {
  const target = hashTarget();
  if (!target || target.classList.contains("panel-wrap")) return;
  setTimeout(() => target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" }), reduceMotion.matches ? 0 : 400);
};

// hashchange also fires for back and forward, so it covers the browser history.
addEventListener("hashchange", () => { sync(); scrollToInner(); });
sync();
scrollToInner();

// Contacts button: if the first section is closed, open it first and wait for the strip animation to end,
// then scroll to the contacts block (smooth, instant with reduced motion). Without JS the link still jumps.
document.querySelector(".strip__contact")?.addEventListener("click", (event) => {
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
