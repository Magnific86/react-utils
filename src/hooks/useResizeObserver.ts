import React, { RefObject, useCallback, useEffect, useRef } from "react"

interface resizeObserverHookOptions {
  elementRef: RefObject<HTMLElement>
  onResize: ResizeObserverCallback
}

export const useResizeObserver = ({ elementRef, onResize }: resizeObserverHookOptions) => {
  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return
    }
    const observer = new ResizeObserver(onResize)
    observer.observe(element)
    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, onResize])
}

export const useResizeObserver2 = (onResize: ResizeObserverCallback) => {
  const observerRef = useRef<ResizeObserver | null>(null)

  const attachResizeObserver = useCallback(
    (el: HTMLElement) => {
      const observer = new ResizeObserver(onResize)
      observer.observe(el)
      observerRef.current = observer
    },
    [onResize]
  )

  const detachResizeObserver = useCallback((el: HTMLElement) => {
    observerRef.current?.disconnect()
  }, [])

  const refCb = useCallback(
    (el: HTMLElement) => {
      if (el) {
        attachResizeObserver(el)
      } else {
        detachResizeObserver(el)
      }
    },
    [attachResizeObserver, detachResizeObserver]
  )
  return refCb
}
