# Word Dash — word games

[word-dash.site](https://word-dash.site/) hosts a collection of browser word games. The homepage (`/index.html`) lists every game; each game lives in its own subfolder.

| Game | Folder | URL |
| --- | --- | --- |
| Word Dash | `word-dash/` | https://word-dash.site/word-dash/ |
| Reverse | `reverse/` | https://word-dash.site/reverse/ |

To add a game: create a new subfolder with its own `index.html` (use relative paths), then add a card for it to the list in the root `index.html`. If the game uses a service worker, register it with a scope limited to its folder and give its caches a unique name prefix.

The root `sw.js` is a retired worker that unregisters the old root-scoped install from before the move.

---

## Word Dash

A fast two-player word-guessing game with consecutive alphabet letters, a countdown, live API words, difficulty modes, and optional real-time multiplayer.

### How to play

1. Open [Word Dash](https://word-dash.site/word-dash/). First-time players see a **four-step How to play guide**: the goal, controls and timer, clue-giving tips, and choosing One Device or Duo. Use **Back** and **Next** to navigate; finishing opens the game-mode selector. The modal opens at the top and won't auto-appear after you've completed it on that device. Reopen it using **How to play** on the mode picker or the **📖 / ❔** buttons in the game.
2. Choose **Play on one device**, **Create a two-player room** or **Join room**.
3. For a two-device game, the host creates a room and taps **Share invite** to open the phone or tablet's native share sheet (Messages, WhatsApp, AirDrop, etc.). The invite includes the room URL and code. **Copy invite** remains available, and is used as a fallback if native sharing is unsupported.
4. Both players choose their role for the round: **Describer** or **Guesser**. The selections must be different.
5. The host chooses the timer (30–300 seconds), difficulty (Easy through Impossible), and number of consecutive alphabet letters (1–26; 26 means A–Z).
6. When the host presses Start, fresh words load from Datamuse and the timer begins.
7. The describer sees all words and taps **Got it**, **Pass**, or **Missed**. The guesser sees **only the current letter, its unanswered/passed/missed state, the time, and progress**, not the answer list.
8. The two screens share the same game state, including sound/letter announcements on supported devices.
9. When you win or run out of time, both players see the outcome and all words.
10. **New game** resets the roles on both connected devices, while keeping the same room.

The original one-device mode remains available. Words are sourced from the [Datamuse API](https://www.datamuse.com/api/); there is no hardcoded fallback word bank. Duo loads words with a lighter first request, retries with alternative API requests when necessary, and displays loading progress and specific failure details on both devices so a failing letter cannot go unnoticed. **All difficulties now use single-word answers only** (no spaces, hyphens, or phrases). **Easy prioritises familiar, high-frequency nouns** instead of choosing random dictionary words; for uncommon starting letters, it gently broadens the selection while staying API-only. The app remembers recently used words locally to reduce repetition.

The audio button uses the shorter labels **Mute** and **Unmute** (for countdown beeps and spoken letters).

### Technical design

The site runs entirely on **GitHub Pages**, which is static hosting and does not host WebSocket servers. Multiplayer uses **PeerJS 1.5.5** and encrypted **WebRTC data channels** between browsers. The public PeerJS Cloud handles signalling so no separate Word Dash backend is required for casual sessions. The host is authoritative: it generates the words, advances the letter, maintains the countdown, and sends synchronised state to the guest. A guest who is guessing is **not sent the answers** before the result screen.

The room code is an unguessable random eight-character string. Rooms are ephemeral: both browser tabs must stay open, and a host leaving closes the room. This is intended for friendly games, not anti-cheating competitions; the host's browser inherently knows the words and can inspect them using developer tools.

**Networking:** Duo works over the internet, so both devices must have an active network connection. It works whether the devices are on the same Wi-Fi or on different networks. **Reliability caveat:** the free PeerJS Cloud is a shared public service and is not guaranteed. Some restrictive networks may block peer-to-peer connections. For production-grade matchmaking or reconnection guarantees, switch to a managed realtime backend or self-hosted PeerServer with TURN support.

### PWA and updates

Install from your browser's **Add to Home Screen** or **Install App** option. The app uses a network-first service worker to fetch newly deployed GitHub Pages versions. Code updates are checked regularly and deferred during an active multiplayer game so nobody is disconnected by an automatic refresh. Multiplayer requires an internet connection, but previously cached solo screens may be usable offline (new API words still require connectivity).

### GitHub Pages

Under **Settings → Pages**, select **Deploy from a branch → main → /(root)**. The site is available on the custom domain:

https://word-dash.site/ (games list) — Word Dash itself is at https://word-dash.site/word-dash/

No build step or API key is required for the current setup. Future changes to Datamuse's API terms or PeerJS Cloud availability may require configuration or another provider.

---

## Reverse

A pass-and-play party game for 2–12 players on one device.

1. Choose how many people are playing and (optionally) enter their names in seating order. First-time players see a four-step **How to play** guide, which can be reopened with **❔ How to play**.
2. On your turn you're shown a celebrity name. Record yourself saying it.
3. The name is hidden and your recording plays **backwards**. Listen as often as you like, then record yourself copying that backwards sound.
4. Pass to the next player. They hear your copy reversed (which should sound like the original name) and guess out loud.
5. Reveal the answer and tap **Got it!** (the recorder scores +1) or **Didn't get it**. The guesser takes the next turn, round the circle.
6. The first player to **10 points** wins.

### Technical notes

- **Celebrity names are live, with no hardcoded list.** The game combines the [Wikimedia pageviews API](https://doc.wikimedia.org/generated-data-platform/aqs/analytics-api/) (the 500 most-read English Wikipedia articles over the last three months) with Wikipedia's [short descriptions](https://www.mediawiki.org/wiki/API:Main_page). It keeps people whose description mentions film, music, sport or TV, and excludes politics, crime and adult content. The list is cached in `localStorage` for a week, and an older cached list is used if a refresh fails. Recently used names are remembered so they don't repeat.
- **Audio** is captured as raw PCM through the Web Audio API (an AudioWorklet, with a ScriptProcessor fallback), so reversing works the same in every browser. Silence is trimmed and the volume normalised. The microphone is released after each recording. Recordings stay in memory for the current turn only and are never uploaded.
- Scores are saved in `localStorage`, so an unfinished game can be resumed after a reload.
- Recording requires HTTPS (GitHub Pages) or `localhost`.
