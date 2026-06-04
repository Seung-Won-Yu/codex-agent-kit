# Open Design Imports

This kit includes a small curated subset of skills from the Open Design ecosystem. They are kept under an `od-` prefix so they do not collide with the core personal skills already in this repository.

Source project:

- Open Design: https://github.com/nexu-io/open-design
- License: Apache-2.0
- Local license copy: `third_party/open-design/LICENSE`

## Why These Were Imported

The goal was not to mirror Open Design completely. The imported skills fill gaps that are useful for a Codex workflow:

- artifact-style dashboards and visual reports
- research synthesis that becomes a decision artifact
- score-based design review gates
- D3/data visualization guidance
- sketch-style diagrams
- motion-frame HTML artifacts
- cross-platform design constraints
- `DESIGN.md` as a design-system source of truth
- image/video generation direction and provider workflow routing

## Imported Skills

| Skill | Original Source Path | Why It Is Useful |
| --- | --- | --- |
| `od-design-md` | `skills/design-md` | Keeps visual rules, tokens, and product design direction in a single `DESIGN.md`. |
| `od-platform-design` | `skills/platform-design` | Adds cross-platform design constraints from Apple HIG, Material, and WCAG-style guidance. |
| `od-plan-design-review` | `skills/plan-design-review` | Adds a score-based senior design review gate before shipping UI work. |
| `od-hand-drawn-diagrams` | `skills/hand-drawn-diagrams` | Routes architecture and flow explanations toward Excalidraw-style diagrams. |
| `od-d3-visualization` | `skills/d3-visualization` | Adds D3 chart and interactive visualization guidance. |
| `od-research-decision-room` | `skills/research-decision-room` | Turns messy qualitative evidence into an HTML decision-room artifact. |
| `od-data-report` | `skills/data-report` | Turns structured data into a polished visual report page. |
| `od-motion-frames` | `design-templates/motion-frames` | Creates loopable CSS motion frames for hero/video-style visual output. |
| `od-live-dashboard` | `design-templates/live-dashboard` | Builds dashboard artifacts with KPIs, activity feeds, and tables. |

## Imported Media Skills

| Skill | Original Source Path | Why It Is Useful |
| --- | --- | --- |
| `media-imagegen` | `skills/imagegen` | Routes general image generation and editing workflows. |
| `media-web-image-direction` | `skills/imagegen-frontend-web` | Creates premium website section image references. |
| `media-mobile-image-direction` | `skills/imagegen-frontend-mobile` | Creates premium mobile app screen image references. |
| `media-canvas-design` | `skills/canvas-design` | Directs poster, illustration, and static visual art generation. |
| `media-poster-hero` | `skills/poster-hero` | Creates vertical marketing poster/share-image artifacts. |
| `media-screenshots-marketing` | `skills/screenshots-marketing` | Turns app/site screenshots into marketing visuals. |
| `media-device-mockup-3d` | `skills/mockup-device-3d` | Creates device showcase visuals for products and portfolios. |
| `media-image-enhancer` | `skills/image-enhancer` | Guides image cleanup, sharpening, denoising, and upscaling. |
| `media-gif-sticker-maker` | `skills/gif-sticker-maker` | Prepares animated GIF/sticker workflows. |
| `media-video-hyperframes` | `skills/video-hyperframes` | Builds HyperFrames/Remotion-ready video frame sequences. |
| `media-remotion` | `skills/remotion` | Routes React/Remotion video composition work. |
| `media-sora` | `skills/sora` | Prepares Sora-style video prompts and workflows. |
| `media-fal-generate` | `skills/fal-generate` | Routes Fal.ai provider workflows. |
| `media-replicate` | `skills/replicate` | Routes Replicate model discovery and provider workflows. |

## Import Policy

- Keep imported skill names prefixed with `od-`.
- Keep imported media skill names prefixed with `media-`.
- Preserve source notes in the copied skill files.
- Keep the Open Design Apache-2.0 license in `third_party/open-design/LICENSE`.
- Do not import all of Open Design by default; add only skills that match this kit's workflow.
- Prefer adapting a skill into the local style when a copied catalog entry is too thin to be directly useful.
