# Desktop Companion — Dinesh Karnati

An AI-assisted personal desktop companion project created with ChatGPT. The recorded demo shows an animated puppy, desktop controls, and an on-screen prompt interaction.

[Watch the portfolio demo](https://denishkarnati.github.io/#desktop-companion) · [Open the MP4](https://denishkarnati.github.io/media/desktop-companion-demo.mp4)

## My contribution

I created this companion with ChatGPT and recorded it running on my desktop. This is a personal creative experiment alongside my embedded firmware projects.

## How to view it

1. Open the portfolio demo above.
2. The silent recording loops when visible. Use the video controls to pause, seek, replay, or view fullscreen.
3. Visitors who prefer reduced motion start with a still preview and can press Play.

The on-screen puppy and prompt controls belong to the recording; they are not live agent controls on the portfolio.

## Website implementation

- HTML5 video with native keyboard-accessible controls, inline mobile playback, and a poster image.
- A short JavaScript observer starts playback when the video first enters view and respects the reduced-motion preference. If autoplay is blocked, visitors can press Play.
- H.264 MP4, 512 × 356, approximately 27 seconds, 20 frames per second. The website copy is silent and optimized from my supplied screen recording.
- Static hosting on GitHub Pages. No agent backend, microphone access, or visitor prompts are collected by this demo.

## Repository contents

The website player is in `/index.html`, `/companion-video.js`, and `/focus.css`. The recording is `/media/desktop-companion-demo.mp4`.

This repository contains the portfolio presentation and recorded demo. The desktop companion implementation and ChatGPT conversation are not included.
