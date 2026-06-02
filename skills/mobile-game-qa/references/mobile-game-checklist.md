# Mobile Game QA Checklist

## Touch

- Primary controls are reachable by thumb.
- Repeated taps do not miss due to tiny targets.
- Drag/swipe gestures have enough hit area.
- Adjacent buttons are spaced to prevent accidental taps.

## Readability

- Critical numbers are readable during motion.
- Text remains legible on the smallest target viewport.
- Long localized strings have room or truncation behavior.
- Contrast is sufficient in both normal and highlighted states.

## Feedback

- Every tap has immediate visual feedback.
- Rewards animate the changed value.
- Errors explain what happened and what to do next.
- Win/fail states are unmistakable.

## Layout

- Safe areas and notches are respected.
- Modals fit without trapping content below the fold.
- No card or panel overlaps critical gameplay.
- Orientation behavior is explicit.

## Performance Feel

- First load shows progress or skeleton.
- Animations stay smooth enough for input confidence.
- Heavy images, particles, or canvas effects do not block play.
- Restart does not leak state or degrade performance.

## Instrumentation

- First session start is tracked.
- Tutorial or onboarding completion is tracked.
- Core action and level completion are tracked.
- Reward claim and currency spend are tracked when relevant.
