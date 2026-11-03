let firstPageH = 0;

$(document).ready(() => {
  $("#year").text(`${new Date().getFullYear()}`);

  firstPageH = $("#privacyPolicy-title").height();
});

$(document).scroll(() => {
  const scrollTop = window.scrollY;

  if (scrollTop <= firstPageH) {
    const headerOpacity =
      scrollTop == 0 ? 0 : Math.min(1, scrollTop / firstPageH);

    $("#header").css({ opacity: headerOpacity });
  } else {
    $("#header").css({ opacity: 1 });
  }
});
