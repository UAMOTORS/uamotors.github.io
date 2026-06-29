let cleanupDewesoft = null;
let cleanupHarness = null;

function initDewesoft() {
  const logos = document.querySelectorAll(
    "#oro-grid img, #plata-grid img, #bronce-grid img, #oro-grid svg, #plata-grid svg, #bronce-grid svg",
  );
  logos.forEach((logo) => {
    logo.style.setProperty("filter", "none", "important");
    logo.offsetHeight;
    logo.style.removeProperty("filter");
  });

  const link = document.getElementById("dewesoft-link");
  const canvas = document.getElementById("daq-canvas");
  if (!link || !canvas) return null;

  const ctx = canvas.getContext("2d");
  let animationId;
  let isAnimating = false;
  let autoStopTimer;
  let pressTimer;
  let isLongPress = false;
  let touchStartX = 0;
  let touchStartY = 0;
  const chars = "01RPMTEMPDAQ0x1F0CANVOLTSPEEDACCEL".split("");
  const fontSize = 18;
  let columns;
  let drops;
  let lastTime = 0;
  const interval = 1000 / 15;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initRain() {
    resizeCanvas();
    columns = Math.floor(window.innerWidth / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -30);
    }
  }

  function draw() {
    const themeColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--space-red')
      .trim() || '#E31E24';

    ctx.fillStyle = document.documentElement.classList.contains("dark")
      ? "rgba(0, 0, 0, 0.08)"
      : "rgba(253, 252, 251, 0.08)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = themeColor;
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    const rect = link.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radiusX = rect.width / 2 + 10;
    const radiusY = rect.height / 2 + 10;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.translate(centerX, centerY);
    ctx.scale(1, radiusY / radiusX);

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radiusX);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, radiusX, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    canvas.style.opacity = "0.35";
    initRain();
    lastTime = 0;
    function loop(timestamp) {
      if (!isAnimating) return;
      const elapsed = timestamp - lastTime;
      if (elapsed > interval) {
        draw();
        lastTime = timestamp - (elapsed % interval);
      }
      animationId = requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  function stopAnimation() {
    if (!isAnimating) return;
    isAnimating = false;
    clearTimeout(autoStopTimer);
    cancelAnimationFrame(animationId);
    canvas.style.opacity = "0";
    setTimeout(() => {
      if (!isAnimating) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    }, 500);
  }

  const handlePointerEnter = (e) => { if (e.pointerType === "mouse") startAnimation(); };
  const handlePointerLeave = (e) => { if (e.pointerType === "mouse") stopAnimation(); };
  const handleTouchStart = (e) => {
    isLongPress = false;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => {
      isLongPress = true;
      startAnimation();
      clearTimeout(autoStopTimer);
      autoStopTimer = setTimeout(stopAnimation, 5000);
    }, 800);
  };
  const handleTouchMove = (e) => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (Math.sqrt(dx * dx + dy * dy) > 10) clearTimeout(pressTimer);
  };
  const handleTouchEnd = (e) => {
    clearTimeout(pressTimer);
    if (isLongPress) e.preventDefault();
  };
  const handleTouchCancel = () => clearTimeout(pressTimer);
  const handleClick = (e) => {
    if (isLongPress) {
      e.preventDefault();
      isLongPress = false;
    }
  };
  const handleWindowClick = (e) => {
    if (isAnimating && e.target !== link && !link.contains(e.target)) {
      stopAnimation();
    }
  };
  const handleWindowResize = () => {
    if (isAnimating) initRain();
  };

  link.addEventListener("pointerenter", handlePointerEnter);
  link.addEventListener("pointerleave", handlePointerLeave);
  link.addEventListener("touchstart", handleTouchStart, { passive: true });
  link.addEventListener("touchmove", handleTouchMove, { passive: true });
  link.addEventListener("touchend", handleTouchEnd, { passive: false });
  link.addEventListener("touchcancel", handleTouchCancel);
  link.addEventListener("click", handleClick);
  window.addEventListener("click", handleWindowClick);
  window.addEventListener("resize", handleWindowResize);

  return () => {
    link.removeEventListener("pointerenter", handlePointerEnter);
    link.removeEventListener("pointerleave", handlePointerLeave);
    link.removeEventListener("touchstart", handleTouchStart);
    link.removeEventListener("touchmove", handleTouchMove);
    link.removeEventListener("touchend", handleTouchEnd);
    link.removeEventListener("touchcancel", handleTouchCancel);
    link.removeEventListener("click", handleClick);
    window.removeEventListener("click", handleWindowClick);
    window.removeEventListener("resize", handleWindowResize);
    stopAnimation();
  };
}

