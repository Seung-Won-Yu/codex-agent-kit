# Landing v4 Review

## Outcome

The landing page now behaves like a product demonstration of the Codex setup instead of a configuration catalogue with a decorative hero.

## Design decisions

- Replaced blurred decorative hero orbs with precise animated route lines and technical readouts.
- Kept the product promise large and calm, while exposing the four-step operating contract in the first viewport.
- Added a visible Interpret → Permission → Route → Verify processing timeline to the scenario demo.
- Consolidated the repeated setup and routing card grids into one scroll-led orchestration story.
- Converted agent cards into an editorial responsibility ledger.
- Added indexed capability marks and a denser mobile directory to the plugin section.
- Added a four-part installation contract for command, backup, path handling, and validation.
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
5. **Public-copy framing**
   - Earlier examples could read as commentary on the requester instead of demonstrating the system.
   - Replaced them with neutral, task-focused language across the landing, README, architecture docs, skill catalogue, and saved evidence.
6. **First-viewport clipping**
   - The product demonstration intentionally peeked into the first viewport, but read as an unfinished crop at common browser heights.
   - Made the hero a complete viewport scene and moved the full demonstration to the next scroll position.
7. **Mobile node truncation**
   - Compact orchestration labels used ellipsis at narrow widths.
   - Allowed multiline labels and increased the node floor so every label remains readable.
8. **Search escape handling**
   - Native dialog cancellation was not reliable in every automated browser path.
   - Added an explicit Escape handler and verified focus returns without leaving an interaction-blocking overlay.

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
  - 0 px at 320×568, 360×800, 390×844, 768×1024, 1024×768, 1440×900, and 1920×1080
  - no product-stage peek or crop in the first viewport
  - no orchestration node or compact metadata truncation
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
- Interaction regression:
  - all three demo scenarios update permission and skill slots correctly
  - Command-K opens and focuses search; Escape closes it
  - `supabase` filters the 47-skill catalogue to the two matching skills
  - theme state and accessible labels update in both directions
  - install navigation lands below the sticky header and command copy reaches the clipboard
