# SozoRockSchool Design QA

## Comparison Target

- Source visual truth path: `qa/approved-ripple-hero.png`
- Normalized source path: `qa/approved-ripple-hero-normalized.png`
- Browser implementation screenshot path: `qa/implementation-hero-final.jpg`
- Side by side comparison path: `qa/hero-comparison-final.jpg`
- Mobile breakpoint evidence path: `qa/mobile-courses.jpg`
- Browser route: root homepage
- State: opening hero at video time 2.2 seconds, with the first ripple visible

## Viewport And Normalization

- Browser CSS viewport: 1363 by 936 CSS pixels
- Implementation screenshot: 1348 by 926 pixels at device scale factor 1
- Source visual: 1487 by 1058 pixels
- Normalization: source was proportionally resized and center cropped to 1348 by 926 pixels before side by side comparison
- Mobile check: the same running app rendered inside a measured 390 by 844 CSS pixel iframe so the actual mobile media queries were exercised

## Full View Comparison Evidence

The final side by side comparison preserves the approved composition: controlled wordmark at upper left, centered Courses, Experience, and Outcomes navigation, a persistent dark green Apply button, one dark glass panel at lower left, the stone and ripple focal point at center right, an open program list at lower right, and generous breathing room.

The implementation intentionally opens on the first ripple rather than the approved still image's four ripples. Scroll scrubbing expands the remaining ripples and carries the message into the second hero stage. The full Cybersecurity Identity and Access Management course name is retained even though it wraps to two lines, because the complete program identity is a product requirement.

## Focused Region Comparison Evidence

A separate crop was not needed. The native hero screenshots keep the wordmark, navigation, glass panel typography, program list, CTA, stone, ripple, and scroll indicator readable at full resolution. The mobile course capture was reviewed separately because responsive wrapping and section hierarchy could not be judged reliably from the desktop comparison.

## Required Fidelity Surfaces

- Fonts and typography: Inter loads only inside the SozoRockSchool surface. White display text, restrained wordmark scale, weight contrast, line height, and tracking match the approved editorial tone. The full IAM name wraps cleanly without clipping.
- Spacing and layout rhythm: the hero keeps the approved left panel and right program split. Downstream sections use open editorial bands and rules rather than cards. Desktop and 390 pixel layouts have no horizontal overflow or clipped controls.
- Colors and visual tokens: deep mineral green, charcoal, cool dawn blue, pale morning reflection, pure white type, and a single dark green CTA match the selected direction. No cream, purple, cyan, neon, or decorative gradient system was introduced.
- Image quality and asset fidelity: five high resolution water and stone frames were generated in one art direction and encoded into a decoder friendly yuv420p MP4. The video remains paused and is scrubbed through currentTime. Reduced motion uses the final still image.
- Copy and content: all four programs are visible in the hero and expanded in the Courses section. Copy remains concise, specific, and focused on applied capability, trust, work, business, and life.
- Accessibility and behavior: semantic sections and headings, visible keyboard focus, labelled form fields, required inputs, reduced motion support, and a functional success state are present.

## Comparison History

### Pass 1

- P1: The first implementation wordmark was too dominant and the navigation was effectively absent at the opening frame.
  - Fix: reduced the wordmark from 63 pixels to 43.6 pixels at the desktop viewport and kept navigation at 92 percent opacity from the opening frame.
  - Post fix evidence: `qa/implementation-hero-final.jpg`.
- P2: The opening frame showed a levitating stone with no visible impact, weakening the approved concept.
  - Fix: moved the opening seek time to 2.2 seconds and changed the poster to the first impact frame so one ripple is already visible.
  - Post fix evidence: `qa/implementation-hero-final.jpg`.
- P2: The initial MP4 encoded as yuv444p, which has weaker browser compatibility.
  - Fix: re-encoded the final scroll asset as H.264 yuv420p with fast start metadata.
  - Post fix evidence: browser video readyState 4, duration 8.6 seconds, paused true.

### Pass 2

- P2: Jumping directly to Courses left the sticky hero above the section at the exact boundary.
  - Fix: isolated the hero stacking context at z index 1 and placed Courses at z index 2.
  - Post fix evidence: Courses lands at top 0 with its heading and program rows visible.
- P2: Mobile behavior required direct breakpoint evidence.
  - Fix: rendered the running app at 390 by 844 CSS pixels and checked the hero, course heading, first course row, text wrapping, and absence of horizontal overflow.
  - Post fix evidence: `qa/mobile-courses.jpg`.

## Browser Verification

- Page title matched `SozoRockSchool — Build the Technology. Earn the Trust.`
- The DOM contained meaningful hero, Courses, Experience, Outcomes, Apply, and legal footer content.
- No framework error overlay was present.
- No application console warnings or errors remained. Browser extension metadata errors were excluded as unrelated to the app.
- The paused video's currentTime changed with scroll and visible ripple frames changed.
- Courses navigation landed on the course section.
- Apply navigation landed on the application section.
- Name, email, and program fields accepted input.
- Submitting the form produced the visible `Your interest is recorded.` success state.
- Build and Sites worker tests passed.

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow Up Polish

- P3: Replace the prototype application success action with a production admissions endpoint when the backend is available.

## Final Result

final result: passed
