function Cart({
  cart,
  cartSubtotal,
  currencyFormatter,
  handleQuantityChange,
  handleRemoveFromCart,
  showShop,
}) {
  return (
    <section className="section cart" id="cart">
      <div className="section__heading">
        <p className="section__eyebrow">Your cart</p>
        <h2>Ready to share a little joy?</h2>
      </div>

      {cart.length === 0 ? (
        <div className="cart__empty">
          <p>Your cart is currently empty. Start with a bouquet that fits the moment.</p>
          <button className="btn btn--primary" type="button" onClick={showShop}>
            Browse the shop
          </button>
        </div>
      ) : (
        <div className="cart__content">
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.name} className="cart-item">
                <div className="cart-item__media">
                  <img src={item.image} alt={item.alt} />
                </div>
                <div className="cart-item__details">
                  <div className="cart-item__row">
                    <h3>{item.name}</h3>
                    <span className="cart-item__price">{currencyFormatter.format(item.price)}</span>
                  </div>
                  <p className="cart-item__description">{item.description}</p>
                  <div className="cart-item__controls">
                    <div className="cart-item__quantity">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.name, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.name, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button className="cart-item__remove" type="button" onClick={() => handleRemoveFromCart(item.name)}>
                      Remove
                    </button>
                    <span className="cart-item__line-total">
                      {currencyFormatter.format(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="cart-summary">
            <div className="cart-summary__box">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>{currencyFormatter.format(cartSubtotal)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="cart-summary__row cart-summary__total">
                <span>Total</span>
                <span>{currencyFormatter.format(cartSubtotal)}</span>
              </div>
            </div>
            <div className="cart-summary__actions">
              <button className="btn btn--primary" type="button">
                Proceed to checkout
              </button>
              <button className="btn btn--ghost" type="button" onClick={showShop}>
                Continue shopping
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Cart
