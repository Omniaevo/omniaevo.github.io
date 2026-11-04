// Site enhancements. The site works without this file.
// For now: the Contacts button of the first strip and the bottom sheet with the full text of an area card
// on touch devices.
// (Accordion and detail sheet come in plan steps 8 and 10; this file replaces nav.js.)

document.documentElement.classList.add("js");

// Contacts button: if the first section is closed, open it first and wait for the strip animation to end,
// then scroll to the contacts block (smooth, instant with reduced motion). Without JS the link still jumps.
document.querySelector(".strip__contact")?.addEventListener("click", (event) => {
  const target = document.getElementById("contatti");
  const section = document.getElementById("omniaevo");
  if (!target || !section) return;
  event.preventDefault();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
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
