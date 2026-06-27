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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initRain() {
    resizeCanvas();
    columns = Math.floor(canvas.width / fontSize);
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
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  let lines = [];
  let intersections = [];
  let collidedPairs = new Set();
  const lineCount = 20;
  const speed = 7;
  let targetBox = null;

  function resizeHarnessCanvas() {
    harnessCanvas.width = window.innerWidth;
    harnessCanvas.height = window.innerHeight;
  }

  function generateOrthogonalPath(startX, startY, targetX, targetY) {
    const path = [{ x: startX, y: startY }];
    const goHorizontalFirst = Math.random() > 0.5;
    
    if (goHorizontalFirst) {
      const midX = startX + (targetX - startX) * (0.3 + Math.random() * 0.4);
      path.push({ x: midX, y: startY });
      const midY = startY + (targetY - startY) * (0.3 + Math.random() * 0.4);
      path.push({ x: midX, y: midY });
      path.push({ x: targetX, y: midY });
    } else {
      const midY = startY + (targetY - startY) * (0.3 + Math.random() * 0.4);
      path.push({ x: startX, y: midY });
      const midX = startX + (targetX - startX) * (0.3 + Math.random() * 0.4);
      path.push({ x: midX, y: midY });
      path.push({ x: midX, y: targetY });
    }
    
    path.push({ x: targetX, y: targetY });
    return path;
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
    
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;
    
    const w = harnessCanvas.width;
    const h = harnessCanvas.height;
    
    lines = [];
    intersections = [];
    collidedPairs.clear();
    const isDark = document.documentElement.classList.contains("dark");
    const colors = isDark 
      ? ["#40C057", "#7A50F3", "#FB5252", "#FB7E15", "#FCC419"] 
      : ["#2f9e44", "#6741d9", "#e03131", "#e8590c", "#f08c00"]; 
      
    for (let i = 0; i < lineCount; i++) {
      const border = i % 4;
      let startX, startY;
      if (border === 0) { startX = Math.random() * w; startY = -10; } 
      else if (border === 1) { startX = w + 10; startY = Math.random() * h; } 
      else if (border === 2) { startX = Math.random() * w; startY = h + 10; } 
      else { startX = -10; startY = Math.random() * h; }
      
      const path = generateOrthogonalPath(startX, startY, targetX, targetY);
      
      lines.push({
        id: i, path: path, color: colors[i % colors.length],
        currentSegment: 0, currX: startX, currY: startY,
        drawnPoints: [{ x: startX, y: startY }], finished: false
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
    hCtx.clearRect(0, 0, harnessCanvas.width, harnessCanvas.height);
    checkIntersections();
    let allFinished = true;
    
    lines.forEach(line => {
      if (!line.finished) {
        allFinished = false;
        if (line.currX >= targetBox.left && line.currX <= targetBox.right &&
            line.currY >= targetBox.top && line.currY <= targetBox.bottom) {
          line.finished = true;
          line.drawnPoints.push({ x: line.currX, y: line.currY });
        } else {
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
    cancelAnimationFrame(hAnimationId);
    harnessCanvas.style.opacity = "0";
    setTimeout(() => { if (!hIsAnimating) hCtx.clearRect(0, 0, harnessCanvas.width, harnessCanvas.height); }, 500);
  }

  const handlePointerEnter = (e) => { if (e.pointerType === "mouse") startHarnessAnimation(); };
  const handlePointerLeave = (e) => { if (e.pointerType === "mouse") stopHarnessAnimation(); };
  const handleWindowResize = () => { if (hIsAnimating) resizeHarnessCanvas(); };

  harnessLink.addEventListener("pointerenter", handlePointerEnter);
  harnessLink.addEventListener("pointerleave", handlePointerLeave);
  window.addEventListener("resize", handleWindowResize);

  return () => {
    harnessLink.removeEventListener("pointerenter", handlePointerEnter);
    harnessLink.removeEventListener("pointerleave", handlePointerLeave);
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
