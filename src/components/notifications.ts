import type { ViewerState } from "../types";

export function renderNotifications(state: ViewerState): HTMLElement {
  const wrap = document.createElement("div");
  wrap.className = "comimi-notifications";

  for (const notification of state.notifications) {
    const toast = document.createElement("div");
    toast.className = "comimi-toast";
    toast.dataset.tone = notification.tone ?? "info";

    const dot = document.createElement("span");
    dot.className = "comimi-toast-dot";

    const text = document.createElement("span");
    text.className = "comimi-toast-text";
    text.textContent = notification.message;

    toast.append(dot, text);
    wrap.append(toast);
  }

  return wrap;
}
