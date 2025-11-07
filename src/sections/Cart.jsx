import { useMemo, useState } from 'react'
import LoginModal from '../components/LoginModal'

function Cart({
  cart,
  cartSubtotal,
  currencyFormatter,
  handleQuantityChange,
  handleRemoveFromCart,
  handleEmptyCart,
  showShop,
}) {
  const [checkoutMode, setCheckoutMode] = useState('guest')
  const [newsletterOptIn, setNewsletterOptIn] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apt: '',
    city: '',
    state: '',
    postal: '',
    password: '',
  })

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const requiredFields = useMemo(() => {
    const baseFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'postal']
    return checkoutMode === 'account' ? [...baseFields, 'password'] : baseFields
  }, [checkoutMode])

  const formIsComplete = requiredFields.every((field) => formData[field].trim().length > 0)

  const handleCheckoutClick = () => {
    window.location.href = 'https://buy.stripe.com/test_5kQ5kC4fI1Cz7HV3K32go00'
  }

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
          <div className="cart-main">
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
                          className="cart-item__quantity-btn cart-item__quantity-btn--decrease"
                          data-symbol="−"
                          onClick={() => handleQuantityChange(item.name, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        />
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-item__quantity-btn cart-item__quantity-btn--increase"
                          data-symbol="+"
                          onClick={() => handleQuantityChange(item.name, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                        />
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

            <section className="checkout-access" aria-labelledby="checkout-access-heading">
              <div className="checkout-access__header">
                <button className="checkout-access__login checkout-access__login--inline" type="button" onClick={() => setShowLogin(true)}>
                  Already have an account? Log in
                </button>
                <h3 id="checkout-access-heading">Who&apos;s receiving these blooms?</h3>
                <p>Continue as a guest or create an account to save your delivery details for next time.</p>
              </div>

              <div className="checkout-access__mode" role="tablist" aria-label="Checkout preference">
                <button
                  type="button"
                  role="tab"
                  aria-selected={checkoutMode === 'guest'}
                  className={`checkout-access__mode-button${
                    checkoutMode === 'guest' ? ' checkout-access__mode-button--active' : ''
                  }`}
                  onClick={() => setCheckoutMode('guest')}
                >
                  Continue as guest
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={checkoutMode === 'account'}
                  className={`checkout-access__mode-button${
                    checkoutMode === 'account' ? ' checkout-access__mode-button--active' : ''
                  }`}
                  onClick={() => setCheckoutMode('account')}
                >
                  Save details &amp; create account
                </button>
              </div>

              <form className="checkout-access__form">
                <div className="checkout-access__grid">
                  <label className="checkout-access__field">
                    <span>Full name</span>
                    <input type="text" name="fullName" placeholder="First and last name" value={formData.fullName} onChange={handleFieldChange} required />
                  </label>
                  <label className="checkout-access__field">
                    <span>Email</span>
                    <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleFieldChange} required />
                  </label>
                  <label className="checkout-access__field">
                    <span>Phone</span>
                    <input type="tel" name="phone" placeholder="(415) 555-0191" value={formData.phone} onChange={handleFieldChange} required />
                  </label>
                  <label className="checkout-access__field checkout-access__field--wide">
                    <span>Street address</span>
                    <input type="text" name="address" placeholder="123 Market Street" value={formData.address} onChange={handleFieldChange} required />
                  </label>
                  <label className="checkout-access__field">
                    <span>Apartment / suite</span>
                    <input type="text" name="apt" placeholder="Optional" value={formData.apt} onChange={handleFieldChange} />
                  </label>
                  <label className="checkout-access__field">
                    <span>City</span>
                    <input type="text" name="city" placeholder="San Francisco" value={formData.city} onChange={handleFieldChange} required />
                  </label>
                  <label className="checkout-access__field">
                    <span>State</span>
                    <select name="state" required value={formData.state} onChange={handleFieldChange}>
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="CA">CA</option>
                      <option value="OR">OR</option>
                      <option value="WA">WA</option>
                      <option value="NY">NY</option>
                    </select>
                  </label>
                  <label className="checkout-access__field">
                    <span>Postal code</span>
                    <input type="text" name="postal" placeholder="94105" value={formData.postal} onChange={handleFieldChange} required />
                  </label>
                </div>

                {checkoutMode === 'account' && (
                  <label className="checkout-access__field checkout-access__field--wide">
                    <span>Create a password</span>
                    <input type="password" name="password" placeholder="At least 8 characters" value={formData.password} onChange={handleFieldChange} required />
                  </label>
                )}

                <label className="checkout-access__checkbox">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={newsletterOptIn}
                    onChange={() => setNewsletterOptIn((prev) => !prev)}
                  />
                  <span>Keep me updated on new bouquets, seasonal drops, and workshops.</span>
                </label>
                <label className="checkout-access__checkbox">
                  <input type="checkbox" name="delivery-updates" defaultChecked />
                  <span>Text me delivery updates on the number above.</span>
                </label>

              </form>
            </section>
          </div>

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
              <button className="btn btn--primary" type="button" onClick={handleCheckoutClick} disabled={!formIsComplete}>
                Proceed to checkout
              </button>
              <button className="btn btn--ghost" type="button" onClick={showShop}>
                Continue shopping
              </button>
              <button className="cart-summary__empty" type="button" onClick={handleEmptyCart}>
                Empty cart
              </button>
            </div>
          </aside>
        </div>
      )}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </section>
  )
}

export default Cart
