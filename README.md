# Personal site, v2

Yggdrasil, the Norse world tree. The name sits under the northern lights above the crown, the trunk runs down the page, and each section hangs from it under an Elder Futhark rune: Ansuz for About, Wunjo for Listening, Raidho for the current side quest, Kenaz for Projects, Othala for Coursework and Gebo for Contact. The roots close the page.

## Run it

```bash
npm install
npm run dev
```

## Make it yours

All personal text, links and featured projects are in `lib/site.ts`; coursework is in `lib/coursework.ts`; the resume is `public/resume.pdf`.

The tree is generated, not drawn by hand: `lib/tree.ts` grows a mirror-symmetric branching tree from a seed, and `app/page.tsx` sets the seeds and proportions for the crown and the roots. Change a seed to get a different tree.

## Spotify "Listening" panel

The panel shows what is playing now (or the last track played), your most played artist, and the three tracks you have played most this month. It shows "no signal" until three environment variables are set.

1. Create an app at <https://developer.spotify.com/dashboard> and add `http://127.0.0.1:8888/callback` as a redirect URI.
2. Create a file named `.env.local` in the project root with `SPOTIFY_CLIENT_ID=` and `SPOTIFY_CLIENT_SECRET=` lines, filled in from the app's settings page. The file is git-ignored.
3. Run `npm run spotify:token`, open the printed URL and approve. The script saves `SPOTIFY_REFRESH_TOKEN` into `.env.local` for you.
4. Restart the dev server. When deploying, add the same three variables to the host.

## Projects panel

Featured projects are the `projects` list in `lib/site.ts`. The contribution heatmap is read from GitHub's public calendar page, because there is no token-free API for it; if GitHub changes that page the heatmap hides itself.

## Adding a section

Add a `<Realm>` in `app/page.tsx` with a rune, its name and meaning, and a title. Give it `side="left"` or `side="right"` to hang it beside the trunk on wide screens, or leave `side` off for a full-width panel. Data that needs a secret goes behind a route in `app/api/`.
