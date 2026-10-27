# Dinesh Karnati portfolio

Static GitHub Pages portfolio. A compact dark homepage features four projects, three expandable projects, two primary bench captures, short profile, technical-note links, and contact. All seven case studies and three technical guides remain at their existing URLs. Tools and engineering notes are optional disclosures.

## Motion

The hero uses NullMotion's MIT-licensed HyperFrames scene builder, adapted with a capture scene for the user's existing images, and its bundled GSAP 3.14.2. Original copyright and license notices are preserved under vendor/nullmotion/ and THIRD_PARTY_NOTICES.md. Upstream commit is recorded there. No third-party ads, video, audio, editor, server, or export service is shipped.

Motion supports pause/resume and reduced motion. It pauses offscreen and when the page is hidden; real fallback imagery remains if scripts cannot initialize. focus.css controls the shared dark interface, focus.js opens disclosures for deep links, and motion.mjs composes the hero sequence and restrained entrances. Existing bench and lab scripts remain functional.

No build step. Publish main at root. Analytics remains off until an owner-controlled GoatCounter endpoint is configured.
