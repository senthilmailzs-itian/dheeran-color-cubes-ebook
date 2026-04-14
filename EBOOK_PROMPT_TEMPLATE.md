# Interactive Ebook Web App — Reusable Prompt Template (V2)

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
| `{{THEME_COLOR}}` | Primary theme hex color | #7C3AED |
| `{{LANG_CODES}}` | Comma separated codes | en, hi, ta |

---

## 📋 THE PROMPT (Copy Everything Below This Line)

---

Create a complete interactive multi-language ebook web app using HTML, CSS, and JavaScript.

Project Name: "{{SHORT_TITLE}}"

GOAL:
Build a high-end, visually rich, multi-lingual, and kids-friendly interactive storybook. It must support touch navigation, voice narration, and bi-directional page scrubbing.

----------------------------------

FILES STRUCTURE:
```
index.html
style.css
script.js
/images/
  cover.png, page1.png to page{{TOTAL_STORY_PAGES}}.png, back.png
```

----------------------------------

CORE FUNCTIONALITY & UI:

1. Display 18 pages (0-17) with 3D Book Flip transitions (Perspective: 1200px).
2. Mobile-First Layout: Max-width 420px, 2/3 aspect ratio, rounded corners, soft shadows.
3. Multi-language Support:
   - Provide a language selector (dropdown) near the top.
   - Store all text in a structured STORY_DATA object with keys for `{{LANG_CODES}}`.
   - Each language object should have a `pages` array and a `celebration` message.

4. Interactive Page Scrubber:
   - Replace standard progress bars with an `<input type="range">` scrubber.
   - Sync scrubber position with page turns.
   - Moving the scrubber should turn the book pages in real-time.
   - Apply custom CSS to the scrubber (themed track and thumb).

5. Navigation & Autoplay:
   - Large pill-shaped gradient buttons (Back, Play, Next).
   - Autoplay mode automatically turns pages.
   - Coordination: Autoplay must wait for the "Read Aloud" voice to finish speaking before moving to the next page.

6. Enhanced Voice Narration (Web Speech API):
   - A speaker icon (Read Aloud) button.
   - Functionality: Detect and select the best natural Indian voice for the current language (English, Hindi, Tamil).
   - Error handling: If a voice is missing, show a localized toast message with setup tips.

7. Kids Engagement:
   - Appreciation Toasts: Scale-up glass-morphism popups after each page turn.
   - Final Celebration: High-performance canvas confetti and a localized success overlay.
   - Tap-to-Zoom: Smooth scale animation on the page image.

8. Mobile Optimization:
   - Handle small viewports aggressively: reduce gaps/padding, shrink the book container height to ensure buttons never clip.
   - Add `overflow-y: auto` to the app container as a safety fallback.

----------------------------------

DESIGN TOKENS:
- --color-primary: {{THEME_COLOR}};
- --font-display: 'Baloo 2', cursive;
- --font-body: 'Nunito', sans-serif;
- --radius-book: 24px;
- --radius-button: 50px;

----------------------------------

OUTPUT:
Provide complete, clean, production-ready code for index.html, style.css, and script.js. Ensure the logic is bug-free and follows modern JS best practices.
