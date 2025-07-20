document.addEventListener("DOMContentLoaded", () => {
  // Código para o Carrossel
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector(".next-button");
    const prevButton = carousel.querySelector(".prev-button");

    if (!track || slides.length === 0) return;

    const slideWidth = slides[0].getBoundingClientRect().width;
    const slideMargin =
      parseInt(window.getComputedStyle(slides[0]).marginRight) * 2;
    const totalSlideWidth = slideWidth + slideMargin;

    const moveToSlide = (currentTrack, targetIndex) => {
      const amountToMove = targetIndex * totalSlideWidth;
      currentTrack.style.transform = `translateX(-${amountToMove}px)`;
      currentTrack.dataset.currentIndex = targetIndex;
    };

    const updateArrows = (slidesCount, prevBtn, nextBtn, targetIndex) => {
      prevBtn.classList.toggle("is-hidden", targetIndex === 0);
      nextBtn.classList.toggle("is-hidden", targetIndex === slidesCount - 1);
    };

    nextButton.addEventListener("click", () => {
      const currentIndex = parseInt(track.dataset.currentIndex || 0);
      const nextIndex = currentIndex + 1;
      if (nextIndex < slides.length) {
        moveToSlide(track, nextIndex);
        updateArrows(slides.length, prevButton, nextButton, nextIndex);
      }
    });

    prevButton.addEventListener("click", () => {
      const currentIndex = parseInt(track.dataset.currentIndex || 0);
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        moveToSlide(track, prevIndex);
        updateArrows(slides.length, prevButton, nextButton, prevIndex);
      }
    });

    track.dataset.currentIndex = 0;
    updateArrows(slides.length, prevButton, nextButton, 0);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Código para o Menu Hambúrguer
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksMobile = document.querySelector('.nav-links-mobile');

  if (menuToggle && navLinksMobile) {
    menuToggle.addEventListener('click', () => {
      navLinksMobile.classList.toggle('show');
    });
  }
});