# Interactive Ebook Web App — Reusable Prompt Template

> **How to use:** Copy the prompt below and replace all `{{PLACEHOLDER}}` values with your book details. Then paste it into your AI coding assistant.

---

## 🔧 CONFIGURATION (Change These)

| Placeholder | Description | Example |
|---|---|---|
| `{{BOOK_TITLE}}` | Full title of the book | Dheeran and the Magic Color Cubes |
| `{{SHORT_TITLE}}` | Short display title | Dheeran and Color Cubes |
| `{{PROJECT_FOLDER}}` | GitHub repo / folder name | dheeran-color-cubes-ebook |
| `{{TOTAL_STORY_PAGES}}` | Number of story pages (not including cover & back) | 16 |
| `{{TOTAL_PAGES}}` | Total count: cover + story pages + back | 18 |
| `{{AUTOPLAY_SECONDS}}` | Seconds between auto page turns | 3 |
| `{{IMAGE_FORMAT}}` | Image file format | png |
| `{{THEME_COLOR}}` | Primary theme hex color | #7C3AED |
| `{{APPRECIATION_MESSAGES}}` | Custom motivational messages (comma-separated list) | See defaults below |

---

## 📋 THE PROMPT (Copy Everything Below This Line)

---

Create a complete interactive ebook web app using HTML, CSS, and JavaScript.

Project Name: "{{SHORT_TITLE}}"

GOAL:
Build a fun, visually rich, kids-friendly interactive storybook that works locally in a browser and can be deployed to GitHub Pages.

----------------------------------

FILES STRUCTURE:

```
index.html
style.css
script.js
/images/
  cover.{{IMAGE_FORMAT}}
  page1.{{IMAGE_FORMAT}} to page{{TOTAL_STORY_PAGES}}.{{IMAGE_FORMAT}}
  back.{{IMAGE_FORMAT}}
```

----------------------------------

CORE FUNCTIONALITY:

1. Load all images from the /images folder.

2. Display pages in correct order:
   cover → page1 → page2 → ... → page{{TOTAL_STORY_PAGES}} → back
   (Total: {{TOTAL_PAGES}} pages)

3. Show ONE page at a time (mobile-first design).

4. Navigation:
   - Next and Previous buttons
   - Swipe gestures (touch support for mobile)
   - Keyboard arrow keys (desktop)

----------------------------------

UI / UX (KIDS FRIENDLY):

5. Bright soft gradient background (pastel colors)

