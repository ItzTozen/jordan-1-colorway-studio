const SPECS = [
  {
    n: '01',
    t: 'Full-Grain Leather Upper',
    d: 'Premium tumbled leather with a perforated toe box — the original 1985 recipe, built to age, not to quit.',
  },
  {
    n: '02',
    t: 'Encapsulated Air-Sole',
    d: 'The unit that started it all. Pressurized air in the heel for lightweight cushioning under every step.',
  },
  {
    n: '03',
    t: 'High-Top Silhouette',
    d: 'Padded collar and tongue lock the ankle in — a basketball blueprint that became a culture uniform.',
  },
  {
    n: '04',
    t: 'Pivot-Circle Outsole',
    d: 'Vulcanized rubber with the classic pivot pattern, gripping concrete as hard as it once gripped hardwood.',
  },
]

const STATS = [
  ['1985', 'First Flight'],
  ['06', 'Colorways'],
  ['$180', 'USD Retail'],
  ['23', 'His Airness'],
]

export default function Details() {
  return (
    <section className="details" id="details">
      <div className="section-head">
        <p className="eyebrow r">The Blueprint</p>
        <h2 className="r">
          ANATOMY OF<br />AN <em>ICON</em>
        </h2>
        <p className="lede r">
          Designed by Peter Moore in 1985, banned by the league, adopted by the streets.
          Forty years later the silhouette still doesn&apos;t ask for attention — it takes it.
        </p>
      </div>

      <div className="spec-list">
        {SPECS.map((s, i) => (
          <article className="spec r" key={s.n} style={{ '--d': `${i * 0.08}s` }}>
            <span className="spec-n" aria-hidden="true">{s.n}</span>
            <div className="spec-body">
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
            <span className="spec-arrow" aria-hidden="true">→</span>
          </article>
        ))}
      </div>

      <div className="stats r">
        {STATS.map(([v, l]) => (
          <div key={l}>
            <strong>{v}</strong>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
