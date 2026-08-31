import { useEffect, useState } from 'react'

export default function CartDrawer({ open, items, colorways, onClose, onUpdateQty, onRemove }) {
  const [done, setDone] = useState(false)

  // Esc می‌بندد و اسکرول پس‌زمینه قفل می‌شود
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) setDone(false)
  }, [open])

  const rows = items
    .map((i) => ({ ...i, cw: colorways.find((c) => c.id === i.cwId) }))
    .filter((r) => r.cw)
  const count = rows.reduce((n, r) => n + r.qty, 0)
  const subtotal = rows.reduce((s, r) => s + r.cw.price * r.qty, 0)

  return (
    <div className={'drawer' + (open ? ' open' : '')} aria-hidden={!open}>
      <div className="drawer-backdrop" onClick={onClose} />

      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <header className="drawer-head">
          <span>
            CART <em>({count})</em>
          </span>
          <button className="drawer-x" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </header>

        {done ? (
          <div className="drawer-done">
            <strong>Order placed ✓</strong>
            <p>This is a concept store — no real charge was made.</p>
            <button className="btn btn-ghost" onClick={onClose}>Keep Browsing</button>
          </div>
        ) : rows.length === 0 ? (
          <div className="drawer-empty">
            <p>Your cart is empty.</p>
            <button className="btn btn-primary" onClick={onClose}>
              Pick a Colorway
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {rows.map((r) => (
                <article className="d-row" key={r.key}>
                  <span
                    className="d-thumb"
                    style={{ '--c-bg': r.cw.bg, '--c-glow': r.cw.glow }}
                    aria-hidden="true"
                  >
                    <img src={r.cw.img} alt="" draggable="false" />
                  </span>
                  <div className="d-info">
                    <strong>{r.cw.name}</strong>
                    <span>
                      {r.cw.code} · US {r.size}
                    </span>
                    <span className="d-qty">
                      <button onClick={() => onUpdateQty(r.key, -1)} aria-label="Decrease">−</button>
                      <b>{r.qty}</b>
                      <button onClick={() => onUpdateQty(r.key, 1)} aria-label="Increase">+</button>
                    </span>
                  </div>
                  <div className="d-side">
                    <b>${r.cw.price * r.qty}</b>
                    <button className="d-rm" onClick={() => onRemove(r.key)} aria-label="Remove">
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <footer className="drawer-foot">
              <div className="d-total">
                <span>Subtotal</span>
                <b>${subtotal}</b>
              </div>
              <p className="d-note">Free shipping over $150 · 30-day returns</p>
              <button className="btn btn-primary d-checkout" onClick={() => setDone(true)}>
                Checkout
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
