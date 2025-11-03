import { useState } from 'react'

function Shop({
  filteredBouquets,
  filters,
  onFilterChange,
  onResetFilters,
  filtersAreDefault,
  priceOptions,
  paletteOptions,
  availabilityOptions,
  availabilityLabels,
  paletteLabels,
  humanize,
  handleAddToCart,
  currencyFormatter,
  cartItemCount,
  showCart,
  showCatalog,
}) {
  return (
    <section className="section shop" id="shop">
      <div className="section__heading">
        <p className="section__eyebrow">Shop</p>
        <h2>Explore every bouquet in our studio</h2>
        <p>
          From vibrant celebrations to quiet gestures, discover hand-tied designs crafted with fresh, ethically sourced
          stems.
        </p>
      </div>

      <div className="shop-filters" role="region" aria-label="Filter bouquets">
        <div className="shop-filter">
          <label htmlFor="filter-price">Price</label>
          <select
            id="filter-price"
            value={filters.price}
            onChange={(event) => onFilterChange('price', event.target.value)}
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="shop-filter">
          <label htmlFor="filter-palette">Palette</label>
          <select
            id="filter-palette"
            value={filters.palette}
            onChange={(event) => onFilterChange('palette', event.target.value)}
          >
            {paletteOptions.map((value) => (
              <option key={value} value={value}>
                {value === 'all' ? 'All palettes' : paletteLabels[value] ?? humanize(value)}
              </option>
            ))}
          </select>
        </div>

        <div className="shop-filter">
          <label htmlFor="filter-availability">Availability</label>
          <select
            id="filter-availability"
            value={filters.availability}
            onChange={(event) => onFilterChange('availability', event.target.value)}
          >
            {availabilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="shop-filters__reset"
          onClick={onResetFilters}
          disabled={filtersAreDefault}
        >
          Reset filters
        </button>
      </div>

      {filteredBouquets.length > 0 ? (
        <div className="shop-grid">
          {filteredBouquets.map((bouquet) =>
            bouquet.type === 'rose-branches' && Array.isArray(bouquet.variants) ? (
              <RoseBundleCard
                key={bouquet.name}
                bouquet={bouquet}
                availabilityLabels={availabilityLabels}
                currencyFormatter={currencyFormatter}
                handleAddToCart={handleAddToCart}
              />
            ) : (
              <article key={bouquet.name} className="bouquet-card bouquet-card--shop">
                <div className="bouquet-card__image">
                  <img src={bouquet.image} alt={bouquet.alt} />
                </div>
                <div className="bouquet-card__body">
                  {bouquet.bestSeller && <span className="bouquet-card__badge">Best seller</span>}
                  <h3>{bouquet.name}</h3>
                  <p>{bouquet.description}</p>
                  {bouquet.ribbon && <span className="bouquet-card__ribbon">{bouquet.ribbon}</span>}
                  <span className={`bouquet-card__availability bouquet-card__availability--${bouquet.availability}`}>
                    {availabilityLabels[bouquet.availability]}
                  </span>
                  <div className="bouquet-card__footer">
                    <span className="bouquet-card__price">{currencyFormatter.format(bouquet.price)}</span>
                    <button className="btn btn--secondary" type="button" onClick={() => handleAddToCart(bouquet)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      ) : (
        <div className="shop__empty">
          <p>
            No bouquets match those filters just yet. Adjust your palette or availability to see more of our designs.
          </p>
          <button type="button" className="btn btn--ghost" onClick={onResetFilters}>
            Clear filters
          </button>
        </div>
      )}

      <div className="shop__cta">
        <button
          className="btn btn--primary"
          type="button"
          onClick={showCart}
          disabled={cartItemCount === 0}
        >
          {cartItemCount === 0 ? 'Cart is empty' : 'Review your cart'}
        </button>
        <button className="btn btn--ghost" type="button" onClick={showCatalog}>
          Back to home
        </button>
      </div>
    </section>
  )
}

export default Shop

function RoseBundleCard({ bouquet, availabilityLabels, currencyFormatter, handleAddToCart }) {
  const [selectedVariantId, setSelectedVariantId] = useState(bouquet.variants[0]?.id)

  const selectedVariant =
    bouquet.variants.find((variant) => variant.id === selectedVariantId) ?? bouquet.variants[0]

  const handleVariantSelect = (variantId) => {
    setSelectedVariantId(variantId)
  }

  const handleAddVariantToCart = () => {
    if (!selectedVariant) return
    handleAddToCart({
      ...bouquet,
      name: `${bouquet.name} (${selectedVariant.label})`,
      price: selectedVariant.price,
      image: selectedVariant.image,
      alt: selectedVariant.alt ?? bouquet.alt,
      description: `${selectedVariant.label} of our heirloom roses`,
    })
  }

  return (
    <article className="bouquet-card bouquet-card--shop bouquet-card--rose">
      <div className="rose-card__media">
        <img src={selectedVariant.image} alt={selectedVariant.alt ?? bouquet.alt} />
      </div>
      <div className="rose-card__body">
        {bouquet.ribbon && <span className="bouquet-card__badge">{bouquet.ribbon}</span>}
        <h3>{bouquet.name}</h3>
        <p>{bouquet.description}</p>
        <span className={`bouquet-card__availability bouquet-card__availability--${bouquet.availability}`}>
          {availabilityLabels[bouquet.availability]}
        </span>

        <div className="rose-card__options" role="group" aria-label="Select number of branches">
          {bouquet.variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              className={`rose-card__option${variant.id === selectedVariant.id ? ' rose-card__option--active' : ''}`}
              onClick={() => handleVariantSelect(variant.id)}
            >
              <span>{variant.label}</span>
              <span>{currencyFormatter.format(variant.price)}</span>
            </button>
          ))}
        </div>

        <div className="rose-card__footer">
          <div>
            <p className="rose-card__quantity-label">Selected:</p>
            <p className="rose-card__quantity-value">{selectedVariant.label}</p>
            <p className="rose-card__price">{currencyFormatter.format(selectedVariant.price)}</p>
          </div>
          <button className="btn btn--secondary" type="button" onClick={handleAddVariantToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
