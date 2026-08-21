# Readi World — Mobile Progress Mode

**Purpose:** safe project progress when the full desktop visual-production workflow is temporarily unavailable.

**Working nickname:** Laptop Crash Mode 😄

---

## 1. Core rule

> **Placeholder assets are used to build and validate game logic. Production-quality assets are used to approve world scale, spacing and visual composition.**

A placeholder must never become the authority for final world composition simply because it was available first.

The project may continue without finished graphics, but final spatial decisions must be validated against representative production assets before large areas are treated as visually locked.

---

## 2. What may safely continue with placeholders

Systems whose correctness does not depend on final artwork may continue, for example:

- world state
- save/load behavior
- inventory
- gathering
- crafting
- restoration logic
- building states
- interaction rules
- progression
- quests / World Path logic
- profession systems
- data-driven content definitions
- gameplay state transitions

Placeholder visuals are acceptable for these systems when their technical asset contract is respected.

---

## 3. Production-safe placeholder contract

A placeholder should represent the expected gameplay footprint of the future asset, not merely look roughly similar.

Where relevant, define or preserve:

- asset role / tags
- world footprint
- collision footprint or radius
- interaction point
- entrance point for buildings
- clear radius / exclusion area
- pivot
- expected draw size or visual bounds
- depth-sorting behavior
- transparent padding requirements

The final artwork may change visually without forcing gameplay logic to be rewritten, as long as it remains inside the approved contract.

---

## 4. What should NOT be visually locked with placeholders

Do not finalize large-scale composition only from temporary graphics, including:

- complete village dressing
- final building spacing
- final path widths and routing
- dense forest composition
- final camera framing
- object-overlap rules derived only from placeholder appearance
- decorative density
- final visual readability of interaction spaces

These require representative production assets.

---

## 5. Representative production assets

The project does **not** need every final asset before world development can continue.

However, major visual categories should gain at least one representative production-quality asset before their scale/composition assumptions are locked.

Useful representative categories include:

- tree / vegetation
- ground
- path / terrain transition
- building
- large prop
- character
- small decoration

Once a representative asset exists, it becomes a scale/composition reference for related placeholders.

---

## 6. Integration gate

When a representative production asset becomes available:

1. normalize it technically;
2. integrate only that asset family or representative asset;
3. test it in the actual runtime;
4. check world scale, spacing, collision, pivot, depth and readability;
5. adjust the contract if necessary;
6. only then expand the affected world area or asset family.

Do not wait until hundreds of final assets arrive before discovering that the world scale is wrong.

---

## 7. Mobile-only work rule

During Mobile Progress Mode, phone/GitHub work may continue when the result can be judged reliably without a desktop visual-production environment.

Good candidates:

- small code or data changes that are easy to review
- gameplay/system logic
- JSON/configuration work
- repository maintenance
- milestone/backlog updates when necessary
- technical asset metadata
- exact asset contracts
- integration preparation

Avoid treating phone-only visual judgement as final approval for production artwork or complex world composition.

---

## 8. Asset preparation during Mobile Progress Mode

If an artwork already exists, it may be prepared for implementation **without changing its artistic appearance**.

Allowed technical normalization may include:

- canvas dimensions
- target pixel dimensions
- transparent padding
- alpha/background cleanup
- pivot alignment
- scale normalization
- placement inside an agreed technical bounding box

The goal is technical compatibility, not visual redesign.

This makes it possible to prepare supplied assets for later integration even when final art creation itself is postponed.

---

## 9. Resume condition

Mobile Progress Mode ends when a desktop workflow is available again for reliable visual production, runtime inspection and asset integration.

At that point:

- unfinished visual work resumes;
- representative production assets are used to validate accumulated placeholder assumptions;
- systems that already passed logical validation do not need to be rebuilt unless a real asset exposes a contract problem.

---

## One-line development rule

> **Build logic with placeholders. Approve scale and world composition with production assets.**
