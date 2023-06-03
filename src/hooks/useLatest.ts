import { useLayoutEffect, useCallback, useRef } from "react"

export const useLatest = <Value>(value: Value) => {
  const valueRef = useRef(value)

  useLayoutEffect(() => {
    valueRef.current = value
  })

  return valueRef
}

export const useLatestWithGetter = <T>(value: T) => {
  const valueRef = useRef(value)

  useLayoutEffect(() => {
    valueRef.current = value
  })

  const getter = useCallback(() => valueRef.current, [])

  return getter
}
