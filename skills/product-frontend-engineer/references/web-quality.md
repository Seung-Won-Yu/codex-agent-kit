# Web Quality Reference

Use this reference for accessibility, performance, SEO, Lighthouse-style reviews, Core Web Vitals, and production readiness.

## Accessibility

- Use semantic HTML before ARIA.
- Ensure every interactive control has a role, name, focus state, and keyboard path.
- Associate labels with inputs.
- Do not rely on color alone to communicate status.
- Check visible focus, contrast, reduced motion, and screen-reader names for changed UI.

## Performance

- Optimize the largest visible content first: image sizing, priority, format, and server response.
- Avoid layout shifts by reserving dimensions for images, media, ads, embeds, and async content.
- Reduce unnecessary JavaScript by keeping static or server-rendered UI out of client bundles.
- Split heavy routes or rarely used interactions where the project tooling supports it.
- Avoid expensive work during input; defer, debounce, or move it off the hot path.

## SEO and Metadata

- Use meaningful titles, descriptions, canonical URLs, and structured headings for public pages.
- Ensure primary content is present in the initial document when SEO matters.
- Use descriptive link text.
- Avoid hiding key content behind client-only rendering without a reason.

## Verification Checklist

- Build or typecheck succeeds.
- Changed pages work in desktop and mobile viewports.
- No obvious overflow, overlap, or layout shift.
- Keyboard navigation reaches all interactive elements.
- Images have correct dimensions and alt behavior.
- Public pages have sensible title, description, headings, and crawlable content.
