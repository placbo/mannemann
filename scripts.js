// @ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");

  if (!container) {
    return;
  }

  const sections = document.querySelectorAll(".section");
  let currentSectionIndex = 0;
  let isScrolling = false;
  const scrollCooldown = 1000; //ms

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      const targetSection = sections[index];
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
      currentSectionIndex = index;
      if (currentSectionIndex === 5) {
        const scrollIndicator = document.querySelector(".scroll-indicator");
        if (scrollIndicator) {
          scrollIndicator.style.transition = "opacity 0.5s";
          scrollIndicator.style.opacity = "0";
          setTimeout(() => {
            scrollIndicator.style.display = "none";
            scrollIndicator.style.opacity = "1"; // reset for next time
          }, 500);
        }
      } else {
        const scrollIndicator = document.querySelector(".scroll-indicator");
        if (scrollIndicator) {
          scrollIndicator.style.display = "flex";
        }
      }
    }
  }

  function scrollToNext() {
    if (currentSectionIndex < sections.length - 1) {
      scrollToSection(currentSectionIndex + 1);
    }
  }

  function scrollToPrevious() {
    if (currentSectionIndex > 0) {
      scrollToSection(currentSectionIndex - 1);
    }
  }

  container.addEventListener(
    "wheel",
    function (e) {
      // Handle both vertical and horizontal scroll
      if (e.deltaY !== 0 || e.deltaX !== 0) {
        // Prevent rapid scrolling with cooldown
        if (isScrolling) {
          e.preventDefault();
          return;
        }

        e.preventDefault();

        isScrolling = true;

        // Prioritize vertical scroll, but also handle horizontal
        const scrollDirection = e.deltaY !== 0 ? e.deltaY : e.deltaX;

        if (scrollDirection > 0) {
          scrollToNext();
        } else {
          scrollToPrevious();
        }

        // Reset scrolling flag after cooldown
        setTimeout(() => {
          isScrolling = false;
        }, scrollCooldown);
      }
    },
    { passive: false }
  );
  window.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        scrollToPrevious();
        break;
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
        e.preventDefault();
        scrollToNext();
        break;
      case "Home":
        e.preventDefault();
        scrollToSection(0);
        break;
      case "End":
        e.preventDefault();
        scrollToSection(sections.length - 1);
        break;
    }
  });

  window.scrollToSection = scrollToSection;
  window.scrollToNext = scrollToNext;
  window.scrollToPrevious = scrollToPrevious;
});

// Show the alert modal on page load
//document.addEventListener("DOMContentLoaded", function () {});

function handleScrollIndictorClick() {
  var modal = document.getElementById("alert-modal");
  var closeBtn = document.getElementById("alert-modal-close");
  if (modal) {
    modal.style.display = "flex";
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }
}

function handleAudioPlay() {
  const audio = document.getElementById("bakgrunnslyd");
  const audioControl = document.getElementById("audio-control");

  if (audio && audioControl) {
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          // Hide the button after successful play
          audioControl.classList.add("hidden");
        })
        .catch((error) => {
          console.log("Audio play failed:", error);
        });
    }
  }
}

// Check if audio autoplay was blocked and show button if needed
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("bakgrunnslyd");
  const audioControl = document.getElementById("audio-control");

  if (audio && audioControl) {
    // Initially hide the button
    audioControl.style.display = "none";

    // Check if autoplay worked
    setTimeout(() => {
      if (audio.paused) {
        // Autoplay was blocked, show the button
        audioControl.style.display = "flex";
      }
    }, 1000);

    // Also listen for when audio starts playing to hide button
    audio.addEventListener("play", () => {
      audioControl.classList.add("hidden");
    });
  }
});
