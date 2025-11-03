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
          {filteredBouquets.map((bouquet) => (
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
          ))}
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
