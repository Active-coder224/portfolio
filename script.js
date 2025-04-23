// Simple loader removal
window.addEventListener("load", () => {
  document.querySelector(".loader").style.display = "none";
});

document.querySelector(".menu-toggle").addEventListener("click", function () {
  const nav = document.querySelector(".glass-nav");
  nav.classList.toggle("active");
});
// Add smooth scrolling for all anchor links
const link = document.querySelectorAll("a[href^='#']:not([href='#'])");
link.forEach((link) => {
  link.addEventListener("click", function (e) {
    // get the target element
    const targetId = this.getAttribute("href").split("#")[1];
    const targetElement = document.getElementById(targetId);
    // check if the target element exists
    if (targetElement) {
      e.preventDefault(); // prevent default anchor click behavior
      // Get the target position with offset for glass-nav
      const navHeight = document.querySelector(".glass-nav").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
      // Scroll to the target position
      // Use window.scrollTo for smooth scrolling
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      // Update URL without refreshing the page
      history.pushState(null, null, this.getAttribute("href"));
    }
  });
});
