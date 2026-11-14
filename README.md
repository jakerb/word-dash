# Word Dash

A fast two-player word-guessing game with consecutive alphabet letters, a countdown, live API words, difficulty modes, and optional real-time multiplayer.

## How to play

1. Open [Word Dash](https://jakerb.github.io/word-dash/).
2. Choose **Play on one device**, **Create a two-player room** or **Join room**.
3. For a two-device game, the host creates a room and shares the eight-character code or invitation URL.
4. Both players choose their role for the round: **Describer** or **Guesser**. The selections must be different.
5. The host chooses the timer (30–300 seconds), difficulty (Easy through Impossible), and number of consecutive alphabet letters (1–26; 26 means A–Z).
6. When the host presses Start, fresh words load from Datamuse and the timer begins.
7. The describer sees all words and taps **Got it**, **Pass**, or **Missed**. The guesser sees **only the current letter, its unanswered/passed/missed state, the time, and progress**, not the answer list.
8. The two screens share the same game state, including sound/letter announcements on supported devices.
9. When you win or run out of time, both players see the outcome and all words.
10. **New game** resets the roles on both connected devices, while keeping the same room.

The original one-device mode remains available. Words are sourced from the [Datamuse API](https://www.datamuse.com/api/); there is no hardcoded fallback word bank. The app remembers recently used words locally to reduce repetition.

## Technical design

The site runs entirely on **GitHub Pages**, which is static hosting and does not host WebSocket servers. Multiplayer uses **PeerJS 1.5.5** and encrypted **WebRTC data channels** between browsers. The public PeerJS Cloud handles signalling so no separate Word Dash backend is required for casual sessions. The host is authoritative: it generates the words, advances the letter, maintains the countdown, and sends synchronised state to the guest. A guest who is guessing is **not sent the answers** before the result screen.

The room code is an unguessable random eight-character string. Rooms are ephemeral: both browser tabs must stay open, and a host leaving closes the room. This is intended for friendly games, not anti-cheating competitions; the host's browser inherently knows the words and can inspect them using developer tools.

**Reliability caveat:** the free PeerJS Cloud is a shared public service and is not guaranteed. Some restrictive networks may block peer-to-peer connections. For production-grade matchmaking or reconnection guarantees, switch to a managed realtime backend or self-hosted PeerServer with TURN support.

## PWA and updates

Install from your browser's **Add to Home Screen** or **Install App** option. The app uses a network-first service worker to fetch newly deployed GitHub Pages versions. Code updates are checked regularly and deferred during an active multiplayer game so nobody is disconnected by an automatic refresh. Multiplayer requires an internet connection, but previously cached solo screens may be usable offline (new API words still require connectivity).

## GitHub Pages

Under **Settings → Pages**, select **Deploy from a branch → main → /(root)**. The game lives at:

https://jakerb.github.io/word-dash/

No build step or API key is required for the current setup. Future changes to Datamuse's API terms or PeerJS Cloud availability may require configuration or another provider.
