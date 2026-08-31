import { useEffect, useRef } from 'react'
import { COLORWAYS } from '../data/colorways'

// COLORWAY INDEX — استریپ افقی با اسنپ؛ پوسترهای مینیمال تخت
export default function Collection({ idx, onSelect, onBrowse }) {
  const strip = useRef(null)

  // استریپ همیشه پوسترِ فعال را وسط می‌آورد. scrollTo داخل خود کانتینر
  // انجام می‌شود تا هرگز صفحهٔ اصلی (مثلاً هنگام لود یا StrictMode) جابه‌جا نشود
  useEffect(() => {
    const str = strip.current
    const el = str?.children[idx]
    if (!str || !el) return
    str.scrollTo({
      left: el.offsetLeft - (str.clientWidth - el.clientWidth) / 2,
      behavior: 'smooth',
    })
  }, [idx])

  return (
    <section className="collection" id="collection">
      <div className="section-head">
        <p className="eyebrow r">06 Colorways — One Silhouette</p>
        <h2 className="r">
          COLORWAY <em>INDEX</em>
        </h2>
        <div className="strip-nav r">
          <button aria-label="Previous colorway" onClick={() => onBrowse(idx - 1)}>←</button>
          <button aria-label="Next colorway" onClick={() => onBrowse(idx + 1)}>→</button>
        </div>
      </div>

      <div className="strip r" ref={strip}>
        {COLORWAYS.map((c, i) => (
          <article
            key={c.id}
            className={'poster' + (i === idx ? ' active' : '')}
            style={{ '--c-bg': c.bg, '--c-glow': c.glow }}
          >
            <span className="p-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <button className="p-select" onClick={() => onSelect(i)} aria-label={`Wear ${c.full}`}>
              {i === idx ? 'Wearing' : 'Wear it'}
            </button>
            <img src={c.img} alt="" draggable="false" />
            <footer className="p-meta">
              <span className="p-name">
                <b>{c.name}</b>
                <i>{c.code}</i>
              </span>
              <span className="p-price">${c.price}</span>
            </footer>
          </article>
        ))}
      </div>

      <p className="strip-hint r" aria-hidden="true">Scroll sideways — “Wear it” changes the whole room</p>
    </section>
  )
}
