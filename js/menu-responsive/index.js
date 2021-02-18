const menuResponsive = document.querySelector(".menu-responsive");

menuResponsive.addEventListener("click", function () {
  menuResponsive
    .querySelector(".menu-responsive-first-bar")
    .classList.toggle("first-bar-close");
  menuResponsive
    .querySelector(".menu-responsive-third-bar")
    .classList.toggle("third-bar-close");
  menuResponsive
    .querySelector(".menu-responsive-second-bar")
    .classList.toggle("second-bar-close");
  document
    .querySelector(".menu-mobile-list")
    .classList.toggle("show-menu-mobile");
});
