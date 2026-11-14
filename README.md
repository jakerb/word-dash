# Word Dash

A fast, two-player alphabet guessing game. One player describes the word, the other guesses it. Get ten words right before the clock runs out!

## How to play

1. Choose a round length (30, 45, 60, 90 or 120 seconds).
2. Press **Start round** to reveal ten words on consecutive letters of the alphabet and start the audible countdown.
3. Tap **👍 Got it** for a correct answer (green), **⏭ Pass** to skip and retry later (yellow), or **👎 Missed** to mark incorrect and retry later (red).
4. Passed and missed words return after the initial sweep. Win by turning the entire board green before the timer hits zero.
5. Use **New round** at any time to reset with a new letter sequence and new words.

Words are fetched from the free [Datamuse API](https://www.datamuse.com/api/) when it is available, with an offline word bank as a fallback. Best clearing times are stored locally in the browser, separately for each timer duration. Audio is generated using the browser's Web Audio API, and no account or backend is required.

## Run locally

Open `index.html` in a modern browser. No build tools are required.

## Publish with GitHub Pages

1. Open **Settings → Pages**. Under **Build and deployment** select **Deploy from a branch**, then `main` and `/(root)`, and click **Save**.
2. After GitHub has published, open `https://jakerb.github.io/word-dash/`.

No server-side configuration, credentials, or API key is needed at present; the Datamuse API may require an API key from February 2027, in which case the bundled word bank continues working.