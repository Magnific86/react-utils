import { AnyObject } from "../types"

export const findBy = <T extends AnyObject, K extends keyof T>(items: T[], key: K, value: T[K]) => {
  return items.find(item => item[key] === value)
}

export function rafThrottle<T extends (...args: any[]) => any>(fn: T) {
    let rafId: number | null = null
  
    function throttled(...args: Parameters<T>) {
      if (typeof rafId === "number") {
        console.log("cancel")
        return
      }
  
      rafId = requestAnimationFrame(() => {
        fn.apply(null, args)
        rafId = null
      })
    }
  
    throttled.cancel = () => {
      if (typeof rafId !== "number") {
        return
      }
      cancelAnimationFrame(rafId)
    }
  
    return throttled
  }
  
