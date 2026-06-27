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

              if (isCompleted) {
                dot.classList.remove(
                  "border-gray-300",
                  "dark:border-gray-600",
                  "bg-white",
                  "dark:bg-gray-800",
                );
                dot.classList.add("bg-space-red", "border-space-red");

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
                    line.classList.remove("bg-gray-300", "dark:bg-gray-600");
                    line.classList.add("bg-space-red");
                  } else {
                    line.classList.remove("bg-gray-300", "dark:bg-gray-600");
                    line.classList.add(
                      "bg-gradient-to-b",
                      "from-space-red",
                      "to-gray-300",
                      "dark:to-gray-600",
                    );
                  }
                }
              } else {
                dot.classList.remove("bg-space-red", "border-space-red");
                dot.classList.add(
                  "border-gray-300",
                  "dark:border-gray-600",
                  "bg-white",
                  "dark:bg-gray-800",
                );

                if (line) {
                  line.classList.remove(
                    "bg-space-red",
                    "bg-gradient-to-b",
                    "from-space-red",
                    "to-gray-300",
                    "dark:to-gray-600",
                  );
                  line.classList.add("bg-gray-300", "dark:bg-gray-600");
                }
              }
            });
          }

          initTimeline();

          document.addEventListener("swup:content:replace", initTimeline);
          document.addEventListener("astro:page-load", initTimeline);
