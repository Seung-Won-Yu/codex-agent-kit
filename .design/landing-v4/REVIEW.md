# Landing v4 Review

## Outcome

The landing page now behaves like a product demonstration of the Codex setup instead of a configuration catalogue with a decorative hero.

## Design decisions

- Replaced blurred decorative hero orbs with precise animated route lines and technical readouts.
- Kept the product promise large and calm, while exposing the four-step operating contract in the first viewport.
- Added a visible Interpret → Permission → Route → Verify processing timeline to the scenario demo.
- Consolidated the repeated setup and routing card grids into one scroll-led orchestration story.
- Converted agent cards into an editorial responsibility ledger.
- Added compact capability marks to the plugin directory.
- Kept light and dark themes visually distinct but behaviorally identical.

Reference direction:

- https://www.apple.com/mac/ — product-first section hierarchy and restrained copy
- https://linear.app/ — real workflow UI as the primary proof
- https://vercel.com/ — technical precision and system-level visual language
- https://www.raycast.com/ — compact product capability presentation

## Post-implementation findings fixed

1. **Hidden mobile readout**
   - The four hero stages were statically marked for reveal but omitted from the reveal target list.
   - Added the readout to the same initial reveal system as the hero.
2. **Scroll-state lag**
   - Intersection thresholds could miss a chapter after a large programmatic or trackpad jump.
   - Replaced chapter activation with a requestAnimationFrame-throttled nearest-chapter calculation.
3. **No-JavaScript story contrast**
   - Inactive story chapters would remain visually muted without the application script.
   - Added a no-script rule that restores all chapter copy to full opacity.
4. **Screen-reader duplication**
   - The visual orchestration map repeated information already supplied by the narrative chapters.
   - Marked the map as decorative while keeping the full chapter content semantic.

## Verification

- Scenario demo:
  - selected scenario, permission ceiling, safety slot, and all four completion states update correctly
  - replay control disables during processing and returns to idle
- Scroll story:
  - intent, permission, routing, and verification states follow the nearest chapter
- Search:
  - Command-K opens and focuses the input
  - Escape closes and returns focus to the trigger
- Semantic checks:
  - one H1
  - no duplicate IDs
  - no unlabelled buttons
- Responsive overflow:
  - 0 px at 320, 768, 1024, and 1440 px
- Motion:
  - light and dark both run hero route, product-stage ambient, and orchestration orbit animations
  - reduced-motion mode exposes all reveal content and resolves looping animations to 0.01 ms
- No-JavaScript:
  - hero and all story chapters remain readable
  - skill catalogue fallback link remains available
- Contrast ratios:
  - light: primary 16.83, muted 5.07, story muted 4.67, stage muted 5.73
  - dark: primary 18.71, muted 7.92, story muted 6.02, stage muted 8.60
- Browser console errors: none

