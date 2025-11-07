import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import Header from './components/Header'
import BlurText from './components/BlurText'
import CartButton from './components/CartButton'
import Footer from './components/Footer'
import Shop from './sections/Shop'
import Cart from './sections/Cart'
import ServiceRequest from './sections/ServiceRequest'
import heroHighlightImage from './assets/images/peony-banner.jpg'
import servicesAccentImage from './assets/images/Services section accents.webp'
import newsletterBackground from './assets/images/Newsletter background.jpg'
import sunlitMeadowImage from './assets/images/Sunlit Meadow.webp'
import blushingGardenImage from './assets/images/Blushing Garden.webp'
import moonlitWhisperImage from './assets/images/Moonlit Whisper.jpg'
import lavenderHazeImage from './assets/images/Lavender Haze.webp'
import citrusBloomImage from './assets/images/Citrus Bloom.webp'
import eveningTideImage from './assets/images/Evening Tide.jpg'
import wildflowerStoryImage from './assets/images/Wildflower Story.webp'
import roseOneImage from './assets/images/1rose.jpg'
import roseThreeImage from './assets/images/3rose.jpg'
import roseFiveImage from './assets/images/5rose.webp'
import roseTwentyFiveImage from './assets/images/25rose.jpg'
import peachImage from './assets/images/peach.png'
import storeData from './data/store.json'

const navigationLinks = [
  { label: 'Shop', type: 'view', view: 'shop' },
  { label: 'Top selling', type: 'anchor', href: '#bouquets' },
  { label: 'Services', type: 'anchor', href: '#services' },
  { label: 'Newsletter', type: 'anchor', href: '#newsletter' },
]

const paletteLabels = {
  warm: 'Warm & sunny',
  cool: 'Cool & serene',
  pastel: 'Soft pastels',
  vibrant: 'Bold & vibrant',
  neutral: 'Neutral & airy',
  romantic: 'Romantic blush',
  wild: 'Wildflower mix',
  dramatic: 'Moody & dramatic',
}

const availabilityLabels = {
  'in-stock': 'Available today',
  limited: 'Limited supply',
  'pre-order': 'Pre-order',
}

const priceOptions = [
  { value: 'all', label: 'All prices' },
  { value: 'under-50', label: 'Under $50' },
  { value: '50-60', label: '$50 to $60' },
  { value: 'over-60', label: 'Over $60' },
]

const availabilityOptions = [
  { value: 'all', label: 'All availability' },
  { value: 'in-stock', label: 'In stock' },
  { value: 'limited', label: 'Limited' },
  { value: 'pre-order', label: 'Pre-order' },
]

const localImageMap = {
  './assets/images/Sunlit Meadow.webp': sunlitMeadowImage,
  './assets/images/Blushing Garden.webp': blushingGardenImage,
  './assets/images/Moonlit Whisper.jpg': moonlitWhisperImage,
  'src/assets/images/Lavender Haze.webp': lavenderHazeImage,
  'src/assets/images/Citrus Bloom.webp': citrusBloomImage,
  'src/assets/images/Evening Tide.jpg': eveningTideImage,
  'src/assets/images/Wildflower Story.webp': wildflowerStoryImage,
  'src/assets/images/1rose.jpg': roseOneImage,
  'src/assets/images/3rose.jpg': roseThreeImage,
  'src/assets/images/5rose.webp': roseFiveImage,
  'src/assets/images/25rose.jpg': roseTwentyFiveImage,
}

const resolveImageSrc = (imagePath) =>
  imagePath.startsWith('http://') || imagePath.startsWith('https://')
    ? imagePath
    : localImageMap[imagePath] ?? imagePath

const bouquets = storeData.bouquets.map((bouquet) => {
  const resolvedBouquet = { ...bouquet }

  if (bouquet.image) {
    resolvedBouquet.image = resolveImageSrc(bouquet.image)
  }

  if (Array.isArray(bouquet.variants) && bouquet.variants.length > 0) {
    resolvedBouquet.variants = bouquet.variants.map((variant) => ({
      ...variant,
      image: resolveImageSrc(variant.image),
    }))
  }

  return resolvedBouquet
})

