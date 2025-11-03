function ServiceRequest({ contactInfo, formspreeEndpoint }) {
  const { address, phone, email, hours } = contactInfo

  return (
    <section className="section request" id="request">
      <div className="section__heading">
        <p className="section__eyebrow">Request A Service</p>
        <h2>Tell us how we can bring flowers into your next moment</h2>
        <p>
          Share a few details and our floral designers will follow up within one business day with availability,
          sketches, and pricing options.
        </p>
      </div>

      <div className="request__layout">
        <form
          className="request__form"
          action={formspreeEndpoint}
          method="POST"
        >
          <div className="request__field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required />
          </div>

          <div className="request__field-group">
            <div className="request__field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="request__field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
            </div>
          </div>

          <div className="request__field">
            <label htmlFor="service">Service interested in</label>
            <select id="service" name="service">
              <option value="same-day-delivery">Same-day delivery</option>
              <option value="weekly-subscription">Weekly subscription</option>
              <option value="event-design">Event or wedding design</option>
              <option value="custom-request">Custom request</option>
            </select>
          </div>

          <div className="request__field">
            <label htmlFor="date">Event date (if applicable)</label>
            <input id="date" name="date" type="date" />
          </div>

          <div className="request__field">
            <label htmlFor="message">How can we help?</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Share the occasion, style, preferred blooms, and any other details you have in mind."
              required
            />
          </div>

          <button className="btn btn--primary request__submit" type="submit">
            Send request
          </button>
          <p className="request__disclaimer">
            We respect your privacy. We&apos;ll only use your contact details to respond to this request.
          </p>
        </form>

        <aside className="request__info">
          <div>
            <h3>Visit us</h3>
            <p>{address}</p>
          </div>
          <div>
            <h3>Contact</h3>
            <a href={`tel:${phone.replace(/[^\d]/g, '')}`}>{phone}</a>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div>
            <h3>Studio hours</h3>
            <p>{hours}</p>
          </div>
          <div className="request__note">
            <p>
              Prefer to chat? Call us and ask for the events desk—we&apos;ll gather your brief and schedule a design
              consult.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default ServiceRequest
