# Test Plan — `Mytests/seed.spec.ts`

## Executive summary

This test plan covers the Playwright test `Mytests/seed.spec.ts`, which currently performs a navigation to `https://demo.guru99.com/`.

Goal: validate the page navigation, baseline page health and stability, and provide a set of concrete, runnable test scenarios that QA can follow and automate. This plan assumes a fresh browser context and network connectivity.

## Application / Page overview

Target: demo.guru99.com (landing/home page)

Primary behaviors to verify:
- Page loads successfully and within acceptable performance limits
- Key page elements render and are interactable (title, header, main navigation, primary calls-to-action)
- Navigation to important links (login/register/tutorials) works and opens correctly
- Basic accessibility and responsiveness checks

Note: The site may contain multiple sub-pages, iframes, or third-party widgets. Tests below are written to be safe for a generic public landing page and include exploratory steps to discover important interactive elements.

## Assumptions and starting state

- Tests start with a blank / fresh browser context (no cookies, no localStorage)
- Network access to `https://demo.guru99.com/` is available and not blocked by firewall/enterprise rules
- The tester will run tests on a machine with Playwright installed (see "How to run")
- If the site shows geolocation-based or A/B content, some steps include guidance on how to handle variation

## Success criteria

- Page navigation does not throw exceptions and returns HTTP 200-ish responses (no blocking errors)
- Key elements load and are visible and actionable (see expected results in each scenario)
- Tests are deterministic and pass consistently in CI on stable network

## Failure conditions

- Page fails to load (navigation timeout or network error)
- Critical interactive elements are missing or throw errors when clicked
- Layout breaks in supported viewport sizes

---

## Test scenarios

For each scenario assume a fresh browser context unless the scenario explicitly states otherwise.

### Scenario 1 — Basic navigation & page load (Happy path)

Assumption: Fresh browser context.

Steps:
1. Navigate to `https://demo.guru99.com/`.
2. Wait for the network to be idle and for the main content area to be visible (e.g., an element such as `main`, `#container`, or a prominent heading).
3. Capture the page title and verify it contains an expected fragment (e.g., `Guru99` or other branding).
4. Verify the HTTP response status for main document was 200 (where test tooling supports request interception/monitoring).

Expected results:
- The page finishes navigation without uncaught exceptions or navigation errors.
- The page title contains the expected branding.
- The main content element is visible within the default test timeout (e.g., 5–10s).

Success criteria:
- Test passes without uncaught errors and assertions succeed.

Failure conditions:
- Navigation timeout, page throws a large console error, or main content fails to appear.

---

### Scenario 2 — Key element presence and interactability

Assumption: Fresh browser context and page has loaded (best started from Scenario 1).

Steps:
1. Identify and assert visibility of the following (if present on the landing page):
   - Main site header/logo
   - Primary navigation (menu links)
   - Any prominent call-to-action buttons (e.g., "Login", "Register", "Tutorials")
2. For each link/button discovered:
   - Ensure it has a non-empty href (for links) or is clickable (for buttons)
   - Click one non-destructive link (e.g., "Tutorials" or "About") and confirm navigation to a new page or route (or a modal opens). Use back() to return.

Expected results:
- All enumerated elements are visible and have expected semantics (links have hrefs, buttons are enabled).
- Clicking a non-destructive link navigates away or reveals content without page errors.

Success criteria:
- At least one navigation from the landing page succeeds and returns a page with a visible heading or unique element.

Failure conditions:
- Links are missing hrefs, buttons disabled unexpectedly, or clicking causes JavaScript errors or dead pages.

---

### Scenario 3 — Responsive layout check (mobile and desktop)

Assumption: Fresh browser context.

Steps:
1. Load the page in a desktop viewport (e.g., 1280x800) and confirm main layout renders (header, hero, content blocks).
2. Reload/visit the page in a mobile viewport (e.g., 375x812) and confirm responsive layout adapts (menu collapses to hamburger, content stacks vertically).
3. For both viewports, check that primary CTA is visible and clickable.

Expected results:
- Page adapts layout between desktop and mobile without content overflowing or missing critical controls.

Success criteria:
- Key CTAs remain accessible in both viewports and no content is clipped or unreadable.

Failure conditions:
- Layout breaks (overlaps, unreadable text) or CTAs become inaccessible in any supported viewport.

---

### Scenario 4 — Accessibility sanity checks

Assumption: Fresh browser context.

Steps:
1. Run basic checks:
   - Ensure the page has a non-empty <title> and at least one H1/H2 heading.
   - Verify interactive elements have accessible names (buttons/links have text or aria-label).
