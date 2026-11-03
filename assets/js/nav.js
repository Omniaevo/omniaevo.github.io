// Navigation enhancements. The site works without this file.

// 1. Close the mobile panel when one of its links is used
//    (needed for anchors on the same page, where the page does not change).
const panel = document.getElementById("menu-panel");
panel?.addEventListener("click", (event) => {
  if (event.target.closest("a")) panel.hidePopover();
});

// 2. Scrollspy on the home page, where menu items are anchors (/#contatti):
//    mark the menu item of the section in view with aria-current.
const tracked = [...document.querySelectorAll(".main-nav a, .menu-panel__nav a")]
  .map((link) => {
    const url = new URL(link.href);
    const section = url.pathname === location.pathname && url.hash ? document.getElementById(url.hash.slice(1)) : null;
    return { link, section };
  })
  .filter((item) => item.section);

if (tracked.length) {
  // Every section counts, so a section without a menu item clears the highlight.
  const sections = [...document.querySelectorAll("main section[id]")];
  const header = document.querySelector(".site-header");

  const update = () => {
    const line = header.offsetHeight + window.innerHeight / 3;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let active = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) active = section;
    }
    if (atBottom) active = sections.reduce((last, s) => (s.offsetTop > last.offsetTop ? s : last));
    for (const { link, section } of tracked) {
      if (section === active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
  };

  let queued = false;
  window.addEventListener(
    "scroll",
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    },
    { passive: true },
  );
  window.addEventListener("resize", update);
  update();
}
