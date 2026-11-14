# Word Dash

A two-player alphabet guessing game. One player explains the highlighted word; the other guesses it before the clock runs out.

## Gameplay

- Choose **1–26 consecutive alphabet letters**, defaulting to 10. A 26-letter round runs from A to Z.
- Choose **Easy, Medium, Hard, Expert or Impossible**. Difficulty is estimated from word frequency, popularity and parts of speech. It is not based just on word length, so difficulty is an approximation.
- Every new round fetches words live from the [Datamuse API](https://www.datamuse.com/api/). There is **no built-in word bank**. You need an internet connection to generate a round.
- The app remembers the last 2,200 words on the device and favours unseen answers. It only repeats when the API pool has been exhausted.
- Press **Start** to reveal the words and hear the first letter spoken out loud. After each answer, the next letter is announced.
- **👍 Got it** marks a word green; **⏭ Pass** marks it yellow; **👎 Missed** marks it red. Passed and missed words return until all are correct.
- Every second beeps. At 10 seconds the pitch rises, again at 5, and a game-over tone sounds at zero. Clear the board to stop the clock and trigger confetti.
- Personal best times are stored separately for each difficulty, time limit and number of letters.

## iPad, TV and PWA

The interface fills the available screen height, with a compact grid that automatically changes columns to fit up to 26 letters on an iPad in landscape. Answer controls use touch-action manipulation to avoid double-tap zoom and delayed touch responses.

To install on iPad or iPhone, open the [game](https://jakerb.github.io/word-dash/) in Safari, select **Share → Add to Home Screen**, then launch it from the home screen. Other modern browsers can use **Install app** when offered.

The PWA uses a **network-first service worker**: reopening it retrieves the latest website from GitHub Pages. While open, it periodically checks for code and stylesheet changes, reloading automatically outside a live round; if you're playing, it delays the reload until the next round. The shell can load offline, but **new game words require the API**.

## Hosting

This repository is published from GitHub Pages (branch **main**, root directory):

**https://jakerb.github.io/word-dash/**

All app files live at the root: `index.html`, `manifest.webmanifest`, `sw.js`, and the two PNG icons. No build tooling or hosting credentials are required.

**Datamuse note:** As of November 2026 the Datamuse service works without an API key. Its documentation says **API keys will be mandatory on 1 February 2027**. At that point, this API-only game will need a secure server-side proxy or an alternative word API; an API key should not be embedded in publicly served JavaScript.
