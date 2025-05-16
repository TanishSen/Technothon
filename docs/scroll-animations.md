# Scroll Animations Documentation

## Overview

This document explains the scroll-driven animations implemented throughout the Technothon website.

## Implementation

### CSS-based Scroll-driven Animations

We've implemented CSS scroll-driven animations using the modern `animation-timeline` and `animation-range` properties. These allow elements to animate as they enter the viewport during scrolling, creating an engaging fade-in effect.

### Animation Classes

The following animation classes can be added to elements:

- `scroll-animate-text`: For text elements (headings, paragraphs)
- `scroll-animate-image`: For images with filter effects
- `scroll-animate-card`: For card-like elements
- `scroll-animate-left`: For elements that animate from left to right
- `scroll-animate-right`: For elements that animate from right to left
- `scroll-animate-stagger`: For staggered animations in lists

## Typography

The website uses the following typography:

- **Headings**: Francois One (Google Font)
  - Used for all headings (h1-h6)
  - Applied automatically through global CSS
  - Also available as a utility class: `francois-font`
- **Body Text**: Arial, sans-serif
  - Used for paragraphs and general text content
- `scroll-animate-stagger`: For staggered animations in lists

### Example Usage

```jsx
<h2 className="scroll-animate-text">Heading</h2>
<p className="scroll-animate-text">Paragraph text</p>
<img className="scroll-animate-image" src="path/to/image.jpg" alt="Description" />
<div className="card scroll-animate-card">Card content</div>
```

### Animation Timing

You can add animation delays to create staggered effects:

```jsx
<div className="scroll-animate-card" style={{ animationDelay: "0.2s" }}>
  Content
</div>
```

### Browser Support & Fallbacks

- CSS scroll-driven animations are supported in modern browsers (Chrome 115+, Firefox, Safari 16.4+)
- For older browsers, we've implemented a JavaScript fallback using Intersection Observer

## Technical Details

### CSS Implementation

The animations are defined in `/src/styles/scroll-animations.css` with keyframes for each animation type.

### JavaScript Fallback

For browsers without support for `animation-timeline`, we use the `initScrollAnimationFallback()` function in `/src/utils/scrollAnimationFallback.js`.

### Accessibility

Animations are automatically disabled for users with `prefers-reduced-motion` settings.

## Reference

Based on the implementation from the CodePen example: https://codepen.io/bassohr/pen/MWxzYBq

## Usage Guidelines

1. Add appropriate animation classes based on the content type
2. For lists or grid items, consider adding small animation delays to create a staggered effect
3. Test on different browsers and devices to ensure smooth performance
4. Consider using the `will-change` property sparingly for elements with heavy animations
