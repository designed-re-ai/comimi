export function bindScrollFade(el: HTMLElement): void {
  el.classList.add("comimi-scrollfade");

  const update = () => {
    const { scrollTop, scrollHeight, clientHeight } = el;
    el.dataset.scrollUp = String(scrollTop > 0);
    el.dataset.scrollDown =
      String(scrollTop + clientHeight < scrollHeight - 1);
  };

  el.addEventListener("scroll", update, { passive: true });

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (el.firstElementChild) {
      observer.observe(el.firstElementChild);
    }
  }

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(update);
  } else {
    update();
  }
}
