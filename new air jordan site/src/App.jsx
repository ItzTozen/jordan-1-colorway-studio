import { useCallback, useEffect, useState } from 'react'
import { COLORWAYS } from './data/colorways'
import useSmoothPointer from './hooks/useSmoothPointer'
import useReveal from './hooks/useReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Details from './components/Details'
import Collection from './components/Collection'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

export default function App() {
  const [idx, setIdx] = useState(0)
  const [cartItems, setCartItems] = useState([]) // {key, cwId, size, qty}
  const [cartOpen, setCartOpen] = useState(false)
  const cw = COLORWAYS[idx]

  useSmoothPointer()
  useReveal()

  const select = useCallback(
    (i) => setIdx(((i % COLORWAYS.length) + COLORWAYS.length) % COLORWAYS.length),
    []
  )

  const addToCart = useCallback((colorway, size) => {
    const key = `${colorway.id}-${size}`
    setCartItems((items) => {
      const ex = items.find((i) => i.key === key)
      if (ex) return items.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      return [...items, { key, cwId: colorway.id, size, qty: 1 }]
    })
    setCartOpen(true)
  }, [])

  const updateQty = useCallback((key, delta) => {
    setCartItems((items) =>
      items
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    )
  }, [])

  const removeItem = useCallback((key) => {
    setCartItems((items) => items.filter((i) => i.key !== key))
  }, [])

  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0)

  useEffect(() => {
    const r = document.documentElement.style
    r.setProperty('--bg', cw.bg)
    r.setProperty('--accent', cw.accent)
    document.getElementById('metaTheme')?.setAttribute('content', cw.bg)
  }, [cw])

  useEffect(() => {
    const onKey = (e) => {
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % COLORWAYS.length)
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + COLORWAYS.length) % COLORWAYS.length)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* پس‌زمینه: شش لایهٔ گرادیان رادیال (سبک پوستر) که با تعویض رنگ‌وی کراس‌فید می‌شن */}
      <div className="bg-stack" aria-hidden="true">
        {COLORWAYS.map((c, i) => (
          <div
            key={c.id}
            className={'bg-layer' + (i === idx ? ' on' : '')}
            style={{ '--c-bg': c.bg, '--c-glow': c.glow }}
          />
        ))}
      </div>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Navbar count={cartCount} onCart={() => setCartOpen(true)} />

      <main>
        <Hero cw={cw} idx={idx} onSelect={select} onAdd={addToCart} />
        <Details />
        <Collection
          idx={idx}
          onSelect={(i) => {
            select(i)
            document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
          }}
          onBrowse={select}
        />
        <Newsletter />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        colorways={COLORWAYS}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />
    </>
  )
}
