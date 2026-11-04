import * as React from "react"

const MOBILE_BREAKPOINT = 768

function subscribe(callback: () => void) {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function getSnapshot() {
  return window.innerWidth < MOBILE_BREAKPOINT
}

function getServerSnapshot() {
  return false
}

export function useIsMobile() {
  // useSyncExternalStore is the React-recommended way to subscribe to a
  // browser media query: no setState-in-effect, no hydration mismatch
  // (server snapshot returns false; client hydrates to the real value).
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
