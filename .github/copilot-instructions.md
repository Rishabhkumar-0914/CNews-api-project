## Quick orientation

This is a very small static website (HTML/CSS/JS) that fetches news from NewsAPI and shows a country flag background for visual context. There is no build system, no server-side code in this repo — open in a browser or run a simple static server for development.

Core files to inspect:
- `index.html` — main UI (search input, news container, link to login)
- `script.js` — all client logic: NewsAPI calls, `countryFlags` mapping, DOM updates
- `Login.html` — local/dummy login form (credentials in-page)
- `style.css` — visual styles and layout

What an AI agent should know (high value, actionable items):

1. Architecture & intent
- Single-page static app. Client-side obtains news from https://newsapi.org using an API key defined at the top of `script.js` (variable `apiKey`).
- The UI uses a country->flag mapping (`countryFlags`) and sets `document.body.style.backgroundImage` to show the flag for the searched place.

2. Where to change behavior or data
- To change the API key, edit the `apiKey` constant at the top of `script.js`.
- Default search is executed at load via `fetchNews('India')` — change or remove that call to alter default behavior.
- Country/flag mapping lives in `script.js` (object `countryFlags`). Add or update keys (e.g., `"Canada": "https://flagcdn.com/w320/ca.png"`).

3. Integration and external dependencies
- News provider: `https://newsapi.org/v2/everything?q=...&apiKey=...` (client-side fetch).
- Flags: `https://flagcdn.com` (image backgrounds). Both are external network dependencies.
- Important: the project currently stores an API key directly in `script.js`. Treat it as a secret when editing or committing changes — moving the key server-side is recommended but out-of-scope for this repo.

4. Development & debugging workflows (concrete)
- No build step. To run locally (recommended to avoid file:// restrictions and CORS quirks), serve the folder with a lightweight static server. Example (PowerShell):

```powershell
# If you have Python installed
python -m http.server 8000

# Then open http://localhost:8000/index.html in your browser
```

- Alternatively use any static server (VS Code Live Server extension, `http-server` from npm, etc.).
- Browser DevTools: check Console for fetch errors (API key issues, rate limits, CORS). `script.js` logs fetch errors to the console.

5. Project-specific conventions & gotchas
- Filename case: the repo uses `Login.html` (capital L) but `index.html` links to `login.html` (lowercase) — works on Windows but will break on case-sensitive hosts. When editing, prefer the lowercase `login.html` filename or update references consistently.
- UI behavior: `displayNews()` sets `document.body.style.backgroundImage` using the `countryFlags` map; if a place is not in the map a placeholder is used. Keep this in mind when adding regions/topics.
- Dummy auth: `Login.html` performs a client-side check for credentials `admin` / `admin123`. This is purely cosmetic — do not treat as real auth.

6. Safety & security notes for agents
- Do not expose or publish the API key found in `script.js`. If you must modify it in a PR, redact or replace with a placeholder and add instructions in the change describing how to provide a real key (env/secret manager).

7. Example edits an agent might perform (explicit, small tasks)
- Add a new country flag for "Canada": edit `script.js` and add `"Canada": "https://flagcdn.com/w320/ca.png"` to `countryFlags`.
- Change default load from India to Global headlines: update `fetchNews('India')` → `fetchNews('global')` (or remove default call to show an empty state).
- Fix filename case: rename `Login.html` → `login.html` and update the reference in `index.html`.

8. Files to open first when editing
- `script.js` (most important)
- `index.html`
- `style.css`

If anything in this document is unclear or you want a stricter convention (for example: moving the API key to an environment-backed config or adding a minimal test harness), tell me which direction you prefer and I will update these instructions or implement the change.

-- End of instructions
