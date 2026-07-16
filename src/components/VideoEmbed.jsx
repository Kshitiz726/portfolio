import { useState } from 'react'

/**
 * Click-to-play YouTube facade. Shows the poster frame until clicked, then
 * swaps in the real iframe — so the page never loads YouTube's player (and its
 * cookies/trackers) unless a visitor actually wants the video. Uses the
 * privacy-preserving nocookie host. Plays inline on the page, no navigation.
 */
export default function VideoEmbed({ id, title, start }) {
  const [playing, setPlaying] = useState(false)

  // maxres isn't generated for every video; hqdefault always exists.
  const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  const startParam = start ? `&start=${start}` : ''

  return (
    <div className="video">
      {playing ? (
        <iframe
          className="video__frame"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${startParam}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="video__poster"
          onClick={() => setPlaying(true)}
          style={{ backgroundImage: `url(${poster})` }}
          aria-label={`Play video: ${title}`}
        >
          <span className="video__play" aria-hidden="true">
            <svg viewBox="0 0 68 48" width="68" height="48">
              <path
                className="video__play-bg"
                d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.5C4 2.3 2.3 4.8 1.5 7.7.1 13 0 24 0 24s.1 11 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.5c2.9-.8 4.6-3.3 5.4-6.2C67.9 35 68 24 68 24s-.1-11-1.5-16.3z"
              />
              <path className="video__play-arrow" d="M45 24 27 14v20z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
