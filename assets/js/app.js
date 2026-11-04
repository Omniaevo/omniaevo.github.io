// Site enhancements. The site works without this file.
// For now: the bottom sheet with the full text of an area card on touch devices.
// (Accordion and detail sheet come in plan steps 8 and 10; this file replaces nav.js.)

document.documentElement.classList.add("js");

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
