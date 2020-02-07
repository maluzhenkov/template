var mySwiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: ".arrow-right"
  },
  breakpoints: {
    540: {
      slidesPerView: 2
    }
  }
});

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

const handlerMenuToggle = () => {
  menuButton.classList.toggle("menu-toggle-active");
  menu.classList.toggle("menu-active");
};

menuButton.addEventListener("click", handlerMenuToggle);

window.onload = function() {
  if (window.innerWidth >= 768) {
    const audio = document.querySelector("audio");
    audio.volume = 0.05;
    const play = document.querySelector(".play");
    play.style.display = "flex";
    play.addEventListener("click", e => {
      const video = document.querySelector(".video");
      play.style.display = "none";
      video.style.visibility = "visible";
      const wrapper = document.querySelector(".wrapper");
      wrapper.style.backgroundImage = "none";
      wrapper.classList.toggle("gradient");
      video.play();
    });
  }
};
