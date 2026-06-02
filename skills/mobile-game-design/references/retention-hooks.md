# Mobile Game Retention Hooks

Use retention hooks as hypotheses to test, not as decoration.

## Healthy Return Reasons

- Mastery: the player believes they can improve.
- Collection: the player wants to complete a set.
- Progression: the player can see a reachable next upgrade.
- Variety: tomorrow's challenge is meaningfully different.
- Social: another person changes the context.
- Expression: the player customizes identity, style, base, team, or strategy.
- Event: a temporary goal gives the session a clear purpose.

## Common Systems

- Daily missions: keep them short, varied, and tied to real play.
- Streaks: reward consistency without making absence feel fatal.
- Energy: use carefully; it can protect pacing or block fun.
- Battle pass: works when the core loop already has breadth.
- Timed chests: best when anticipation is pleasant, not coercive.
- Upgrade trees: show a near-term goal and a long-term fantasy.
- Gacha or loot: requires clear odds, fair pacing, and regional compliance.

## Analytics Events To Consider

- `first_session_started`
- `tutorial_step_completed`
- `first_win`
- `first_loss`
- `first_upgrade`
- `level_started`
- `level_completed`
- `session_ended`
- `reward_claimed`
- `currency_spent`
- `return_session_started`

## Design Checks

- D1: Why would a player return after sleeping on it?
- D3: What new depth appears after familiarity?
- D7: What goal is visible but not exhausted?
- Session length: Can the player finish a meaningful session while waiting in line?
- Failure: Does losing create a next attempt, not just a stop?
