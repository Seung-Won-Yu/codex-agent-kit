# Codex Image Generation Routing

This kit keeps media generation intentionally lightweight. The default route is Codex-native image generation through `media-image-director`, not external provider workflows.

## Routing Principle

Use `media-image-director` when the final output is an image or an image prompt:

| User Wants | Primary Skill | Notes |
| --- | --- | --- |
| General image generation | `media-image-director` | Generate with the available Codex image tool. |
| Image editing or restyling | `media-image-director` | Preserve what should stay; specify what changes. |
| Poster, thumbnail, social card | `media-image-director` | Use short exact text or no text. |
| GitHub README or portfolio visual | `media-image-director` | Keep the project/product inspectable. |
| Mobile app or game UI reference | `media-image-director` | Specify screen type, hierarchy, touch scale, and visual style. |
| Product mockup direction | `media-image-director` | Prefer clear product-first composition over decorative blur. |
| Prompt only | `media-image-director` | Produce one polished prompt and 1-2 alternate directions. |

## Default Safety

- Do not route to Sora, Fal, Replicate, Runway, Remotion, or other external providers by default.
- If the user asks for an actual image and Codex image generation is available, generate it.
- If the user asks for a prompt only, do not call the image tool.
- Keep text in generated images short; long text often becomes garbled.
- For edits, preserve identity, composition, and important details unless the user asks to change them.

## Suggested Phrases

```text
$media-image-director로 이미지 만들어줘.
목표: ...
용도: 썸네일 / 포스터 / README / 앱스토어 / 게임 UI 레퍼런스
스타일: ...
필요 산출물: 실제 이미지 / 프롬프트 / 변형안
제약: 비율, 텍스트, 색감, 피해야 할 것
```
