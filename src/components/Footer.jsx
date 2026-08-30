export default function Footer() {
  return (
    <footer className="footer">
      <div className="foot-grid">
        <div className="foot-brand">
          <a className="brand" href="#home">
            <img src="/assets/Logo.png" alt="" />
            <span>JORDAN</span>
          </a>
          <p>
            An interactive product-poster concept. Six colorways, one silhouette,
            zero hesitation.
          </p>
        </div>

        <nav aria-label="Shop">
          <h4>Shop</h4>
          <a href="#home">New Drop</a>
          <a href="#collection">Collection</a>
          <a href="#details">Anatomy</a>
          <a href="#drop">Drop List</a>
        </nav>

        <nav aria-label="Company">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Careers</a>
        </nav>

        <nav aria-label="Follow">
          <h4>Follow</h4>
          <a href="#">Instagram</a>
          <a href="#">X</a>
          <a href="#">WhatsApp</a>
        </nav>
      </div>

      <div className="foot-bottom">
        <span>© 2026 Colorway Studio — fan-made concept, not affiliated with Nike or Jordan Brand.</span>
        <span>React + Vite</span>
      </div>
    </footer>
  )
}