const bestSellingBouquets = bouquets.filter((bouquet) => bouquet.bestSeller)

const services = storeData.services

const contactInfo = {
  address: '123 Market Street, San Francisco, CA',
  phone: '415.555.0191',
  email: 'hello@bloomandbranch.com',
  hours: 'Open daily 9am – 6pm',
}

const formspreeEndpoint = 'https://formspree.io/f/xbldkjeg'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function App() {
  const [view, setView] = useState('catalog')
  const [cart, setCart] = useState([])
  const [filters, setFilters] = useState({ price: 'all', palette: 'all', availability: 'all' })
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const toastTimeoutRef = useRef(null)
  const peachRainDrops = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => {
        const size = 52 + Math.random() * 34
        const duration = 16 + Math.random() * 10
        const delay = Math.random() * duration
        const left = Math.random() * 100
        const horizontalShift = Math.random() * 80 - 40
        const opacity = 0.35 + Math.random() * 0.25

        return {
          id: `peach-${index}`,
          size: `${size}px`,
          duration: `${duration}s`,
          delay: `-${delay}s`,
          left: `${left}%`,
          horizontalShift: `${horizontalShift}px`,
          opacity: opacity.toFixed(2),
        }
      }),
    [],
  )

  const paletteOptions = useMemo(() => {
    const values = new Set()
    bouquets.forEach((bouquet) => {
      bouquet.palette.forEach((tone) => values.add(tone))
    })
    return ['all', ...Array.from(values)]
  }, [])

  const cartItemCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  const cartSubtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  )

  const filteredBouquets = useMemo(() => {
    const matchesPrice = (priceFilter, price) => {
      if (priceFilter === 'all') return true
      if (priceFilter === 'under-50') return price < 50
      if (priceFilter === '50-60') return price >= 50 && price <= 60
      if (priceFilter === 'over-60') return price > 60
      return true
    }

    return bouquets.filter((bouquet) => {
      const pricePass = matchesPrice(filters.price, bouquet.price)
      const palettePass =
        filters.palette === 'all' || bouquet.palette.includes(filters.palette)
      const availabilityPass =
        filters.availability === 'all' || bouquet.availability === filters.availability

      return pricePass && palettePass && availabilityPass
    })
  }, [filters])

  const handleAddToCart = (bouquet) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === bouquet.name)
      if (existing) {
        return prev.map((item) =>
          item.name === bouquet.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { ...bouquet, quantity: 1 }]
    })
    triggerToast(`Added ${bouquet.name} to your cart`)
  }

  const handleEmptyCart = () => setCart([])
  const handleQuantityChange = (name, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleRemoveFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name))
  }

  const setViewWithScroll = (nextView) => {
    setView(nextView)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev)

  const showCatalog = () => setView('catalog')
  const showShop = () => setViewWithScroll('shop')
  const showCart = () => setViewWithScroll('cart')
  const showServiceRequest = () => setViewWithScroll('service')

  const filtersAreDefault =
    filters.price === 'all' && filters.palette === 'all' && filters.availability === 'all'

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => setFilters({ price: 'all', palette: 'all', availability: 'all' })
  const triggerToast = (message) => {
    setToastMessage(message)
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 2600)
  }
  const handleNewsletterSubmit = (event) => {
    event.preventDefault()
    triggerToast('Thanks for joining the newsletter!')
    event.target.reset()
  }

  const cartButtonLabel =
    cartItemCount > 0
      ? `Open cart (${cartItemCount} ${cartItemCount === 1 ? 'item' : 'items'})`
      : 'Open cart (empty)'

  const humanize = (value) =>
    value
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')

  const scrollToSection = (href) => {
    if (typeof window === 'undefined') return
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleAnchorClick = (event, href, shouldCloseMenu) => {
    event.preventDefault()
    if (shouldCloseMenu) {
      closeMobileMenu()
    }
    if (view !== 'catalog') {
      setView('catalog')
      setTimeout(() => {
        scrollToSection(href)
      }, 120)
    } else {
      scrollToSection(href)
    }
  }

  const renderNavItems = (variant = 'desktop', closeMenuOnClick = false) =>
    navigationLinks.map((link) => {
      const className = variant === 'desktop' ? 'site-header__link' : 'mobile-menu__link'
      if (link.type === 'view') {
        return (
          <button
            key={link.label}
            type="button"
            className={className}
            onClick={() => {
              setViewWithScroll(link.view)
              if (closeMenuOnClick) {
                closeMobileMenu()
              }
            }}
            aria-current={view === link.view ? 'page' : undefined}
          >
            {link.label}
          </button>
        )
      }

      return (
        <a
          key={link.href}
          className={className}
          href={link.href}
          onClick={(event) => handleAnchorClick(event, link.href, closeMenuOnClick)}
        >
          {link.label}
        </a>
      )
    })

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.removeProperty('overflow')
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const panel = document.getElementById('mobile-menu-panel')
    panel?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (view !== 'catalog') {
      return undefined
    }

    const cards = document.querySelectorAll('.bouquet-card--catalog')
    if (!cards.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bouquet-card--visible')
          } else {
            entry.target.classList.remove('bouquet-card--visible')
          }
        })
      },
      { threshold: 0.35 },
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [view, bestSellingBouquets.length])

  return (
    <div className="app" id="top">
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => setToastMessage(null)}>
            ×
          </button>
        </div>
      )}
      <Header
        cartButtonLabel={cartButtonLabel}
        cartItemCount={cartItemCount}
        closeMobileMenu={closeMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
        renderNavItems={renderNavItems}
        showCart={showCart}
        showCatalog={showCatalog}
        showServiceRequest={showServiceRequest}
        toggleMobileMenu={toggleMobileMenu}
        view={view}
      />

      <main>
        {view === 'catalog' && (
          <div className="peach-rain" aria-hidden="true">
            {peachRainDrops.map((drop) => (
              <div
                key={drop.id}
                className="peach-preview peach-rain__petal"
                style={{
                  left: drop.left,
                  animationDelay: drop.delay,
                  animationDuration: drop.duration,
                  '--peach-horizontal-shift': drop.horizontalShift,
                  '--peach-opacity': drop.opacity,
                  '--peach-size': drop.size,
                }}
              >
                <img src={peachImage} alt="" className="peach-preview__image" loading="lazy" />
              </div>
            ))}
          </div>
        )}
        {view === 'catalog' && (
          <>
            <section className="hero content-animate" id="hero" style={{ '--content-animation-delay': '40ms' }}>
              <div className="hero__copy">
                <p className="hero__eyebrow">Bloom &amp; Branch</p>
                <h1>Flowers that make every moment bloom</h1>
                <p>
                  Thoughtful arrangements sourced from family farms, wrapped with care, and delivered with a smile.
                </p>
                <div className="hero__actions">
                  <button className="btn btn--primary" type="button" onClick={showShop}>
                    Shop bouquets
                  </button>
                  <a
                    className="btn btn--ghost"
                    href="#newsletter"
                    onClick={(event) => handleAnchorClick(event, '#newsletter', false)}
                  >
                    Join the newsletter
                  </a>
                </div>
              </div>
              <div className="hero__card">
                <img
                  className="hero__image"
                  src={heroHighlightImage}
                  alt="Peony bouquet arrangement with blush accents."
                />
                <p className="hero__tag">This week&apos;s highlight</p>
                <h2>Peony Soirée</h2>
                <p>Limited harvest peonies with freesia, sweet pea, and jasmine vine.</p>
                <span className="hero__price">$68</span>
              </div>
            </section>

            <section className="section content-animate" id="bouquets" style={{ '--content-animation-delay': '140ms' }}>
              <div className="section__heading">
                <p className="section__eyebrow">Best sellers</p>
                <h2>Our top bouquets of the season</h2>
                <p>
                  Lovingly arranged favorites our guests reach for again and again. Each is available for same-day delivery
                  while blooms last.
                </p>
              </div>
              <div className="bouquet-grid">
                {bestSellingBouquets.map((bouquet) => (
                  <article key={bouquet.name} className="bouquet-card bouquet-card--catalog">
                    <div className="bouquet-card__image">
                      <img src={bouquet.image} alt={bouquet.alt} />
                    </div>
                    <div className="bouquet-card__body">
                      {bouquet.bestSeller && <span className="bouquet-card__badge">Best seller</span>}
                      <h3>{bouquet.name}</h3>
                      <p>{bouquet.description}</p>
                      <span
                        className={`bouquet-card__availability bouquet-card__availability--${bouquet.availability}`}
                      >
                        {availabilityLabels[bouquet.availability]}
                      </span>
                      <div className="bouquet-card__footer">
                        <span className="bouquet-card__price">{currencyFormatter.format(bouquet.price)}</span>
                        <CartButton onClick={() => handleAddToCart(bouquet)} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section
              className="section section--accent content-animate"
              id="services"
              style={{ '--content-animation-delay': '220ms' }}
            >
              <div className="section__heading">
                <p className="section__eyebrow">Services</p>
                <h2>More ways to bring flowers into your routine</h2>
              </div>
              <div
                className="service-grid"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${servicesAccentImage})`,
                }}
              >
                {services.map((service) => (
                  <article key={service.title} className="service-card">
                    <h3>
                      <BlurText text={service.title} animateBy="chars" delay={60} />
                    </h3>
                    <p>
                      <BlurText
                        text={service.text}
                        animateBy="words"
                        delay={80}
                        direction="bottom"
                        threshold={0.2}
                      />
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="section content-animate" id="newsletter" style={{ '--content-animation-delay': '300ms' }}>
              <div
                className="newsletter"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(255, 226, 240, 0.82), rgba(213, 243, 238, 0.82)), url(${newsletterBackground})`,
                }}
              >
                <div>
                  <p className="section__eyebrow">Newsletter</p>
                  <h2>Seasonal stems in your inbox</h2>
                  <p>Get first dibs on limited blooms, care tips, and design workshops.</p>
                </div>
                <form className="newsletter__form" onSubmit={handleNewsletterSubmit}>
                  <label className="sr-only" htmlFor="email">
                    Email address
                  </label>
                  <input id="email" type="email" placeholder="you@example.com" required />
                  <button className="newsletter__submit flying-button flying-button--newsletter" type="submit">
                    <span className="svg-wrapper" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 12L21 3L15 21L11 13L3 12Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>Subscribe</span>
                  </button>
                </form>
              </div>
            </section>
          </>
        )}

        {view === 'shop' && (
          <div className="content-animate">
            <Shop
              filteredBouquets={filteredBouquets}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              filtersAreDefault={filtersAreDefault}
              priceOptions={priceOptions}
              paletteOptions={paletteOptions}
              availabilityOptions={availabilityOptions}
              availabilityLabels={availabilityLabels}
              paletteLabels={paletteLabels}
              humanize={humanize}
              handleAddToCart={handleAddToCart}
              currencyFormatter={currencyFormatter}
              cartItemCount={cartItemCount}
              showCart={showCart}
              showCatalog={showCatalog}
            />
          </div>
        )}

        {view === 'service' && (
          <div className="content-animate">
            <ServiceRequest contactInfo={contactInfo} formspreeEndpoint={formspreeEndpoint} />
          </div>
        )}

        {view === 'cart' && (
          <div className="content-animate">
            <Cart
              cart={cart}
              cartSubtotal={cartSubtotal}
              currencyFormatter={currencyFormatter}
              handleQuantityChange={handleQuantityChange}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
              showShop={showShop}
            />
          </div>
        )}
      </main>

      <div className="content-animate" style={{ '--content-animation-delay': '200ms' }}>
        <Footer contactInfo={contactInfo} />
      </div>
    </div>
  )
}

export default App
