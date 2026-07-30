export function createVirtualJoystick({ root, knob, onRelease }) {
  let activePointerId = null;
  let vector = { x: 0, y: 0 };

  const update = (event) => {
    const bounds = root.getBoundingClientRect();
    const maxRadius = bounds.width * 0.32;
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    const length = Math.hypot(dx, dy);
    const scale = length > maxRadius ? maxRadius / length : 1;
    const x = dx * scale;
    const y = dy * scale;

    vector = { x: x / maxRadius, y: y / maxRadius };
    knob.style.transform = `translate(${x}px, ${y}px)`;
  };

  const release = () => {
    if (activePointerId === null && vector.x === 0 && vector.y === 0) return;
    activePointerId = null;
    vector = { x: 0, y: 0 };
    knob.style.transform = "translate(0, 0)";
    onRelease?.();
  };

  root.addEventListener("pointerdown", (event) => {
    if (activePointerId !== null) return;
    activePointerId = event.pointerId;
    root.setPointerCapture(event.pointerId);
    update(event);
    event.preventDefault();
  });

  root.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointerId) return;
    update(event);
    event.preventDefault();
  });

  for (const eventName of ["pointerup", "pointercancel", "lostpointercapture"]) {
    root.addEventListener(eventName, (event) => {
      if (event.pointerId === activePointerId) release();
    });
  }

  window.addEventListener("blur", release);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) release();
  });

  return Object.freeze({
    getVector: () => vector,
    release
  });
}
