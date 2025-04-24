document.addEventListener("DOMContentLoaded", () => {
  // initialize scrolling progress indicator
  initscrollProgressIndicator();
  // initialize scroll reveal animations
  initScrollReveal();
  // initialize scroll to top button
  initScrollToTopButton();
});

// Function to initialize the scroll progress indicator
function initscrollProgressIndicator() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.appendChild(progressBar);
  // update the progress bar width on scroll
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
}
// Function to initialize scroll reveal animations
function initScrollReveal() {
  const scrollReveal = ScrollReveal({
    distance: "50px",
    duration: 1000,
    easing: "ease-in-out",
    interval: 200,
    reset: false,
    mobile: true,
    viewFactor: 0.2,
  });

  // Elements with reveal class (if you have any)
  scrollReveal.reveal(".reveal", { origin: "bottom" });

  // Target specific elements by their existing classes

  // Hero section
  scrollReveal.reveal(".hero-content", {
    origin: "left",
    delay: 300,
  });
  scrollReveal.reveal(".hero-image-container", {
    origin: "right",
    delay: 500,
  });

  // Section titles
  scrollReveal.reveal(".section-title", {
    origin: "top",
    distance: "20px",
  });

  // Project section
  scrollReveal.reveal(".project-card", {
    origin: "bottom",
    interval: 200, // Staggered effect
  });

  // Skills section
  scrollReveal.reveal(".skill-card", {
    origin: "bottom",
    interval: 150,
  });

  // About section
  scrollReveal.reveal(".about-content", {
    origin: "left",
  });
  scrollReveal.reveal(".about-image", {
    origin: "right",
  });

  // Contact section
  scrollReveal.reveal(".contact-form", {
    origin: "bottom",
  });
  scrollReveal.reveal(".social-links a", {
    origin: "top",
    interval: 100,
  });

  // Footer
  scrollReveal.reveal("footer", {
    origin: "bottom",
    distance: "20px",
  });
}

// Function to initialize scroll to top button
function initScrollToTopButton() {
  // Create the button element
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.className = "scroll-to-top-btn";
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top of page");
  scrollToTopBtn.setAttribute("title", "Scroll to top");

  // Add the arrow icon
  scrollToTopBtn.innerHTML = "↑";

  // Add the button to the DOM
  document.body.appendChild(scrollToTopBtn);

  // Initial state - hidden
  scrollToTopBtn.style.display = "none";

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    // Show button when scrolled down more than 300px
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.classList.remove("visible");
      // Use setTimeout to allow for fade-out animation before hiding
      setTimeout(() => {
        if (!scrollToTopBtn.classList.contains("visible")) {
          scrollToTopBtn.style.display = "none";
        }
      }, 300); // Match this to your CSS transition time
    }
  });

  // Scroll to top with smooth animation when clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
