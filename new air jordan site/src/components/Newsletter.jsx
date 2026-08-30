import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (email.includes('@')) setDone(true)
  }

  return (
    <section className="cta-band" id="drop">
      <div className="cta-inner">
        <p className="eyebrow r">Never Miss a Drop</p>
        <h2 className="r">
          DON&apos;T JUST WATCH.<br /><em>FLY.</em>
        </h2>
        <p className="lede r">Join the drop list — early access to every colorway, zero spam.</p>

        {done ? (
          <p className="done">You&apos;re on the list ✓</p>
        ) : (
          <form className="r" onSubmit={submit}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button className="btn btn-primary" type="submit">Join the Drop List</button>
          </form>
        )}
      </div>
    </section>
  )
}
