import assert from "node:assert/strict";
import test from "node:test";

import { createVirtualJoystick } from "../src/input/virtual-joystick.js";

test("appears at touch origin, emits direction, and hides on release", () => {
  const fixture = createFixture();
  let releaseCount = 0;
  const joystick = createVirtualJoystick({
    ...fixture,
    onRelease: () => { releaseCount += 1; }
  });

  fixture.zone.emit("pointerdown", pointer(7, 320, 700));

  assert.equal(joystick.isActive(), true);
  assert.equal(fixture.root.classList.has("is-active"), true);
  assert.equal(fixture.root.attributes["aria-hidden"], "false");
  assert.equal(fixture.root.style.left, "49px");
  assert.equal(fixture.root.style.top, "529px");
  assert.deepEqual(joystick.getVector(), { x: 0, y: 0 });

  fixture.zone.emit("pointermove", pointer(7, 380, 700));
  assert.ok(Math.abs(joystick.getVector().x - 1) < 0.000001);
  assert.ok(Math.abs(joystick.getVector().y) < 0.000001);

  fixture.zone.emit("pointerup", pointer(7, 380, 700));
  assert.equal(joystick.isActive(), false);
  assert.deepEqual(joystick.getVector(), { x: 0, y: 0 });
  assert.equal(fixture.root.classList.has("is-active"), false);
  assert.equal(fixture.root.attributes["aria-hidden"], "true");
  assert.equal(fixture.knob.style.transform, "translate(0, 0)");
  assert.equal(releaseCount, 1);
});

test("clamps the visual base inside the app while keeping touch-origin input", () => {
  const fixture = createFixture();
  createVirtualJoystick(fixture);

  fixture.zone.emit("pointerdown", pointer(3, 399, 870));

  assert.equal(fixture.root.style.left, "58px");
  assert.equal(fixture.root.style.top, "632px");
});

test("ignores secondary buttons and foreign pointers", () => {
  const fixture = createFixture();
  const joystick = createVirtualJoystick(fixture);

  fixture.zone.emit("pointerdown", pointer(2, 330, 700, 2));
  assert.equal(joystick.isActive(), false);

  fixture.zone.emit("pointerdown", pointer(4, 330, 700));
  fixture.zone.emit("pointermove", pointer(9, 390, 700));
  assert.deepEqual(joystick.getVector(), { x: 0, y: 0 });
  fixture.zone.emit("pointerup", pointer(9, 390, 700));
  assert.equal(joystick.isActive(), true);
});

test("backgrounding clears an active pointer without leaving movement stuck", () => {
  const fixture = createFixture();
  const joystick = createVirtualJoystick(fixture);

  fixture.zone.emit("pointerdown", pointer(5, 330, 700));
  fixture.zone.emit("pointermove", pointer(5, 370, 730));
  fixture.documentTarget.hidden = true;
  fixture.documentTarget.emit("visibilitychange", {});

  assert.equal(joystick.isActive(), false);
  assert.deepEqual(joystick.getVector(), { x: 0, y: 0 });
  assert.equal(fixture.root.attributes["aria-hidden"], "true");
});

function createFixture() {
  const app = element({ left: 0, top: 0, right: 400, bottom: 874, width: 400, height: 874 });
  const zone = element({ left: 200, top: 100, right: 400, bottom: 874, width: 200, height: 774 });
  const root = element({ left: 0, top: 0, right: 142, bottom: 142, width: 142, height: 142 });
  const knob = element({ left: 0, top: 0, right: 64, bottom: 64, width: 64, height: 64 });
  zone.parentElement = app;

  return {
    zone,
    root,
    knob,
    windowTarget: eventTarget(),
    documentTarget: Object.assign(eventTarget(), { hidden: false })
  };
}

function element(bounds) {
  const target = eventTarget();
  const classes = new Set();

  return Object.assign(target, {
    style: {},
    dataset: {},
    attributes: {},
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
      has: (name) => classes.has(name)
    },
    getBoundingClientRect: () => bounds,
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    setPointerCapture(pointerId) {
      this.capturedPointerId = pointerId;
    }
  });
}

function eventTarget() {
  const listeners = new Map();
  return {
    addEventListener(name, listener) {
      const list = listeners.get(name) ?? [];
      list.push(listener);
      listeners.set(name, list);
    },
    emit(name, event) {
      for (const listener of listeners.get(name) ?? []) listener(event);
    }
  };
}

function pointer(pointerId, clientX, clientY, button = 0) {
  return {
    pointerId,
    clientX,
    clientY,
    button,
    preventDefault() {}
  };
}
