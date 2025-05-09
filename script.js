// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initLoaderRemoval();
  initMenuToggle();
  initSmoothScrolling();
});

// Remove loader when all resources are loaded
function initLoaderRemoval() {
  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
      // Fade out the loader
      loader.style.opacity = "0";
      // Remove from DOM after transition
      setTimeout(() => {
        loader.style.display = "none";
      }, 300);
    }
  });
}

// Toggle navigation menu with accessibility support
function initMenuToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".glass-nav");

  // Exit if elements don't exist
  if (!menuToggle || !nav) {
    console.error("Menu toggle or navigation elements not found");
    return;
  }

  // Set initial ARIA states
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-controls", "navigation");

  // Ensure nav has an ID for ARIA reference
  if (!nav.id) {
    nav.id = "navigation";
  }

  // Toggle menu when clicking the menu button
  menuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Toggle active class
    nav.classList.toggle("active");

    // Update ARIA expanded state
    const isExpanded = nav.classList.contains("active");
    this.setAttribute("aria-expanded", isExpanded ? "true" : "false");

    // Log state for debugging
    console.log("Nav menu toggled. Active:", isExpanded);
  });

  // Close menu when clicking on any menu item
  const menuItems = nav.querySelectorAll("a");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      closeNavMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener(
    "click",
    (e) => {
      if (
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        e.target !== menuToggle
      ) {
        closeNavMenu();
      }
    },
    { passive: true }
  );

  // Close menu when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      closeNavMenu();
    }
  });
}

// Function to close the navigation menu
function closeNavMenu() {
  const nav = document.querySelector(".glass-nav");
  const menuToggle = document.querySelector(".menu-toggle");

  if (nav && nav.classList.contains("active")) {
    nav.classList.remove("active");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }
}

// Implement smooth scrolling for anchor links
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll("a[href^='#']:not([href='#'])");

  anchorLinks.forEach((anchorLink) => {
    anchorLink.addEventListener("click", function (e) {
      // Get the target element
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      // Check if the target element exists
      if (targetElement) {
        e.preventDefault(); // Prevent default anchor click behavior

        // Close the navigation menu when a link is clicked
        closeNavMenu();

        // Get the navigation height for offset calculation
        const nav = document.querySelector(".glass-nav");
        const navHeight = nav ? nav.offsetHeight : 0;

        // Calculate target position with offset
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navHeight;

        // Scroll to the target position
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL without refreshing the page
        history.pushState(null, null, this.getAttribute("href"));

        // Set focus to the target for accessibility
        targetElement.setAttribute("tabindex", "-1");
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}
