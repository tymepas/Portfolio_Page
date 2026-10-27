/**
 * Moves focus to the target of an in-page link once navigation has scrolled to
 * it. Next.js scrolls to hash targets but leaves focus where it was, so without
 * this keyboard and screen reader users would continue from the link they used.
 */
export function focusSection(hash: string) {
  const id = decodeURIComponent(hash.replace(/^.*#/, ""));
  if (!id) return;

  requestAnimationFrame(() => {
    const target = document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
}
