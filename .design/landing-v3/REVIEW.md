# Landing v3 Review

## Outcome

Codex Agent Kit now uses a theme-aware product-demo landing experience instead of one dark presentation card shared by both themes.

## Findings addressed

1. **Perceptibility:** the light theme felt static because its first-paint reveal could complete before it was noticeable.
   - First-viewport elements now enter from an HTML-level reveal state.
   - A 2.5-second fallback restores content if the application script fails.
2. **Visual coherence:** the light page handed off to a permanently black product stage.
   - Light uses a silver, blue, and mint stage with dark text.
   - Dark uses a black, blue, and green stage with light text.
   - Both themes share the same motion and interaction system.
3. **Product understanding:** the original stage described routing but did not demonstrate it.
   - Three selectable scenarios now update the normalized intent, permission ceiling, and four routing slots.
4. **Affordance:** static skill cards lifted on hover as though they were clickable.
   - Non-interactive cards no longer move on hover.
5. **Hierarchy and density:** plugin cards were oversized and repetitive.
   - The desktop catalog now uses a compact five-column layout with responsive 3/2/1-column fallbacks.

## Verification

- Initial light reveal sampled at 0/80/240/520/980 ms and confirmed intermediate opacity and transform values.
- Light and dark product-stage text contrast:
  - light primary 16.67:1, muted 5.74:1, subtle 5.01:1, green 4.65:1
  - dark primary 18.71:1, muted 8.58:1, subtle 5.68:1, green 10.85:1
- Responsive overflow: 0 px at 320, 768, 1024, and 1440 px.
- Search dialog: Command-K opens and focuses search; Escape closes and returns focus.
- Demo scenarios: selected state and Primary/Adapter/Verifier/Safety values update correctly.
- Reduced motion: no hidden reveal content; decorative animations resolve to 0.01 ms.
- Browser console errors: none.
- Duplicate IDs: none.
- Unlabelled buttons: none.

## Evidence

- `screenshots/light-hero.png`
- `screenshots/light-demo.png`
- `screenshots/dark-hero.png`
- `screenshots/dark-demo.png`
- `screenshots/mobile-light.png`
