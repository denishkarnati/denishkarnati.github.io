# Dinesh Karnati portfolio

Static GitHub Pages portfolio. A compact dark homepage features four projects, three expandable projects, two primary bench captures, short profile, technical-note links, and contact. All seven case studies and three technical guides remain at their existing URLs. Tools and engineering notes are optional disclosures.

## Motion

The hero uses NullMotion's MIT-licensed HyperFrames scene builder, adapted with a capture scene for the user's existing images, and its bundled GSAP 3.14.2. Original copyright and license notices are preserved under vendor/nullmotion/ and THIRD_PARTY_NOTICES.md. Upstream commit is recorded there. No third-party ads, video, audio, editor, server, or export service is shipped.

Motion supports pause/resume and reduced motion. It pauses offscreen and when the page is hidden; real fallback imagery remains if scripts cannot initialize. focus.css controls the shared dark interface, focus.js opens disclosures for deep links, and motion.mjs composes the hero sequence and restrained entrances. Existing bench and lab scripts remain functional.

No build step. Publish main at root. Analytics remains off until an owner-controlled GoatCounter endpoint is configured.

## Desktop Companion

A recorded AI-assisted personal project appears after the engineering captures. See [project notes](projects/desktop-companion/README.md) for viewing instructions, attribution, and the website player implementation.

## Interactive systems studio

`interactive.js` and `interactive.css` implement three browser-local illustrations using SVG and requestAnimationFrame. Embedded: a 64-sample queue, 16 samples per simulated BLE event, adjustable input rate and connection interval. IoT: a simulated Wi-Fi link, MQTT command flow, round-trip delay and switch output. AI: scripted SPI/BLE debugging scenarios with human review and bench verification. These do not connect to hardware, a real broker or an AI API, and their synthetic counters are not project measurements.

All controls work with keyboard input. Motion can be paused; reduced-motion starts the models paused. The frame loop advances model state only while visible and the page is active. Component inspection remains available while paused.

## Signal-first project viewers

The homepage now leads to the pressure morphology and wearable signal viewers. `signals.js` renders annotated single-beat shapes and six-second synthetic traces with readable axes. Phantom controls: heart rate, systolic/diastolic levels and a clear/smoothed contour. Wearable controls: PPG versus a normalized pressure-channel example, heart rate and synthetic motion disturbance. It distinguishes ECG as an electrical modality, without claiming an ECG acquisition channel. Existing screenshots are separate raw-data evidence, not the model's input.

The hand-shaped curves use smooth piecewise interpolation, scaled and repeated at the selected rate. They are illustrative, not a validated cardiovascular model or measured project results. Feature references are linked in the viewers. The former generic homepage systems tabs and wearable transport-first controls are no longer displayed; their source assets remain for history. The Lucid command/watchdog model is unchanged.
