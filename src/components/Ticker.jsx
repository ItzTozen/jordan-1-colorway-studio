import { Fragment } from 'react'

const ITEMS = ['AIR JORDAN 1 HIGH OG', 'JUST DO IT', 'SIX COLORWAYS', 'FREE SHIPPING OVER $150', 'EST. 1985']

function Row() {
  return (
    <>
      {ITEMS.map((t) => (
        <Fragment key={t}>
          <span>{t}</span>
          <em>✦</em>
        </Fragment>
      ))}
    </>
  )
}

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <span className="tick-half"><Row /></span>
        <span className="tick-half"><Row /></span>
      </div>
    </div>
  )
}
