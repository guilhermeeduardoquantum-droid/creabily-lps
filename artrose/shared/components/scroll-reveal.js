/**
 * Animações de entrada ao scroll — Clínica Creabily
 * IntersectionObserver puro (sem AOS/GSAP). Anima cada elemento uma única
 * vez, aplica stagger dentro de grupos e conta números (contadores).
 * Respeita prefers-reduced-motion mostrando tudo direto, sem animar.
 *
 * Uso:
 *   <div data-reveal-group data-reveal-stagger="150">
 *     <div class="card" data-reveal="fade-up">...</div>
 *     <div class="card" data-reveal="fade-up">...</div>
 *   </div>
 *
 *   <span data-reveal="counter" data-counter-target="15" data-counter-prefix="+">0</span>
 *
 * Incluir depois de shared/styles/animations.css e antes de </body>.
 */
(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function getCounterTarget(el) {
    return parseFloat(el.getAttribute("data-counter-target") || "0");
  }

  function setCounterValue(el, value) {
    var prefix = el.getAttribute("data-counter-prefix") || "";
    var suffix = el.getAttribute("data-counter-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-counter-decimals") || "0", 10);
    el.textContent = prefix + value.toFixed(decimals) + suffix;
  }

  function animateCounter(el) {
    var target = getCounterTarget(el);
    var duration = 2000;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      setCounterValue(el, target * eased);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCounterValue(el, target);
      }
    }

    window.requestAnimationFrame(step);
  }

  function revealImmediately(el) {
    el.classList.add("is-visible");
    if (el.hasAttribute("data-counter-target")) {
      setCounterValue(el, getCounterTarget(el));
    }
  }

  function applyStagger() {
    var groups = document.querySelectorAll("[data-reveal-group]");
    groups.forEach(function (group) {
      var stagger = parseInt(group.getAttribute("data-reveal-stagger") || "0", 10);
      if (!stagger) return;
      var items = group.querySelectorAll("[data-reveal]");
      items.forEach(function (item, index) {
        item.style.transitionDelay = index * stagger + "ms";
      });
    });
  }

  function init() {
    var elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach(revealImmediately);
      return;
    }

    applyStagger();

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          el.classList.add("is-visible");
          if (el.hasAttribute("data-counter-target")) {
            animateCounter(el);
          }
          obs.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
