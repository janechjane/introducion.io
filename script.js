AOS.init();

// swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll(".fade-in");

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function fadeInOutOnScroll() {
    var windowHeight = window.innerHeight;
    items.forEach(function (item) {
      var rect = item.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= windowHeight) {
        if (!item.classList.contains("show")) {
          item.classList.add("show");
          wrapLetters(item);
        }
      } else {
        item.classList.remove("show");
      }
    });
  }

  var debouncedFadeInOutOnScroll = debounce(fadeInOutOnScroll, 10);
  window.addEventListener("scroll", debouncedFadeInOutOnScroll);
  window.addEventListener("resize", debouncedFadeInOutOnScroll);
  fadeInOutOnScroll();

  function wrapLetters(element) {
    const selectors = ['.item_cate'];

    function animateLetter(span, index) {
      return new Promise(resolve => {
        setTimeout(() => {
          span.classList.remove('behind');
          span.classList.add('in');
          resolve();
        }, 100 * index);
      });
    }

    async function wrapAndAnimateText(el) {
      const text = el.textContent;
      el.setAttribute('data-original-text', text);
      el.innerHTML = '';
      const promises = text.split('').map((char, index) => {
        const span = document.createElement('span');
        span.classList.add('letter', 'behind');
        span.textContent = char;
        el.appendChild(span);
        return animateLetter(span, index);
      });
      await Promise.all(promises);
    }

    async function processElements() {
      for (const selector of selectors) {
        const elements = element.querySelectorAll(selector);
        for (const el of elements) {
          await wrapAndAnimateText(el);
        }
      }
      setTimeout(() => {
        selectors.forEach(selector => {
          const elements = element.querySelectorAll(selector);
          elements.forEach(el => {
            el.innerHTML = el.getAttribute('data-original-text');
          });
        });
      }, 1000);
    }

    processElements();
  }
});