/**
 * Botão WhatsApp flutuante (mobile-first).
 *
 * Uso: incluir no fim do <body> de cada LP, com o telefone e a mensagem
 * pré-preenchida via data-attributes no próprio <script>:
 *
 *   <script
 *     src="/shared/components/whatsapp-sticky.js"
 *     data-phone="5511914429741"
 *     data-message="Olá! Gostaria de agendar uma avaliação de Acupuntura."
 *   ></script>
 */
(function () {
  var currentScript = document.currentScript;
  if (!currentScript) return;

  var phone = currentScript.getAttribute("data-phone");
  var message = currentScript.getAttribute("data-message") || "";

  if (!phone) {
    console.warn("[whatsapp-sticky] data-phone não informado.");
    return;
  }

  var link = document.createElement("a");
  link.className = "wa-sticky";
  link.href =
    "https://api.whatsapp.com/send/?phone=" +
    encodeURIComponent(phone) +
    "&text=" +
    encodeURIComponent(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", "Falar no WhatsApp");

  link.innerHTML =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 0 1-1.27-4.36c0-4.53 3.7-8.22 8.24-8.22 2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.81c0 4.54-3.7 8.23-8.2 8.23Zm4.51-6.16c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42-.14-.01-.3-.01-.47-.01-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z"/>' +
    "</svg>";

  document.body.appendChild(link);
})();
