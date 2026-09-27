import quotes from "../data/quotes.json";

(function () {
  const secretCodes = ["f1", "leclerc", "fsae", "pits"];
  const messages = quotes;

  let cleanup;

  function initEasterEgg() {
    const widget = document.getElementById("pit-radio-widget");
    const msgEl = document.getElementById("pit-radio-message");
    const closeBtn = document.getElementById("close-pit-radio");
    const spaceBtn = document.getElementById("pit-space-button");
    const logoLink = document.getElementById("footer-logo-text");
    const eyebrowLink = document.getElementById("hero-eyebrow-text");

    if (!widget || !msgEl || !closeBtn || !spaceBtn) return;

    let isWidgetOpen = false;
    let tapCount = 0;
    let lastTapTime = 0;
    let keyBuffer = "";

    const getRandomMessage = () =>
      messages[Math.floor(Math.random() * messages.length)];

    const openRadioFeed = () => {
      if (isWidgetOpen) return;
      msgEl.textContent = getRandomMessage();
      widget.classList.add("active");
      isWidgetOpen = true;
    };

    const closeRadioFeed = () => {
      widget.classList.remove("active");
      isWidgetOpen = false;
    };

    const cycleMessage = () => {
      msgEl.textContent = getRandomMessage();
    };

    const handleTyping = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 20) {
        keyBuffer = keyBuffer.slice(-20);
      }

      for (const code of secretCodes) {
        if (keyBuffer.endsWith(code)) {
          openRadioFeed();
          keyBuffer = "";
          break;
        }
      }
    };

    const handleLogoTap = () => {
      const now = Date.now();
      if (now - lastTapTime > 1500) {
        tapCount = 1;
      } else {
        tapCount++;
      }
      lastTapTime = now;

      if (tapCount >= 5) {
        openRadioFeed();
        tapCount = 0;
      }
    };

    const handleSpacebar = (e) => {
      if (isWidgetOpen && e.code === "Space") {
        e.preventDefault();
        cycleMessage();
      }
    };

    window.addEventListener("keydown", handleTyping);
    window.addEventListener("keydown", handleSpacebar);
    if (logoLink) logoLink.addEventListener("click", handleLogoTap);
    if (eyebrowLink) eyebrowLink.addEventListener("click", handleLogoTap);
    closeBtn.addEventListener("click", closeRadioFeed);
    spaceBtn.addEventListener("click", cycleMessage);

    return () => {
      window.removeEventListener("keydown", handleTyping);
      window.removeEventListener("keydown", handleSpacebar);
      if (logoLink) logoLink.removeEventListener("click", handleLogoTap);
      if (eyebrowLink)
        eyebrowLink.removeEventListener("click", handleLogoTap);
      closeBtn.removeEventListener("click", closeRadioFeed);
      spaceBtn.removeEventListener("click", cycleMessage);
    };
  }

  document.addEventListener("astro:page-load", () => {
    if (cleanup) cleanup();
    cleanup = initEasterEgg();
  });
})();
