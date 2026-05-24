export interface ViewerRootOptions {
  className?: string;
}

export function createViewerRoot({ className }: ViewerRootOptions = {}): HTMLDivElement {
  const root = document.createElement("div");
  root.className = className ? `comimi-root ${className}` : "comimi-root";
  root.tabIndex = 0;
  root.setAttribute("role", "region");
  root.setAttribute("aria-label", "Manga viewer");
  return root;
}
