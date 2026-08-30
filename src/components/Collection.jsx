import { COLORWAYS } from '../data/colorways'

export default function Collection({ idx, onSelect }) {
  return (
    <section className="collection" id="collection">
      <div className="section-head">
        <p className="eyebrow r">The Collection</p>
        <h2 className="r">
          CHOOSE YOUR <em>COLORWAY</em>
        </h2>
        <p className="lede r">
          Three posters, one silhouette. Pick a side — the whole room changes with it.
        </p>
      </div>

      <div className="cards">
        {COLORWAYS.map((c, i) => (
          <button
            key={c.id}
            className={'card r' + (i === idx ? ' active' : '')}
            style={{ '--c-bg': c.bg, '--c-glow': c.glow, '--d': `${i * 0.1}s` }}
            onClick={() => onSelect(i)}
            aria-label={`View ${c.full}`}
          >
            <span className="card-ghost" aria-hidden="true">0{i + 1}</span>
            <span className="card-cta">{i === idx ? 'Now Viewing' : 'View Poster ↗'}</span>
            <img src={c.img} alt="" draggable="false" />
            <span className="card-info">
              <span className="card-title">
                <strong>{c.name}</strong>
                <span>{c.code}</span>
              </span>
              <b>${c.price}</b>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
