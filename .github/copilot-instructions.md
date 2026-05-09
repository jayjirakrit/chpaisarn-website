# GitHub Copilot Instructions

## Project context
- Astro 5 static website
- React support via `@astrojs/react`
- Tailwind CSS via `@tailwindcss/vite`
- Project focus: static content, clean layout, image-first presentation

## Purpose
Generate and maintain static website content and images with:
- semantic Astro pages
- reusable components
- responsive image handling
- minimal client-side JavaScript
- clean, maintainable markup

## What to build
- Page sections: hero, features, services, about, gallery, testimonials, contact
- Reusable components in `src/components`
- Layouts in `src/layouts`
- Static asset usage from `public/` and `src/assets/`
- Image-rich sections with descriptive `alt` text
- Mobile-first responsive structure

## Image guidance
- Store images under `public/` for static serving
- Use responsive patterns: `srcset`, `sizes`, `picture` when needed
- Add `loading="lazy"` for non-critical images
- Provide meaningful `alt` text for every image
- Avoid oversized images; prefer optimized SVGs and compressed JPG/PNG/WebP

## Code quality
- Keep component props explicit and simple
- Avoid deep nesting in JSX/HTML
- Prefer small reusable components over repeated markup
- Keep styling with Tailwind utilities and shared CSS in `src/styles/global.css`
- Avoid inline styles and unused imports
- Use clear names for components, files, and CSS classes

## Astro + React guidance
- Keep pages static unless interactivity is required
- Use React only for interactive UI parts
- Render content in Astro components when possible
- Avoid client-side hydration unless necessary

## Best practices
- Use semantic elements: `section`, `article`, `header`, `main`, `footer`
- Create accessible headings and buttons
- Keep content readable with short paragraphs and strong CTAs
- Maintain consistent spacing, typography, and color usage
- Keep layout and content separate for easier updates

## Avoid
- excessive JavaScript for static content
- large unoptimized images
- duplicated component logic
- mixing content and styling too tightly
