---
name: media-image-director
description: Direct Codex image generation and editing. Use when the user wants an image made inside Codex, a better image prompt, an image variation, poster/thumbnail/reference art, product mockup direction, or critique-and-regenerate guidance.
---

# Media Image Director

Use this skill to make Codex image generation more intentional. The skill does not assume external providers. It prepares high-signal prompts for the available Codex image generation tool, then critiques the result and iterates.

## When To Use

- The user asks to generate, edit, improve, restyle, or iterate on an image inside Codex.
- The output is a poster, thumbnail, hero image, app/game visual, social card, icon concept, product mockup, character concept, UI reference, or mood image.
- The user gives a rough vibe and wants you to make it look better.
- The user shares an image and asks for a new version, cleanup, style change, crop, or variation.

Do not use this skill for full frontend implementation. Use `image-to-code` when the goal is to turn an image into UI code.

## Routing Questions

Ask only when missing information would change the image. Otherwise infer and proceed.

- Purpose: portfolio, GitHub README, app store, thumbnail, poster, concept art, UI reference, presentation, social post.
- Subject: what must appear in the image.
- Style: realistic, editorial, game UI, cute casual, premium SaaS, pixel art, cinematic, clean product mockup.
- Format: square, vertical, horizontal, mobile screen, wide hero, icon.
- Text: exact words that must appear, or say no text.
- Must avoid: logos, faces, clutter, dark mood, fake UI text, unreadable small text.

## Prompt Structure

Write image prompts in this order:

```text
Create [format/aspect] image of [subject].
Purpose: [where it will be used].
Composition: [camera/framing/layout].
Visual style: [art direction].
Palette and lighting: [colors, contrast, mood].
Key details: [specific objects, UI, materials, expressions, environment].
Text: [exact text or "no readable text"].
Quality guardrails: [avoid clutter, avoid distorted text, no extra logos, readable hierarchy].
```

## Codex Image Generation Rules

- If the user asks for an actual image, call the image generation tool rather than only writing a prompt.
- Keep prompts concrete and visual. Avoid vague adjectives without scene details.
- For UI or product images, ask for fewer readable words. Image models often distort long text.
- For thumbnails/posters, create a strong focal point and clear foreground/background separation.
- For game visuals, specify genre, camera, reward feedback, icon style, rarity colors, and touch-friendly UI scale.
- For GitHub/portfolio visuals, keep them inspectable: bright enough, minimal blur, product or project visible.
- For image edits, preserve the user-supplied identity/composition unless the user asks to change it.

## Review Checklist

After generation or when critiquing an image, check:

- Purpose fit: does it work for the intended surface?
- Focal point: can someone understand it in one second?
- Text: is text readable, minimal, and not garbled?
- Composition: is there enough space around the subject?
- Palette: does it avoid one-note color sludge?
- Artifacts: distorted hands, broken UI, warped logos, random fake text, messy edges.
- Reusability: can it be cropped or reused in README, app store, thumbnail, or poster layouts?

## Output Modes

- Actual image: generate the image, then summarize what was made and what to adjust next.
- Prompt only: provide one polished prompt plus 1-2 alternate directions.
- Iteration brief: explain what to keep, what to change, and the exact next generation prompt.
- Batch plan: list several images to generate in order, such as hero, thumbnail, app screenshot, and social card.
