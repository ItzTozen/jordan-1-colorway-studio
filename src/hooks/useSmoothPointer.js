import { useEffect } from 'react'

// Writes a rAF-lerped pointer position (-0.5..0.5) into :root as --px/--py,
// plus --sy (scrollY). CSS layers consume the vars for parallax/tilt, so no
// component re-renders on pointer move.
export default function useSmoothPointer() {
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf
    const onMove = (e) => {
      tx = e.clientX / innerWidth - 0.5
      ty = e.clientY / innerHeight - 0.5
    }
    const onLeave = () => {
      tx = 0
      ty = 0
    }
    const tick = () => {
      cx += (tx - cx) * 0.075
      cy += (ty - cy) * 0.075
      const s = document.documentElement.style
      s.setProperty('--px', cx.toFixed(4))
      s.setProperty('--py', cy.toFixed(4))
      s.setProperty('--sy', String(window.scrollY | 0))
      raf = requestAnimationFrame(tick)
    }
    addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])
}
