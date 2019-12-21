const slider = document.querySelector("#slider-1");

if (slider) {
  const tabs = slider.querySelectorAll(".tab");
  const items = slider.querySelectorAll(".item");
  tabs.forEach(tab => {
    tab.addEventListener("click", function(e) {
      e.preventDefault();
      tabs.forEach(tab => {
        if (tab.classList.contains("active") && tab != e.target.parentNode) {
          tab.classList.remove("active");
        }
      });
      items.forEach(item => {
        if (tab.dataset.id === item.getAttribute("id")) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      if (!tab.classList.contains("active")) {
        tab.classList.add("active");
      }
    });
  });
}
