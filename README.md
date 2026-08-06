# koinoskit.site

Static website for **KoinosKit** (Koinos Node Desktop) — served with GitHub
Pages at https://koinoskit.site. The app itself lives in
[mikemilas/Koinos-Node](https://github.com/mikemilas/Koinos-Node); download
buttons on the site pull the latest release automatically from the GitHub API.

## One-time setup (repo owner)

1. **Enable Pages**: repo *Settings → Pages* → Source: **Deploy from a
   branch** → Branch: **main**, folder **/ (root)** → Save.
2. **Custom domain**: on the same page enter `koinoskit.site` and Save (the
   `CNAME` file in this repo keeps it set across pushes).
3. **DNS at your domain registrar** for `koinoskit.site`:

   | Type  | Host | Value |
   | ----- | ---- | ----- |
   | A     | `@`  | `185.199.108.153` |
   | A     | `@`  | `185.199.109.153` |
   | A     | `@`  | `185.199.110.153` |
   | A     | `@`  | `185.199.111.153` |
   | CNAME | `www` | `mikemilas.github.io` |

4. Back in *Settings → Pages*, wait for the DNS check to pass, then tick
   **Enforce HTTPS** (the certificate can take a few minutes to issue).

DNS changes can take up to a few hours to propagate. After that, every push
to `main` redeploys the site automatically.

## Files

- `index.html`, `styles.css`, `app.js` — the site (no build step, no
  dependencies)
- `img/` — app screenshots and icon (from the app repository)
- `CNAME` — custom-domain binding for GitHub Pages
