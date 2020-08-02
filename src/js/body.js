import anime from "animejs/lib/anime.es.js";
import tippy from "tippy.js";
import Swiper, { Pagination, Autoplay } from "swiper";

window.onscroll = function () {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
    height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight,
    scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
};

// https://tobiasahlin.com/moving-letters/

const textAnimationFast = document.querySelector("#text-animation-fast .inner"),
  textAnimationBeautiful = document.querySelector(
    "#text-animation-beautiful .inner"
  ),
  textAnimationScalable = document.querySelector(
    "#text-animation-scalable .inner"
  ),
  textAnimationOptimized = document.querySelector(
    "#text-animation-optimized .inner"
  );

const animateFastText = () => {
  anime({
    targets: textAnimationFast,

    keyframes: [
      {
        delay: 500,
        translateX: [-70, 0],
        opacity: [0, 1],
        duration: 300,
        easing: "easeInOutCubic",
      },
      {
        delay: 1000,
        translateX: [0, 70],
        opacity: [1, 0],
        duration: 300,
        easing: "easeInOutCubic",
      },
    ],
    complete: function () {
      textAnimationFast.removeAttribute("style");
      textAnimationFast.classList.add("opacity-0");
      animateBeautifulText();
    },
  });
};
const animateBeautifulText = () => {
  textAnimationBeautiful.innerHTML = textAnimationBeautiful.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );
  let letters = textAnimationBeautiful.querySelectorAll(".letter");

  anime
    .timeline({
      complete: function () {
        textAnimationBeautiful.removeAttribute("style");
        animateScalableText();
      },
    })
    .add({
      targets: textAnimationBeautiful,
      opacity: [0, 1],
      delay: 0,
      duration: 100,
      easing: "easeInOutCubic",
    })
    .add({
      targets: letters,
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 700,
      delay: (el, i) => 100 + 30 * i,
    })
    .add({
      targets: letters,
      translateX: [0, -30],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 700,
      delay: (el, i) => 100 + 30 * i,
    });
};
const animateScalableText = () => {
  textAnimationScalable.innerHTML = textAnimationScalable.textContent.replace(
    /\S/g,
    "<span class='letter inline-block'>$&</span>"
  );
  let letters = textAnimationScalable.querySelectorAll(".letter");
  anime
    .timeline({
      complete: function () {
        textAnimationScalable.removeAttribute("style");
        // animateOptimizedText();
      },
    })
    .add({
      targets: textAnimationScalable,
      duration: 500,
      opacity: [0, 1],
      easing: "easeInOutCubic",
    })
    .add({
      targets: textAnimationScalable,
      delay: 500,
      duration: 500,
      easing: "easeOutElastic(1, .8)",
      letterSpacing: ["0", "10px"],
      translateX: [0, 5],
    })
    .add({
      targets: letters,
      translateY: [0, -50],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 1200,
      delay: (el, i) => 0 + 30 * i,
      changeBegin: function () {
        animateOptimizedText();
      },
    });
};
const animateOptimizedText = () => {
  textAnimationOptimized.innerHTML = textAnimationOptimized.textContent.replace(
    /\S/g,
    "<span class='letter inline-block'>$&</span>"
  );
  let letters = textAnimationOptimized.querySelectorAll(".letter");
  anime
    .timeline({
      complete: function () {
        textAnimationOptimized.removeAttribute("style");
        animateFastText();
      },
    })
    .add({
      targets: textAnimationOptimized,
      duration: 0,
      opacity: [0, 1],
      letterSpacing: ["0", "10px"],
      translateX: [0, 5],
      delay: 0,
      // easing: "easeInOutCubic",
    })
    .add({
      targets: letters,
      translateY: [50, 0],
      opacity: [0, 1],
      easing: "easeInExpo",
      duration: 1200,
      delay: (el, i) => 0 + 30 * i,
    })
    .add({
      targets: textAnimationOptimized,
      delay: 500,
      keyframes: [
        {
          letterSpacing: ["10px", "-10px"],
          translateX: [5, 0],
          rotate: "-15deg",
        },
        {
          delay: 500,
          duration: 500,
          opacity: [1, 0],
          easing: "easeInExpo",
        },
      ],
    });
};

tippy("[data-tippy-content]", {
  animation: "shift-away",
  allowHTML: true,
  theme: darkMode().darkMode ? "dark" : "light",
  maxWidth: 300,
  // checking for darkmode and apply scheme
  onTrigger(instance, event) {
    instance.setProps({
      theme: event.target.dataset.tippyTheme,
    });
  },
});

Swiper.use([Pagination, Autoplay]);

const breakpoint = window.matchMedia("(min-width:768px)");
let mySwiper;

const breakpointChecker = function () {
  // if larger viewport and multi-row layout needed
  if (breakpoint.matches === true) {
    // clean up old instances and inline styles when available
    if (mySwiper !== undefined) mySwiper.destroy(true, true);
    // or/and do nothing
    return;
    // else if a small viewport and single column layout needed
  } else if (breakpoint.matches === false) {
    // fire small viewport version of swiper
    return enableSwiper();
  }
};

const enableSwiper = function () {
  mySwiper = new Swiper(".swiper-container", {
    // init: false,
    slidesPerView: 1,
    loop: true,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
    },
  });
};

// keep an eye on viewport size changes
breakpoint.addListener(breakpointChecker);
// kickstart
breakpointChecker();

let anchors = document.querySelectorAll('a[href^="#"]');
for (let i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener("click", function (event) {
    event.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
}

window.addEventListener("DOMContentLoaded", (event) => {
  animateFastText();
});
