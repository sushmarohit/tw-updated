/**
 * Same-origin file download with a suggested filename.
 *
 * Many browsers ignore `download` on `<a href="/file.pdf">` and open the PDF inline.
 * Fetching into a Blob and using a temporary `blob:` URL + `download` usually forces a save.
 * If fetch fails (404, offline), falls back to a direct anchor on the original path.
 */
export async function downloadSameOriginFileWithForceFallback(
  path: string,
  filename: string
): Promise<void> {
  if (typeof window === 'undefined') return;

  const clickAnchor = (href: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const absoluteUrl = new URL(path, window.location.origin).href;

  try {
    const res = await fetch(absoluteUrl, {
      credentials: 'same-origin',
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    try {
      clickAnchor(objectUrl);
    } finally {
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2500);
    }
  } catch {
    clickAnchor(path);
  }
}
