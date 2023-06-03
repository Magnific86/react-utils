import { useEffect, useMemo } from "react"
import { useEvent } from "./useEvent"

export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number) {
  let timeoutId: number | null = null

  function debounced(...args: Parameters<T>) {
    if (typeof timeoutId === "number") {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = null
      fn.apply(null, args)
    }, ms)
  }

  debounced.cancel = () => {
    if (typeof timeoutId !== "number") {
      return
    }
    clearTimeout(timeoutId)
  }

  return debounced
}

export function useDebounce<Fn extends (...args: any[]) => any>(fn: Fn, ms: number) {
  const memoizedFn = useEvent(fn)

  const debouncedFn = useMemo(
    () =>
      debounce((...args: Parameters<Fn>) => {
        memoizedFn(...args)
      }, ms),
    [ms]
  )

  useEffect(
    () => () => {
      debouncedFn.cancel()
    },
    [debouncedFn]
  )

  return debouncedFn
}