2. Keyboard tab navigation:
   - Tab through top-level interactive elements and confirm focus is visible and order is logical.

Expected results:
- Page includes a title and logical heading structure.
- Focus order is sensible; interactive elements expose accessible names.

Success criteria:
- No glaring accessibility blockers for keyboard navigation and landmark presence.

Failure conditions:
- No page title, missing headings, or interactive controls lacking accessible names.

---

### Scenario 5 — External links and new tab behavior

Assumption: Some links open external resources.

Steps:
1. Locate any links that indicate external navigation (target=_blank or external icon).
2. Click one such link and confirm a new tab/window is opened or that the link is navigable without breaking the current page state.
3. If a new tab is opened, make sure the original page remains functional when focus returns.

Expected results:
- External links open in a new tab/window or navigate away intentionally; original page remains stable.

Success criteria:
- External link behavior matches the expected UX and does not break the app.

Failure conditions:
- External link opens in same tab unexpectedly, or causes script errors.

---

### Scenario 6 — Simulated error/slow network handling

Assumption: Test harness can throttle network or simulate failed requests (Playwright supports route/fallback).

Steps:
1. Simulate a slow network (e.g., 3G) and reload the page. Observe time-to-first-paint and whether critical UI eventually appears.
2. Simulate network failure for a subresource (e.g., ad/analytics script) and confirm the main page still renders and does not crash.

Expected results:
- Page loads in degraded mode under slow networks; the main content remains accessible.
- Subresource failures do not produce uncaught exceptions that break the page.

Success criteria:
- Page is resilient to slower networks and missing third-party resources.

Failure conditions:
- Page crashes on missing scripts or becomes unusable under slow networks.

---

### Scenario 7 — Negative tests: invalid content and navigation

Assumption: Guest user and fresh context.

Steps:
1. Attempt to navigate to a non-existent page path (e.g., `https://demo.guru99.com/non-existent-page`) and confirm the site handles 404 gracefully.
2. If there is a form on the landing page (search, newsletter), attempt to submit invalid input (e.g., too-long values, missing required fields) and verify client-side validation and error messages.

Expected results:
- 404 pages display a user-friendly message.
- Forms validate inputs and provide correct error messaging for invalid submissions.

Success criteria:
- Errors are handled gracefully and produce user-friendly feedback.

Failure conditions:
- Unhandled exceptions or stack traces surfaced to the user; forms accept invalid data without validation.

---

## Test data and environment notes

- No special user accounts are required for the above scenarios; tests target a public landing page.
- If the landing page exposes user flows that need accounts (login/register), create separate test plans with seeded test accounts and include account lifecycle cleanup.

## Test automation tips (Playwright)

- Use `page.goto('https://demo.guru99.com/', { waitUntil: 'networkidle' })` for stable load detection.
- Prefer `locator` based assertions (e.g., `await expect(page.locator('header')).toBeVisible()`).
- Where possible, assert network responses with `page.waitForResponse()` to confirm status codes.
- Use `test.use({ viewport: { width, height } })` or `page.setViewportSize()` for responsive tests.
- To simulate slow networks or failed subresources, use `page.route()` to emulate throttling or abort responses.

## How to run (PowerShell on Windows)

Run a single test (seed):

```powershell
# from the repository root (d:\Playwright_Demo)
npx playwright test Mytests/seed.spec.ts -g "seed" --headed
```

Run the new test plan scenarios manually (recommended for exploratory or manual QA):
- Follow the numbered steps in each scenario in a fresh browser session.

Run all Playwright tests:

```powershell
npx playwright test
```

If you want to run with debugging and slowMo:

```powershell
npx playwright test Mytests/seed.spec.ts -g "seed" --headed --debug
```

## Artifacts to collect on failure

- Playwright trace (use `await trace.start({ snapshots: true, screenshots: true })` and `await trace.stop()`)
- Screenshots and video (Playwright config can enable them)
- Browser console logs and network HARs for failing flows

## Next steps and recommendations

- Implement one or two automated assertions in `Mytests/seed.spec.ts` beyond navigation (e.g., assert title and a visible header). This turns the seed into a stable smoke test.
- Add a deterministic selector for a stable element to assert page readiness (logo, main heading, or a unique container).
- If the site includes authentication flows, create a separate secure test plan for account-based tests with ephemeral test accounts.
- Add small automated tests for responsive checks and basic accessibility (title + heading + keyboard focus) as smoke tests in CI.

---

## Contact / ownership

Prepared by the QA automation authoring the Playwright tests. For questions about the site structure or if the site contents differ from these assumptions, re-run an exploratory session and update this plan accordingly.


---

_File location: `Mytests/seed.test-plan.md`_
