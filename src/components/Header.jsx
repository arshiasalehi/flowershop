function Header({
  cartButtonLabel,
  cartItemCount,
  closeMobileMenu,
  isMobileMenuOpen,
  renderNavItems,
  showCart,
  showCatalog,
  showServiceRequest,
  toggleMobileMenu,
  view,
}) {
  return (
    <>
      <header className="site-header">
        <a className="site-header__brand" href="#top" onClick={showCatalog}>
          Bloom &amp; Branch
        </a>
        <nav className="site-header__nav" aria-label="Main navigation">
          {renderNavItems()}
        </nav>
        <button
          className={`mobile-menu-toggle${isMobileMenuOpen ? ' mobile-menu-toggle--open' : ''}`}
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-panel"
          aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="site-header__actions">
          <button
            className="site-header__cart"
            type="button"
            onClick={showCart}
            aria-label={cartButtonLabel}
            title={cartButtonLabel}
            aria-pressed={view === 'cart'}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false" className="site-header__cart-icon">
              <path
                d="M7 5h-2.5a1 1 0 0 0 0 2h1.2l1.8 8.39A2 2 0 0 0 9.44 17H17a1 1 0 0 0 0-2H9.44l-.26-1.19h8.49a2 2 0 0 0 1.94-1.52l1.05-4.19A1 1 0 0 0 19.69 7H8.21l-.26-1.19A1 1 0 0 0 7 5Zm2.35 4h9.51l-.73 2.91a0 0 0 0 1 0 0h-8.3ZM9 19a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 9 19Zm8 0a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 17 19Z"
                fill="currentColor"
              />
            </svg>
            {cartItemCount > 0 && <span className="site-header__cart-badge">{cartItemCount}</span>}
          </button>
          <button className="btn btn--ghost site-header__cta" type="button" onClick={showServiceRequest}>
            Book a consultation
          </button>
        </div>
      </header>

      <div className={`mobile-menu${isMobileMenuOpen ? ' mobile-menu--open' : ''}`}>
        <div className="mobile-menu__backdrop" onClick={closeMobileMenu} />
        <div
          className="mobile-menu__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Primary navigation"
          id="mobile-menu-panel"
          aria-hidden={!isMobileMenuOpen}
          tabIndex={-1}
        >
          <div className="mobile-menu__header">
            <span className="mobile-menu__brand">Bloom &amp; Branch</span>
            <div className="mobile-menu__header-actions">
              <button
                type="button"
                className="mobile-menu__cart"
                onClick={() => {
                  closeMobileMenu()
                  showCart()
                }}
                aria-label={cartButtonLabel}
                aria-pressed={view === 'cart'}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false" className="mobile-menu__cart-icon">
                  <path
                    d="M7 5h-2.5a1 1 0 0 0 0 2h1.2l1.8 8.39A2 2 0 0 0 9.44 17H17a1 1 0 0 0 0-2H9.44l-.26-1.19h8.49a2 2 0 0 0 1.94-1.52l1.05-4.19A1 1 0 0 0 19.69 7H8.21l-.26-1.19A1 1 0 0 0 7 5Zm2.35 4h9.51l-.73 2.91a0 0 0 0 1 0 0h-8.3ZM9 19a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 9 19Zm8 0a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 17 19Z"
                    fill="currentColor"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <span className="mobile-menu__cart-badge" aria-label={`${cartItemCount} items in cart`}>
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                className="mobile-menu__close"
                onClick={closeMobileMenu}
                aria-label="Close navigation"
              >
                <span />
                <span />
              </button>
            </div>
          </div>
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {renderNavItems('mobile', true)}
          </nav>
          <div className="mobile-menu__actions">
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => {
                closeMobileMenu()
                showCart()
              }}
            >
              View cart
            </button>
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => {
                closeMobileMenu()
                showServiceRequest()
              }}
            >
              Book a consultation
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
