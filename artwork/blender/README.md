# Editable Blender hero motion

Medium: 2.5D camera projection. This is a new Blender project built from this market’s own approved raster artwork, not the recovered full architectural model. The packed artwork remains visually faithful; the editable shallow relief mesh, UV coordinates and looping camera create subtle depth motion. No third-party models or textures were downloaded. The draft full-geometry model was rejected because it reduced visual quality.

## Files

- open-school.blend: desktop projection, packed local artwork and editable camera.
- open-school-mobile.blend: portrait projection with its own approved mobile artwork.
- build_open_school.py: deterministic scene creation and rendering script.

Blender 4.0/Eevee produces 96 frames at 24 fps, a four-second loop. Frame 97 matches frame 1. FFmpeg transcodes the local WebP into PNG for Blender texture compatibility, preserving its decoded pixels; H.264/yuv420p/faststart encodes the browser video. No remote asset request is required to reproduce the scene. The workflow runs on the artwork/open-school-blender branch, has no AWS credentials and commits only generated media. Production promotion is separate.

## Browser behaviour

The approved still loads first. Play motion downloads the appropriate desktop or mobile video from this site's own origin. Playback is silent, loops and can be paused. Motion pauses outside the viewport and when the tab is hidden. Reduced-motion visitors keep the still. Crossing the mobile breakpoint restores the still and selects the correct movie on the next play. Failed playback restores the artwork with an availability message. No-JavaScript visitors retain all content and the static hero.

All artwork is conceptual virtual learning, not physical premises or actual learners. The Canadian social card is a separate Canadian composition and is not replaced by this animation.
