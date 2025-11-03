function Footer({ contactInfo }) {
  const { address, phone, email, hours } = contactInfo

  return (
    <footer className="footer" id="contact">
      <div>
        <p className="footer__brand">Bloom &amp; Branch</p>
        <p>{address}</p>
      </div>
      <div className="footer__contact">
        <a href={`tel:${phone.replace(/[^\d]/g, '')}`}>{phone}</a>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <p className="footer__note">{hours}</p>
    </footer>
  )
}

export default Footer
