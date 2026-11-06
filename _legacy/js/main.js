const oeStartDuration = 1500;

let prevScroll = 0;
let firstPageH = 0;
let headerH = 0;

$(document).ready(() => {
  $("#year").text(`${new Date().getFullYear()}`);

  headerH = $("#header").height();
  firstPageH = $("#first-page").height() - headerH - 10;

  $("#oe-circle").animate({ opacity: 1 }, { duration: oeStartDuration });
  $("#nav-pills").animate({ right: "4em" }, { duration: oeStartDuration * 0.8 });
  $(".oe-round-pill").animate(
    { opacity: 1 },
    { duration: oeStartDuration * 1.8 }
  );
  $(".unloaded").each((_, element) => {
    $(element)
      .delay(oeStartDuration)
      .queue((next) => {
        $(element).removeClass("unloaded");
        $(element).addClass("loaded");
        next();
      });
  });
});

$(document).scroll(() => {
  const scrollTop = window.scrollY;

  if (scrollTop <= firstPageH) {
    const headerOpacity =
      scrollTop == 0 ? 0 : Math.min(1, scrollTop / firstPageH);
    const circleScale = 1 - headerOpacity;

    $("#header").css({ opacity: headerOpacity });
    $("#oe-nav").css({ top: `-${50 * circleScale}vw` });
    $("#oe-circle").css({ transform: `scale(${circleScale})` });
    $("#motivational").css({ opacity: circleScale });
  } else {
    $("#header").css({ opacity: 1 });
    $("#oe-nav").css({ top: 0 });
    $("#oe-circle").css({ transform: `scale(${0})` });
    $("#motivational").css({ opacity: 0 });
  }

  $("section").each((i, element) => {
    const topOfElement = $(element).offset().top;
    const botOfElement = topOfElement + $(element).height();

    const normalizedScrollDown = topOfElement - scrollTop;
    const normalizedScrollUp = botOfElement - scrollTop;
    const halfScreen = window.innerHeight / 2;

    if (scrollTop > prevScroll) {
      if (normalizedScrollDown >= 0 && normalizedScrollDown <= halfScreen) {
        $(".oe-pill").removeClass("active-pill");
        $($(".oe-pill")[i]).addClass("active-pill");
      }
    } else {
      if (
        normalizedScrollUp >= halfScreen &&
        normalizedScrollUp <= window.innerHeight
      ) {
        $(".oe-pill").removeClass("active-pill");
        $($(".oe-pill")[i]).addClass("active-pill");
      }
    }
  });

  prevScroll = scrollTop;
});
