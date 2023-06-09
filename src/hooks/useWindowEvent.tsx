import React, { useEffect, useState } from "react"
import { useLatestWithGetter } from "./useLatest"

type GetWindowEvent<Type extends string> = Type extends keyof WindowEventMap ? WindowEventMap[Type] : Event

function useWindowEvent<Type extends string>(type: Type, cb: (event: GetWindowEvent<Type>) => void): void

function useWindowEvent(type: string, cb: (event: Event) => void) {
  const getterCb = useLatestWithGetter(cb)

  useEffect(() => {
    const handler = (event: Event) => {
      getterCb()(event)
    }

    window.addEventListener(type, handler)

    return () => window.removeEventListener(type, handler)
  }, [type, getterCb])
}

function UseWindowEventExample() {
  const [{ x, y, diffX, diffY }, setMousePosition] = useState({
    x: 0,
    y: 0,
    diffX: 0,
    diffY: 0,
  })

  useWindowEvent("mousemove", e => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
      diffX: e.clientX - x,
      diffY: e.clientY - y,
    })
  })

  return (
    <div>
      <h4>mouse position</h4>
      X: {x}
      Y: {y}
      <h4>Diff from prev position</h4>
      X: {diffX}
      Y: {diffY}
    </div>
  )
}
