# Mobile Game UI Component Checklist

Use this when specifying or reviewing game UI components.

## Buttons

- States: default, pressed, disabled, loading, selected, focus-visible.
- Touch target: 44-48 px minimum.
- Copy: short verb first, icon when repeated.
- Feedback: pressed state must be visible within 100 ms.

## Resource Counters

- Stable placement across screens.
- Distinct icon and label for each currency.
- Handles long values without layout shift.
- Tapping reveals source or spending context when useful.

## Progress Bars

- Shows current value and target when progress matters.
- Animates change after rewards.
- Uses color plus shape or label for danger/completion.

## Reward Popups

- Shows reward icon, amount, rarity, source, and next action.
- Uses one primary action.
- Avoids blocking repeat play longer than needed.

## Inventory/Grid Items

- Fixed cell dimensions.
- Clear selected, locked, equipped, new, and upgradeable states.
- Rarity is visible without relying on color alone.
- Long names truncate gracefully or move to detail panel.

## Gameplay HUD

- Primary action controls are thumb reachable.
- HUD does not cover hazards or targets.
- Critical status is visible during motion.
- Pause/settings is reachable but visually secondary.
