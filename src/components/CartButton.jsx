import { useEffect, useRef, useState } from 'react'

function CartButton({ children = 'Add to cart', className = '', onClick, ...props }) {
  const [isFlying, setFlying] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleClick = (event) => {
    setFlying(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => setFlying(false), 900)
    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  return (
    <button
      type="button"
      {...props}
      onClick={handleClick}
      className={`flying-button flying-button--cart ${isFlying ? 'is-flying' : ''} ${className}`.trim()}
    >
      <span className="svg-wrapper" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 4h-1m1 0 2.4 12.2a1 1 0 0 0 .98.8h9.4a1 1 0 0 0 .98-.8L20 7H6.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="20" r="1" fill="currentColor" />
          <circle cx="17" cy="20" r="1" fill="currentColor" />
        </svg>
      </span>
      <span>{children}</span>
    </button>
  )
}

export default CartButton
