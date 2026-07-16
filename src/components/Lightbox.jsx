import { useEffect, useRef } from 'react'

/**
 * Native <dialog> rather than a hand-rolled modal: Esc-to-close, focus
 * trapping, and inert background come from the platform.
 *
 * Shows one item of an entry's media at a time, with prev/next when there
 * is more than one.
 */
export default function Lightbox({ items, index, onIndex, onClose }) {
  const ref = useRef(null)
  const item = items[index]
  const many = items.length > 1

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (!dialog.open) dialog.showModal()

    // showModal() alone doesn't stop the page behind from scrolling.
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    dialog.addEventListener('close', onClose)
    return () => {
      dialog.removeEventListener('close', onClose)
      document.body.style.overflow = previous
    }
  }, [onClose])

  useEffect(() => {
    if (!many) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, items.length, many, onIndex])

  const close = () => ref.current?.close()

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item.caption}
      // A click landing on the dialog itself is a click on the backdrop;
      // anything inside the figure stops at the child.
      onClick={(e) => {
        if (e.target === ref.current) close()
      }}
    >
      <figure className="lightbox__figure">
        <div className="lightbox__stage">
          <img className="lightbox__img" src={item.src} alt={item.caption} />

          {many && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                onClick={() => onIndex((index - 1 + items.length) % items.length)}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                onClick={() => onIndex((index + 1) % items.length)}
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}
        </div>

        <figcaption className="lightbox__bar">
          <span className="lightbox__title">
            {many && (
              <span className="lightbox__count">
                {index + 1}/{items.length}
              </span>
            )}
            {item.caption}
          </span>
          <span className="lightbox__actions">
            {item.url && (
              <a href={item.url} target="_blank" rel="noreferrer">
                Verify online →
              </a>
            )}
            <button type="button" className="lightbox__close" onClick={close}>
              Close
            </button>
          </span>
        </figcaption>
      </figure>
    </dialog>
  )
}