6. Centered book container:
   - Max-width: 380px
   - Aspect ratio: 2/3 (portrait)
   - Rounded corners (24px)
   - Soft shadow
   - Gentle floating anti-gravity animation
   - Dark background (#1a1a2e) inside container

7. Large colorful buttons:
   - Rounded pill shape (50px radius)
   - Gradient backgrounds (blue for Back, pink for Next, yellow for Play)
   - Easy tap targets for kids

8. Page indicator:
   Display: "⭐ Page X of {{TOTAL_PAGES}} ⭐"

9. Images must fill the container completely:
   - Use `object-fit: fill` so images stretch to full width and height
   - No white gaps or padding around images

----------------------------------

PAGE TRANSITION — 3D BOOK FLIP:

10. Use CSS 3D perspective book flip animation (NOT slide):
    - Add `perspective: 1200px` to the page wrapper
    - Active page: `rotateY(0deg)`
    - Previous page: `rotateY(-120deg)` with `transform-origin: left center`
    - Next page: `rotateY(120deg)` with `transform-origin: right center`
    - Transition duration: 0.7s with smooth easing
    - When going forward: old page flips left, new page flips in from right
    - When going backward: old page flips right, new page flips in from left

----------------------------------

INTERACTIVE FEATURES:

11. Tap on page → gentle zoom-in animation (scale 1.15)

12. Autoplay mode:
    - Automatically flip pages every {{AUTOPLAY_SECONDS}} seconds
    - Play / Pause button
    - Auto-stops at last page

13. Progress bar:
    - Show reading progress at bottom
    - Gradient fill (purple → pink → yellow)
    - Animated shine effect
    - Small circular indicator dot

14. Appreciation Toast Messages:
    - After each page turn (going forward), show a motivational popup
    - Toast appears at center of screen with scale-up animation
    - Auto-dismisses after 2 seconds
    - Glass-morphism style (gradient bg + backdrop blur + white border)
    - Messages should rotate through these (customize as needed):
      ```
      "Great start! 🌟"
      "Awesome! Keep reading! 📖"
      "You're doing great! ⭐"
      "Wonderful! What happens next? 🤩"
      "Super reader! 🦸"
      "Amazing! Keep going! 🚀"
      "Fantastic! 🎨"
      "Brilliant! You're halfway! 🌈"
      "Spectacular! 💫"
      "You're a star reader! ⭐"
      "Incredible! Almost there! 🏆"
      "So exciting! 🎉"
      "Marvelous! 🌺"
      "Keep turning! Magic awaits! ✨"
      "Outstanding! 🎯"
      "Almost done! You're brave! 💪"
      "Last page! You made it! 🥳"
      ```

15. Last page experience:
    - Confetti animation (150 particles, 4s duration) 🎉
    - Show "Read Again" button (green gradient, pill shape)
    - Show final celebration message overlay:
      ```
      🎉 Congratulations, Super Reader! 🎉
      You finished the whole book!
      You are amazing and brave
      just like {{HERO_NAME}}! 🌟
      ⭐ Keep reading, keep dreaming! ⭐
      ```
    - Celebration message slides up with animation

----------------------------------

PERFORMANCE:

16. Lazy loading:
    - Load only current + next 2 images
    - Show spinner while loading

17. Image fallback chain:
    - Try .{{IMAGE_FORMAT}} first
    - Then try .svg
    - Then generate colorful canvas placeholder

18. Smooth animations (use will-change, backface-visibility: hidden)

----------------------------------

RESPONSIVE DESIGN:

19. Fully responsive breakpoints:
    - Small phones (< 380px): reduced padding, smaller text
    - Default mobile (380-767px): primary design
    - Tablet (768-1023px): max-width 600px, larger text
    - Desktop (1024px+): max-width 680px, hover effects
    - Landscape mobile: horizontal layout

20. Dark mode support via `prefers-color-scheme: dark`

21. Reduced motion support via `prefers-reduced-motion: reduce`

----------------------------------

EXTRA FEATURES:

22. Floating background shapes:
    - Colorful cubes and circles floating with CSS animation
    - Low opacity (0.12), non-interactive
    - 12 shapes on mobile, 20 on desktop

23. Fullscreen toggle:
    - Button in top-right corner
    - F key shortcut

24. Loading screen:
    - 5 bouncing colored cubes
    - "Opening the storybook…" text
    - Fades out when cover image loads

25. Keyboard shortcuts:
    - ← → Arrow keys: navigate pages
    - Space: toggle autoplay
    - Home: go to start
    - F: toggle fullscreen

----------------------------------

DESIGN TOKENS:

```css
--color-primary: {{THEME_COLOR}};
--color-secondary: #F472B6;
--color-accent: #FBBF24;
--font-display: 'Baloo 2', cursive;  /* Google Fonts */
--font-body: 'Nunito', sans-serif;    /* Google Fonts */
--radius-book: 24px;
--radius-button: 50px;
```

----------------------------------

CODE REQUIREMENTS:

- Use pure HTML, CSS, JavaScript (no frameworks)
- Clean and well-structured code with comments
- Works by opening index.html locally AND on GitHub Pages
- Google Fonts loaded via CSS @import
- Optional CDN allowed for libraries
- All interactive elements must have unique IDs
- Semantic HTML with proper accessibility (aria labels)
- SEO meta tags (title, description, theme-color)

----------------------------------

OUTPUT:

Provide complete working code:
- index.html
- style.css
- script.js

Do NOT include explanations.
Only provide clean, production-ready code.

----------------------------------

IMPORTANT:

- Make the UI feel like a modern kids mobile app with playful animations
- The book flip effect must look like turning a real book page
- Appreciation messages should feel rewarding and motivating for kids
- The final celebration should make the child feel proud
- Images MUST fill the container completely (no white borders)
- All animations should be smooth with no lag

---

## 📝 QUICK START CHECKLIST

Before running the prompt:

1. [ ] Create your project folder
2. [ ] Create `/images/` subfolder
3. [ ] Add your images:
   - `cover.png` (book cover)
   - `page1.png` through `page{{TOTAL_STORY_PAGES}}.png` (story pages)
   - `back.png` (back cover)
4. [ ] Replace all `{{PLACEHOLDER}}` values in the prompt above
5. [ ] Paste the prompt into your AI assistant
6. [ ] After generation, open `index.html` in browser to test
7. [ ] Push to GitHub and enable GitHub Pages to deploy

---

## 📖 ADDING MORE PAGES

To change the number of pages:

1. Update `{{TOTAL_STORY_PAGES}}` and `{{TOTAL_PAGES}}` in the prompt
2. Add corresponding image files to `/images/`
3. The JavaScript PAGES array will need entries for each page
4. Add more appreciation messages if needed (one per story page)

---

## 🎨 CUSTOMIZATION IDEAS

- Change theme colors to match your book's style
- Add background music (use HTML5 Audio API)
- Add page narration (text-to-speech or audio files)
- Add interactive quizzes between pages
- Add character name input at the start
- Add multiple language support
- Add bookmark/save progress feature (localStorage)
