function initTimeline() {
  const items = document.querySelectorAll(".timeline-item");
  if (items.length === 0) return;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  items.forEach((item, index) => {
    const dateStr = item.getAttribute("data-date");
    if (!dateStr) return;

    const [year, month] = dateStr.split("-").map(Number);

    const isCompleted =
      currentYear > year ||
      (currentYear === year && currentMonth >= month - 1);

    const dot = item.querySelector(".timeline-dot");
    const line = item.querySelector(".timeline-line");
    const isLast = index === items.length - 1;

    if (isLast) {
      if (line) line.style.display = "none";
      item.classList.remove("pb-8", "pb-10", "pb-12", "pb-14");
      item.style.paddingBottom = "0px";
    }

    if (isCompleted) {
      if (dot) {
        dot.className =
          "absolute -left-[32px] top-1.5 h-4 w-4 rounded-full border-2 border-space-red bg-space-red dark:border-space-yellow dark:bg-space-yellow timeline-dot transition-all duration-300 shadow-[0_0_8px_rgba(227,30,36,0.4)] dark:shadow-[0_0_10px_rgba(255,64,70,0.5)]";
      }

      if (line) {
        const nextItem = items[index + 1];
        let nextCompleted = false;
        if (nextItem) {
          const nextDateStr = nextItem.getAttribute("data-date");
          if (nextDateStr) {
            const [ny, nm] = nextDateStr.split("-").map(Number);
            nextCompleted =
              currentYear > ny ||
              (currentYear === ny && currentMonth >= nm - 1);
          }
        }

        if (nextCompleted) {
          line.className =
            "absolute left-[-26px] top-1.5 bottom-0 w-1 bg-space-red dark:bg-space-yellow timeline-line";
        } else {
          line.className =
            "absolute left-[-26px] top-1.5 bottom-0 w-1 bg-gradient-to-b from-space-red to-neutral-300 dark:from-space-yellow dark:to-neutral-700 timeline-line";
        }
      }
    } else {
      if (dot) {
        dot.className =
          "absolute -left-[32px] top-1.5 h-4 w-4 rounded-full border-2 border-neutral-300 bg-white dark:border-neutral-400 dark:bg-neutral-900 timeline-dot transition-all duration-300";
      }

      if (line) {
        line.className =
          "absolute left-[-26px] top-1.5 bottom-0 w-1 bg-neutral-300 dark:bg-neutral-700 timeline-line";
      }
    }
  });
}

initTimeline();

document.addEventListener("swup:content:replace", initTimeline);
document.addEventListener("astro:page-load", initTimeline);
