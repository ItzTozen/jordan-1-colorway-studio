import { useEffect, useState } from 'react'

export default function Navbar({ count, onCart }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={'nav' + (scrolled ? ' scrolled' : '')}>
      <a className="brand" href="#home">
        <img src="/assets/Logo.png" alt="" />
        <span>JORDAN</span>
      </a>

      <nav className="links" aria-label="Main">
        <a href="#home" className="on">Home</a>
        <a href="#collection">Collection</a>
        <a href="#details">Anatomy</a>
        <a href="#drop">Drop List</a>
      </nav>

      <button className="cart" aria-label={`Open cart, ${count} items`} onClick={onCart}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8z" />
          <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" />
        </svg>
        <i className="cart-count" key={count}>{count}</i>
      </button>
    </header>
  )
}
