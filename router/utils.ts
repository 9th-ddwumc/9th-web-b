export function getCurrentPath(): string {
  return window.location.pathname;
}

export function navigateTo(to: string) {
  window.history.pushState(null, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
