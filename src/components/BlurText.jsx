import { motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((step) => Object.keys(step))])

  return Array.from(keys).reduce((acc, key) => {
    acc[key] = [from[key], ...steps.map((step) => step[key])]
    return acc
  }, {})
}

const splitContent = (text, mode) => {
  if (mode === 'chars') {
    return text.split('')
  }
  return text.split(' ')
}

const BlurText = ({
  text = '',
  delay = 100,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.35,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = splitContent(text, animateBy)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold, rootMargin },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(12px)', opacity: 0, y: -50 }
        : { filter: 'blur(12px)', opacity: 0, y: 50 },
    [direction],
  )

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(6px)',
        opacity: 0.55,
        y: direction === 'top' ? 6 : -6,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const stepCount = toSnapshots.length + 1
  const times =
    stepCount === 1
      ? [0]
      : Array.from({ length: stepCount }, (_, index) => (stepCount === 1 ? 0 : index / (stepCount - 1)))

  const keyframes = buildKeyframes(fromSnapshot, toSnapshots)
  const totalDuration = stepDuration * (stepCount - 1)

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => {
        const transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
        }

        if (typeof easing === 'function') {
          transition.ease = easing
        }

        return (
          <motion.span
            key={`${segment}-${index}`}
            className="blur-text__segment"
            initial={fromSnapshot}
            animate={inView ? keyframes : fromSnapshot}
            transition={transition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        )
      })}
    </span>
  )
}

export default BlurText
