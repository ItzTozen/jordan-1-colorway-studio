import { useEffect } from 'react'

// Scroll-reveal با چک مستقیمِ rect به‌جای IntersectionObserver.
// چرا: در برخی وب‌ویوها/اسکرول‌های سریع IO ن unreliable بود و سکشن‌ها
// گاهی هرگز ظاهر نمی‌شدند. این نسخه rAF-throttle شده + یک interval امنیتی
// ۹۰۰ms دارد تا هیچ عنصری بی‌نقص نمایان نشده باقی نماند.
export default function useReveal() {
  useEffect(() => {
    const pending = () => document.querySelectorAll('.r:not([data-in])')
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pending().forEach((el) => el.setAttribute('data-in', ''))
      return
    }
    let raf = 0
    const check = () => {
      raf = 0
      const limit = innerHeight * 0.92
      pending().forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < limit && r.bottom > 0) el.setAttribute('data-in', '')
      })
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule, { passive: true })
    const iv = setInterval(check, 900)
    return () => {
      removeEventListener('scroll', schedule)
      removeEventListener('resize', schedule)
      clearInterval(iv)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}
