# Media Generation Routing

This kit includes media-focused skills for image direction, image generation, motion frames, and provider-backed video/image workflows.

## Routing Principle

Use the narrowest skill that matches the final artifact:

| User Wants | Primary Skill | Notes |
| --- | --- | --- |
| General image generation or editing | `media-imagegen` | Use the available image generation tool when present. |
| Premium website section reference images | `media-web-image-direction` | Generate one image per website section. |
| Premium mobile app screen concepts | `media-mobile-image-direction` | Use for app-native multi-screen concepts. |
| Poster, illustration, static art | `media-canvas-design` or `media-poster-hero` | `media-poster-hero` is best for vertical marketing posters. |
| App screenshots as marketing assets | `media-screenshots-marketing` | Pair with browser/Playwright when a local app exists. |
| Device/product showcase | `media-device-mockup-3d` | Good for GitHub, portfolio, launch, or app store visuals. |
| Image cleanup/upscale prompt workflow | `media-image-enhancer` | Use when the input image already exists. |
| GIF or sticker concept | `media-gif-sticker-maker` | Requires the upstream provider workflow for final GIF generation. |
| HTML motion frame or video storyboard | `media-video-hyperframes` or `od-motion-frames` | Good before rendering to mp4. |
| React-rendered video | `media-remotion` | Use when a project should render reproducible video from code. |
| Sora video prompt/workflow | `media-sora` | Requires OpenAI Sora/API availability. |
| Fal.ai image/video provider | `media-fal-generate` | Requires Fal credentials and model choice. |
| Replicate model workflow | `media-replicate` | Requires Replicate credentials and model choice. |

## Provider Safety

- Do not assume provider credentials exist.
- If the user asks for actual Sora, Fal, Replicate, MiniMax, or other provider generation, first check whether the required tool/API key/environment is available.
- If provider execution is not available, produce a provider-ready prompt, shot list, storyboard, or implementation plan instead of pretending a file was generated.
- For direct image creation in Codex, prefer the available `image_gen` capability when the user asks to create or edit an image.

## Suggested Phrases

```text
$skill-router로 라우팅해서 이미지/영상 생성 흐름 잡아줘.
목표: ...
용도: 썸네일 / 포스터 / 웹섹션 / 앱스토어 / 영상 / GIF
스타일: ...
필요 산출물: 실제 이미지 / 프롬프트 / storyboard / HTML motion / mp4-ready frames
제약: 사이즈, 브랜드, 텍스트, 모델/API 여부
```
