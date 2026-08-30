import { useRef, useState } from 'react'
import { COLORWAYS, SIZES } from '../data/colorways'
import Ticker from './Ticker'

// Ghost word sized per colorway so long names still fit the stage.
const ghostSize = (name) => `min(17vw, ${(88 / (0.62 * name.length)).toFixed(1)}vw)`

export default function Hero({ cw, idx, onSelect, onAdd }) {
  const [size, setSize] = useState(2)
  const [added, setAdded] = useState(false)
  const timer = useRef()

  const handleAdd = () => {
    onAdd(cw, SIZES[size])
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1300)
  }

  return (
    <section className="hero" id="home">
      <div className="ghost" key={cw.id} style={{ fontSize: ghostSize(cw.name) }} aria-hidden="true">
        {cw.name}
      </div>
      <img className="hero-swoosh" src="/assets/Logo.png" alt="" aria-hidden="true" draggable="false" />
      <p className="side-note" aria-hidden="true">AIR JORDAN I · HIGH OG · EST. 1985</p>

      <div className="hero-grid">
        <div className="copy">
          <p className="eyebrow r" style={{ '--d': '.15s' }}>New Drop — High OG</p>
          <h1 className="r" style={{ '--d': '.25s' }}>AIR JORDAN&nbsp;1</h1>
          <div className="cw-line r" style={{ '--d': '.35s' }}>
            <span className="cw-name" key={'n' + cw.id}>{cw.name}</span>
            <span className="cw-code" key={'c' + cw.id}>{cw.code}</span>
          </div>
          <p className="price r" style={{ '--d': '.45s' }}>
            ${cw.price} <small>USD</small>
          </p>

          <div className="sizes r" style={{ '--d': '.55s' }} role="radiogroup" aria-label="Select size">
            {SIZES.map((s, i) => (
              <button
                key={s}
                role="radio"
                aria-checked={size === i}
                className={'size' + (size === i ? ' on' : '')}
                onClick={() => setSize(i)}
              >
                US {s}
              </button>
            ))}
          </div>

          <div className="cta r" style={{ '--d': '.65s' }}>
            <button className="btn btn-primary" onClick={handleAdd}>
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
            <a className="btn btn-ghost" href="#collection">All Colorways</a>
          </div>

          <p className="meta r" style={{ '--d': '.75s' }}>
            ✦ Free shipping over $150&ensp;✦ 30-day returns&ensp;✦ 100% authentic
          </p>
        </div>

        <div className="stage r" style={{ '--d': '.3s' }}>
          <span className="stage-count" aria-hidden="true">
            {String(idx + 1).padStart(2, '0')}<i>/{String(COLORWAYS.length).padStart(2, '0')}</i>
          </span>
          <div className="stage-tilt">
            <div className="stage-float">
              {COLORWAYS.map((c, i) => (
                <img
                  key={c.id}
                  src={c.img}
                  alt={c.full}
                  className={'shoe' + (i === idx ? ' active' : '')}
                  draggable="false"
                />
              ))}
            </div>
            <div className="stage-floor" />
          </div>
        </div>
      </div>

      {/* سوییچر رنگ‌وی: کارت‌های عکس‌دار شناور */}
      <div className="thumbs r" style={{ '--d': '.8s' }} role="tablist" aria-label="Colorway">
        {COLORWAYS.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={i === idx}
            aria-label={c.full}
            className={'thumb' + (i === idx ? ' active' : '')}
            onClick={() => onSelect(i)}
          >
            <img src={c.img} alt="" draggable="false" />
          </button>
        ))}
      </div>

      <aside className="rail" aria-label="Social links">
        <a href="#" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href="#" aria-label="X (Twitter)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 4l7.2 9.3L4.4 20h2.5l5.4-5.4L16.8 20H20l-7.5-9.7L18.9 4h-2.5l-4.8 4.9L8 4H4z" />
          </svg>
        </a>
        <a href="#" aria-label="WhatsApp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1 1 21 11.5z" />
          </svg>
        </a>
      </aside>

      <Ticker />
    </section>
  )
}
