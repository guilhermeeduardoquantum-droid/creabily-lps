/**
 * FAQ accordion suave — Clínica Creabily
 * <details>/<summary> nativos (semântica e fallback sem JS), com abertura/
 * fechamento animados via max-height (JS puro, sem bibliotecas). O ícone
 * "+"/"×" continua sendo resolvido em CSS (components.css) a partir do
 * atributo [open].
 *
 * Uso: incluir no fim do <body>, depois de shared/components/scroll-reveal.js.
 */
(function () {
  var items = document.querySelectorAll(".faq-item");

  items.forEach(function (item) {
    var summary = item.querySelector(".faq-item__question");
    var answer = item.querySelector(".faq-item__answer");
    if (!summary || !answer) return;

    answer.style.overflow = "hidden";
    answer.style.transition = "max-height 0.3s ease";
    answer.style.maxHeight = item.hasAttribute("open")
      ? answer.scrollHeight + "px"
      : "0px";

    summary.addEventListener("click", function (e) {
      e.preventDefault();

      if (item.hasAttribute("open")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        window.requestAnimationFrame(function () {
          answer.style.maxHeight = "0px";
        });
        answer.addEventListener(
          "transitionend",
          function handler() {
            item.removeAttribute("open");
            answer.removeEventListener("transitionend", handler);
          },
          { once: true }
        );
      } else {
        item.setAttribute("open", "");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });

    window.addEventListener("resize", function () {
      if (item.hasAttribute("open")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
})();