function initHarness() {
  const harnessLink = document.getElementById("harness-link");
  const harnessCanvas = document.getElementById("harness-canvas");
  if (!harnessLink || !harnessCanvas) return null;

  const hCtx = harnessCanvas.getContext("2d");
  let hAnimationId;
  let hIsAnimating = false;
  let hAutoStopTimer;
  let hPressTimer;
  let hIsLongPress = false;
  let hTouchStartX = 0;
  let hTouchStartY = 0;
  let lines = [];
  let intersections = [];
  let collidedPairs = new Set();
  const lineCount = 25;
  const speed = 7;
  let targetBox = null;

  function resizeHarnessCanvas() {
    const dpr = window.devicePixelRatio || 1;
    harnessCanvas.width = window.innerWidth * dpr;
    harnessCanvas.height = window.innerHeight * dpr;
    hCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function generateCustomPath(border, startX, startY, tx, ty) {
    if (border === 0 || border === 2) {
      const midY = startY + (ty - startY) * (0.3 + Math.random() * 0.4);
      return [
        { x: startX, y: startY },
        { x: startX, y: midY },
        { x: tx, y: midY },
        { x: tx, y: ty }
      ];
    } else {
      const midX = startX + (tx - startX) * (0.3 + Math.random() * 0.4);
      return [
        { x: startX, y: startY },
        { x: midX, y: startY },
        { x: midX, y: ty },
        { x: tx, y: ty }
      ];
    }
  }

  function initHarnessLines() {
    resizeHarnessCanvas();
    const logoImg = harnessLink.querySelector("img, svg");
    const rect = logoImg ? logoImg.getBoundingClientRect() : harnessLink.getBoundingClientRect();

    const padding = 36;
    targetBox = {
      left: rect.left - padding,
      right: rect.right + padding,
      top: rect.top - padding,
      bottom: rect.bottom + padding
    };

    const w = window.innerWidth;
    const h = window.innerHeight;

    lines = [];
    intersections = [];
    collidedPairs.clear();
    const isDark = document.documentElement.classList.contains("dark");
    const colors = isDark
      ? ["#40C057", "#7A50F3", "#FB5252", "#FB7E15", "#FCC419"]
      : ["#2f9e44", "#6741d9", "#e03131", "#e8590c", "#f08c00"];

    const mainLines = [];

    for (let i = 0; i < 20; i++) {
      const border = i % 4; 
      const j = Math.floor(i / 4); 
      const color = colors[i % colors.length];

      let startX, startY;
      let tx, ty;

      const boxW = targetBox.right - targetBox.left;
      const boxH = targetBox.bottom - targetBox.top;

      if (border === 0) {
        startX = Math.random() * w;
        startY = -10;
        tx = targetBox.left + (j + 0.5) * boxW / 5;
        ty = targetBox.top;
      } else if (border === 1) {
        startX = w + 10;
        startY = Math.random() * h;
        tx = targetBox.right;
        ty = targetBox.top + (j + 0.5) * boxH / 5;
      } else if (border === 2) {
        startX = Math.random() * w;
        startY = h + 10;
        tx = targetBox.left + (j + 0.5) * boxW / 5;
        ty = targetBox.bottom;
      } else {
        startX = -10;
        startY = Math.random() * h;
        tx = targetBox.left;
        ty = targetBox.top + (j + 0.5) * boxH / 5;
      }

      const path = generateCustomPath(border, startX, startY, tx, ty);

      const lineObj = {
        id: i,
        path: path,
        color: color,
        currentSegment: 0,
        currX: startX,
        currY: startY,
        drawnPoints: [{ x: startX, y: startY }],
        finished: false,
        isSecondary: false,
        border: border
      };
      lines.push(lineObj);
      mainLines.push(lineObj);
    }

    for (let i = 20; i < lineCount; i++) {
      const color = colors[i % colors.length];

      const sameColorMains = mainLines.filter(l => l.color === color);
      const targetMain = sameColorMains[Math.floor(Math.random() * sameColorMains.length)];

      const p1 = targetMain.path[1];
      const p2 = targetMain.path[2];

      const t = 0.2 + Math.random() * 0.6;
      const tx = p1.x + (p2.x - p1.x) * t;
      const ty = p1.y + (p2.y - p1.y) * t;

      const secondaryBorder = targetMain.border;

      let startX, startY;
      if (secondaryBorder === 0) {
        startX = Math.random() * w;
        startY = -10;
      } else if (secondaryBorder === 1) {
        startX = w + 10;
        startY = Math.random() * h;
      } else if (secondaryBorder === 2) {
        startX = Math.random() * w;
        startY = h + 10;
      } else {
        startX = -10;
        startY = Math.random() * h;
      }

      const path = generateCustomPath(secondaryBorder, startX, startY, tx, ty);

      lines.push({
        id: i,
        path: path,
        color: color,
        currentSegment: 0,
        currX: startX,
        currY: startY,
        drawnPoints: [{ x: startX, y: startY }],
        finished: false,
        isSecondary: true
      });
    }
  }

  function checkIntersections() {
    lines.forEach((lineA, indexA) => {
      if (lineA.finished) return;
      const ax = lineA.currX, ay = lineA.currY;
      lines.forEach((lineB, indexB) => {
        if (indexA === indexB || lineA.color !== lineB.color) return;
        const points = [...lineB.drawnPoints];
        if (!lineB.finished) points.push({ x: lineB.currX, y: lineB.currY });

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i], p2 = points[i + 1];
          let intersected = false, ix = 0, iy = 0;
          const isHorizontal = Math.abs(p1.y - p2.y) < 0.1;
          const isVertical = Math.abs(p1.x - p2.x) < 0.1;

          if (isHorizontal) {
            const minX = Math.min(p1.x, p2.x), maxX = Math.max(p1.x, p2.x);
            if (Math.abs(ay - p1.y) < 2 && ax >= minX + 5 && ax <= maxX - 5) {
              intersected = true; ix = ax; iy = p1.y;
            }
          } else if (isVertical) {
            const minY = Math.min(p1.y, p2.y), maxY = Math.max(p1.y, p2.y);
            if (Math.abs(ax - p1.x) < 2 && ay >= minY + 5 && ay <= maxY - 5) {
              intersected = true; ix = p1.x; iy = ay;
            }
          }
          if (intersected) {
            const pairKey = lineA.id < lineB.id ? `${lineA.id}-${lineB.id}` : `${lineB.id}-${lineA.id}`;
            if (!collidedPairs.has(pairKey)) {
              collidedPairs.add(pairKey);
              intersections.push({ x: ix, y: iy, color: lineA.color });
            }
          }
        }
      });
    });
  }

  function updateAndDrawHarness() {
    hCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    checkIntersections();
    let allFinished = true;

    lines.forEach(line => {
      if (!line.finished) {
        allFinished = false;

        if (line.currX >= targetBox.left && line.currX <= targetBox.right &&
          line.currY >= targetBox.top && line.currY <= targetBox.bottom) {
          line.finished = true;
          line.drawnPoints.push({ x: line.currX, y: line.currY });
          return;
        }

        if (line.isSecondary) {
          let collided = false;
          let colX = 0, colY = 0;

          lines.forEach(otherLine => {
            if (otherLine.id === line.id || otherLine.color !== line.color || otherLine.isSecondary) return;

            const points = [...otherLine.drawnPoints];
            if (!otherLine.finished) {
              points.push({ x: otherLine.currX, y: otherLine.currY });
            }

            for (let k = 0; k < points.length - 1; k++) {
              const p1 = points[k];
              const p2 = points[k + 1];
              const isHorizontal = Math.abs(p1.y - p2.y) < 0.1;
              const isVertical = Math.abs(p1.x - p2.x) < 0.1;

              if (isHorizontal) {
                const minX = Math.min(p1.x, p2.x);
                const maxX = Math.max(p1.x, p2.x);
                if (Math.abs(line.currY - p1.y) < 4 && line.currX >= minX && line.currX <= maxX) {
                  collided = true;
                  colX = line.currX;
                  colY = p1.y;
                  break;
                }
              } else if (isVertical) {
                const minY = Math.min(p1.y, p2.y);
                const maxY = Math.max(p1.y, p2.y);
                if (Math.abs(line.currX - p1.x) < 4 && line.currY >= minY && line.currY <= maxY) {
                  collided = true;
                  colX = p1.x;
                  colY = line.currY;
                  break;
                }
              }
            }
            if (collided) return;
          });

          if (collided) {
            line.finished = true;
            line.currX = colX;
            line.currY = colY;
            line.drawnPoints.push({ x: colX, y: colY });
            return;
          }
        }

        const targetNode = line.path[line.currentSegment + 1];
        if (targetNode) {
          const dx = targetNode.x - line.currX;
          const dy = targetNode.y - line.currY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= speed) {
            line.currX = targetNode.x; line.currY = targetNode.y;
            line.drawnPoints.push({ x: line.currX, y: line.currY });
            line.currentSegment++;
            if (line.currentSegment >= line.path.length - 1) line.finished = true;
          } else {
            line.currX += (dx / distance) * speed;
            line.currY += (dy / distance) * speed;
          }
        } else {
          line.finished = true;
        }
      }

      hCtx.beginPath();
      hCtx.moveTo(line.drawnPoints[0].x, line.drawnPoints[0].y);
      for (let p = 1; p < line.drawnPoints.length; p++) hCtx.lineTo(line.drawnPoints[p].x, line.drawnPoints[p].y);
      if (!line.finished) hCtx.lineTo(line.currX, line.currY);

      hCtx.strokeStyle = line.color;
      hCtx.lineWidth = 2.5;
      hCtx.lineCap = "round";
      hCtx.lineJoin = "round";
      hCtx.stroke();

      if (line.finished && line.drawnPoints.length > 0) {
        const lastPoint = line.drawnPoints[line.drawnPoints.length - 1];
        hCtx.beginPath();
        hCtx.arc(lastPoint.x, lastPoint.y, 4, 0, 2 * Math.PI);
        hCtx.fillStyle = line.color;
        hCtx.fill();
      }
    });

    intersections.forEach(pt => {
      hCtx.beginPath();
      hCtx.arc(pt.x, pt.y, 3.5, 0, 2 * Math.PI);
      hCtx.fillStyle = pt.color;
      hCtx.fill();
    });

    if (!allFinished && hIsAnimating) hAnimationId = requestAnimationFrame(updateAndDrawHarness);
  }

  function startHarnessAnimation() {
    if (hIsAnimating) return;
    hIsAnimating = true;
    harnessCanvas.style.opacity = "1";
    initHarnessLines();
    updateAndDrawHarness();
  }

  function stopHarnessAnimation() {
    if (!hIsAnimating) return;
    hIsAnimating = false;
    clearTimeout(hAutoStopTimer);
    cancelAnimationFrame(hAnimationId);
    harnessCanvas.style.opacity = "0";
    setTimeout(() => { if (!hIsAnimating) hCtx.clearRect(0, 0, window.innerWidth, window.innerHeight); }, 500);
  }

  const handlePointerEnter = (e) => { if (e.pointerType === "mouse") startHarnessAnimation(); };
  const handlePointerLeave = (e) => { if (e.pointerType === "mouse") stopHarnessAnimation(); };
  const handleWindowResize = () => { if (hIsAnimating) resizeHarnessCanvas(); };

  const handleTouchStart = (e) => {
    hIsLongPress = false;
    hTouchStartX = e.touches[0].clientX;
    hTouchStartY = e.touches[0].clientY;
    clearTimeout(hPressTimer);
    hPressTimer = setTimeout(() => {
      hIsLongPress = true;
      startHarnessAnimation();
      clearTimeout(hAutoStopTimer);
      hAutoStopTimer = setTimeout(stopHarnessAnimation, 5000);
    }, 800);
  };
  const handleTouchMove = (e) => {
    const dx = e.touches[0].clientX - hTouchStartX;
    const dy = e.touches[0].clientY - hTouchStartY;
    if (Math.sqrt(dx * dx + dy * dy) > 10) clearTimeout(hPressTimer);
  };
  const handleTouchEnd = (e) => {
    clearTimeout(hPressTimer);
    if (hIsLongPress) e.preventDefault();
  };
  const handleTouchCancel = () => clearTimeout(hPressTimer);
  const handleClick = (e) => {
    if (hIsLongPress) {
      e.preventDefault();
      hIsLongPress = false;
    }
  };

  harnessLink.addEventListener("pointerenter", handlePointerEnter);
  harnessLink.addEventListener("pointerleave", handlePointerLeave);
  harnessLink.addEventListener("touchstart", handleTouchStart, { passive: true });
  harnessLink.addEventListener("touchmove", handleTouchMove, { passive: true });
  harnessLink.addEventListener("touchend", handleTouchEnd, { passive: false });
  harnessLink.addEventListener("touchcancel", handleTouchCancel);
  harnessLink.addEventListener("click", handleClick);
  window.addEventListener("resize", handleWindowResize);

  return () => {
    harnessLink.removeEventListener("pointerenter", handlePointerEnter);
    harnessLink.removeEventListener("pointerleave", handlePointerLeave);
    harnessLink.removeEventListener("touchstart", handleTouchStart);
    harnessLink.removeEventListener("touchmove", handleTouchMove);
    harnessLink.removeEventListener("touchend", handleTouchEnd);
    harnessLink.removeEventListener("touchcancel", handleTouchCancel);
    harnessLink.removeEventListener("click", handleClick);
    window.removeEventListener("resize", handleWindowResize);
    stopHarnessAnimation();
  };
}

function initAll() {
  if (cleanupDewesoft) cleanupDewesoft();
  if (cleanupHarness) cleanupHarness();
  cleanupDewesoft = initDewesoft();
  cleanupHarness = initHarness();
}

// Initialize immediately in case the script evaluates after 'astro:page-load'
initAll();

// Also initialize on Astro's View Transition events
document.addEventListener("astro:page-load", initAll);
document.addEventListener("swup:content:replace", initAll);
