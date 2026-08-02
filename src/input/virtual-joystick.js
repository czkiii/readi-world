export function createVirtualJoystick({
  zone,
  root,
  knob,
  onRelease,
  windowTarget = window,
  documentTarget = document
}) {
  let activePointerId = null;
  let origin = null;
  let vector = { x: 0, y: 0 };

  const update = (event) => {
    if (!origin) return;
    const maxRadius = root.getBoundingClientRect().width * 0.32;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    const length = Math.hypot(dx, dy);
    const scale = length > maxRadius ? maxRadius / length : 1;
    const x = dx * scale;
    const y = dy * scale;

    vector = { x: x / maxRadius, y: y / maxRadius };
    knob.style.transform = `translate(${x}px, ${y}px)`;
  };

  const showAt = (event) => {
    const zoneBounds = zone.getBoundingClientRect();
    const appBounds = zone.parentElement.getBoundingClientRect();
    const rootBounds = root.getBoundingClientRect();
    const halfWidth = rootBounds.width / 2;
    const halfHeight = rootBounds.height / 2;
    const centerX = clamp(
      event.clientX,
      appBounds.left + halfWidth,
      appBounds.right - halfWidth
    );
    const centerY = clamp(
      event.clientY,
      appBounds.top + halfHeight,
      appBounds.bottom - halfHeight
    );

    origin = { x: centerX, y: centerY };
    root.style.left = `${centerX - zoneBounds.left - halfWidth}px`;
    root.style.top = `${centerY - zoneBounds.top - halfHeight}px`;
    root.classList.add("is-active");
    root.setAttribute("aria-hidden", "false");
    zone.dataset.active = "true";
  };

  const release = () => {
    if (activePointerId === null && vector.x === 0 && vector.y === 0) return;
    activePointerId = null;
    origin = null;
    vector = { x: 0, y: 0 };
    knob.style.transform = "translate(0, 0)";
    root.classList.remove("is-active");
    root.setAttribute("aria-hidden", "true");
    delete zone.dataset.active;
    onRelease?.();
  };

  zone.addEventListener("pointerdown", (event) => {
    if (activePointerId !== null || event.button > 0) return;
    activePointerId = event.pointerId;
    showAt(event);
    zone.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  zone.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointerId) return;
    update(event);
    event.preventDefault();
  });

  for (const eventName of ["pointerup", "pointercancel", "lostpointercapture"]) {
    zone.addEventListener(eventName, (event) => {
      if (event.pointerId === activePointerId) release();
    });
  }

  windowTarget.addEventListener("blur", release);
  documentTarget.addEventListener("visibilitychange", () => {
    if (documentTarget.hidden) release();
  });

  return Object.freeze({
    getVector: () => vector,
    isActive: () => activePointerId !== null,
    release
  });
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}
