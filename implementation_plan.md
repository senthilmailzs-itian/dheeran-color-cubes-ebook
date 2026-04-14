# Text-to-Speech (Read Aloud) Feature

This plan outlines how to add a "Read Aloud" feature to the ebook, allowing the story text written on the images to be spoken when the user clicks a speaker icon.

> [!WARNING]
> **Important Note on Voice Emotions:**
> To implement this immediately with zero setup, we will use the browser's built-in **Web Speech API**. This is free and works without external services, but the voice options and "emotional" expressions depend entirely on the user's browser/OS (and can sometimes sound a bit robotic). 
> 
> We will configure the pitch and rate to make it sound friendly, but if you want *true, lifelike emotions*, that typically requires using a paid AI service (like ElevenLabs) to generate pre-recorded `.mp3` files. We will structure the code so it works immediately via the browser API, but you can easily upgrade to `.mp3` files later if desired!

## Proposed Changes

### `script.js`
We will:
1. Define a `PAGE_TEXTS` array containing the transcribed text for every page (e.g., Cover, Page 1 to Page 13, plus activity pages).
2. Add a `speakText(text)` function using `window.speechSynthesis`.
3. Add a `stopSpeaking()` function to stop audio when turning pages.
4. Hook into the page turn logic to stop any currently playing text.
5. Create logic to handle a new "Speaker / Read Aloud" button click.

#### [MODIFY] [script.js](file:///c:/Users/senth/OneDrive/Documents/GitHub/dheeran-color-cubes-ebook/script.js)

### `index.html`
We will:
1. Add a speaker icon button to the UI. Let's add it near the top-right of the book container so it feels attached to the current page.

#### [MODIFY] [index.html](file:///c:/Users/senth/OneDrive/Documents/GitHub/dheeran-color-cubes-ebook/index.html)

### `style.css`
We will:
1. Style the new speaker button to match the interactive, colorful vibe of the ebook. Provide hover effects and a pulse animation when audio is actively playing.

#### [MODIFY] [style.css](file:///c:/Users/senth/OneDrive/Documents/GitHub/dheeran-color-cubes-ebook/style.css)

## Open Questions
- Is using the built-in browser voices (Web Speech API) acceptable for now as the starting point? 
- Would you prefer the speaker button to be inside the navigation bar at the bottom, or floating on the top-right corner of the page? (I propose floating top-right on the book itself).

## Verification Plan
1. Open the ebook in the browser.
2. Verify the speaker icon appears on the page.
3. Click the speaker icon and ensure that the correct text for the current page is read aloud.
4. Turn the page and verify that playing audio stops immediately.
