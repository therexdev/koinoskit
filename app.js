"use strict";

// Fills the download buttons from the latest GitHub release. Falls back to
// the releases page if the API is unreachable or rate-limited.
(async function () {
  const RELEASES = "https://github.com/mikemilas/Koinos-Node/releases/latest";
  const os = detectOs();
  const primary = document.getElementById("dl-primary");
  const primaryLabel = document.getElementById("dl-primary-label");
  if (os.label) primaryLabel.textContent = ` for ${os.label}`;

  let release;
  try {
    const res = await fetch("https://api.github.com/repos/mikemilas/Koinos-Node/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error(String(res.status));
    release = await res.json();
  } catch {
    return; // buttons already point at the releases page
  }

  const assets = release.assets || [];
  const find = (re) => assets.find((a) => re.test(a.name))?.browser_download_url;
  const urls = {
    win: find(/win.*\.exe$/i) || find(/\.exe$/i),
    mac: find(/\.dmg$/i),
    linux: find(/\.AppImage$/i),
  };

  const setChip = (id, url, label) => {
    const el = document.getElementById(id);
    if (url) {
      el.href = url;
      el.hidden = false;
    } else {
      el.href = RELEASES;
      el.textContent = `${label} (releases page)`;
      el.hidden = false;
    }
  };
  setChip("dl-win", urls.win, "Windows .exe");
  setChip("dl-mac", urls.mac, "macOS .dmg");
  setChip("dl-linux", urls.linux, "Linux .AppImage");
  document.getElementById("dl-all").hidden = false;

  if (urls[os.key]) primary.href = urls[os.key];
  const version = document.getElementById("dl-version");
  if (release.tag_name) {
    version.textContent = `${release.tag_name} · Windows · macOS · Linux — free & open source (MIT)`;
  }
})();

function detectOs() {
  const p = `${navigator.platform} ${navigator.userAgent}`.toLowerCase();
  if (p.includes("win")) return { key: "win", label: "Windows" };
  if (p.includes("mac")) return { key: "mac", label: "macOS" };
  if (p.includes("linux")) return { key: "linux", label: "Linux" };
  return { key: null, label: null };
}
