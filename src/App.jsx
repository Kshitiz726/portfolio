import { useCallback, useEffect, useState } from 'react'
import ThemeToggle from './components/ThemeToggle'
import Lightbox from './components/Lightbox'
import VideoEmbed from './components/VideoEmbed'
import {
  profile,
  links,
  education,
  research,
  projects,
  experience,
  achievements,
  certifications,
  writing,
} from './content'
import './App.css'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_IDS = SECTIONS.map((s) => s.id)

/* ------------------------------- routing --------------------------------
   A tiny hash router. Blog routes use a leading slash (#/blog, #/blog/slug)
   so they never collide with the same-page section anchors (#about, #skills).
   Hash routing works on any static host with no server rewrite config. */

function parseHash() {
  const h = window.location.hash.replace(/^#/, '')
  if (h === '/blog') return { name: 'blog' }
  if (h.startsWith('/blog/')) return { name: 'post', slug: h.slice('/blog/'.length) }
  return { name: 'home' }
}

function useRoute() {
  const [route, setRoute] = useState(parseHash)
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

// Opens the Gmail web compose window with the address pre-filled as recipient.
const gmailHref = (email) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`

// Opens a WhatsApp chat. wa.me wants digits only, including country code.
const whatsappHref = (phone) => `https://wa.me/${phone.replace(/\D/g, '')}`

/** Highlights the nav link for whichever section is currently in view. */
function useScrollSpy(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
        const first = ids.find((id) => visible.get(id))
        if (first) setActive(first)
      },
      // Trips as a heading passes just below the sticky nav.
      { rootMargin: '-20% 0px -70% 0px' },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function App() {
  const route = useRoute()

  // Any move into or between blog views starts at the top of the page.
  useEffect(() => {
    if (route.name !== 'home') window.scrollTo(0, 0)
  }, [route.name, route.slug])

  if (route.name === 'blog') return <Blog />
  if (route.name === 'post') {
    const post = writing.find((w) => w.slug === route.slug)
    return post ? <BlogPost post={post} /> : <Blog />
  }
  return <Home />
}

function Home() {
  const active = useScrollSpy(SECTION_IDS)
  const shownLinks = links.filter((l) => l.url)
  const githubUrl = links.find((l) => l.label === 'GitHub')?.url
  // { items, index } while a scan or photo is open, otherwise null.
  const [viewer, setViewer] = useState(null)
  const openViewer = useCallback((items, index) => setViewer({ items, index }), [])
  const closeViewer = useCallback(() => setViewer(null), [])
  const setIndex = useCallback((i) => setViewer((v) => v && { ...v, index: i }), [])

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>

      <header className="nav">
        <div className="nav__inner">
          <a className="nav__mark" href="#top">
            {initials(profile.name)}
          </a>
          <nav className="nav__links" aria-label="Sections">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={active === s.id ? 'is-active' : undefined}
                aria-current={active === s.id ? 'true' : undefined}
              >
                {s.label}
              </a>
            ))}
            {writing.length > 0 && (
              <a href="#/blog" className="nav__blog">
                Blog
              </a>
            )}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="top">
        <Hero links={shownLinks} />

        <Section id="about" label="01" title="About">
          {profile.bio ? (
            profile.bio
              .split('\n\n')
              .map((para, i) => (
                <p key={i} className="prose">
                  {para.trim()}
                </p>
              ))
          ) : (
            <Empty what="bio" field="profile.bio" />
          )}

          <h3 className="subhead">Education</h3>
          {education.length ? (
            <ul className="stack">
              {education.map((e) => (
                <li key={e.degree + e.institution} className="entry">
                  <div className="entry__head">
                    <h4 className="entry__title">{e.degree}</h4>
                    <span className="entry__meta">{e.period}</span>
                  </div>
                  <p className="entry__sub">{e.institution}</p>
                  {e.detail && <p className="entry__detail">{e.detail}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="education entries" field="education" />
          )}
        </Section>

        <Section id="research" label="02" title="Research &amp; Publications">
          {research.length ? (
            <ol className="stack stack--numbered">
              {research.map((r) => (
                <li key={r.title} className="entry">
                  <div className="entry__head">
                    <h4 className="entry__title">
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noreferrer">
                          {r.title}
                        </a>
                      ) : (
                        r.title
                      )}
                    </h4>
                    {r.status && <Badge status={r.status} />}
                  </div>
                  {r.authors?.length > 0 && (
                    <p className="entry__sub">
                      {r.authors.map((au, i) => (
                        <span key={au.name}>
                          {au.name}
                          {au.corresponding && <sup className="author-mark">*</sup>}
                          {i < r.authors.length - 1 && ', '}
                        </span>
                      ))}
                    </p>
                  )}
                  <p className="entry__detail">
                    {r.venue && <em>{r.venue}</em>}
                    {r.venue && r.year ? ', ' : ''}
                    {r.year}
                  </p>
                  {r.authors?.some((au) => au.corresponding) && (
                    <p className="entry__note">
                      <sup className="author-mark">*</sup> Corresponding author
                    </p>
                  )}
                  {r.doi && (
                    <p className="doi">
                      <a
                        className="doi__link"
                        href={`https://doi.org/${r.doi}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="doi__badge">DOI</span>
                        <span className="doi__id">{r.doi}</span>
                      </a>
                    </p>
                  )}
                  <MediaStrip media={r.media} onOpen={openViewer} />
                </li>
              ))}
            </ol>
          ) : (
            <Empty what="publications" field="research" />
          )}
        </Section>

        <Section id="projects" label="03" title="Featured Projects">
          {projects.length ? (
            <>
            <div className="projects">
              {projects.map((p) => {
                // The right column holds the video if there is one, otherwise
                // the headline result. Either way the card reads as a wide,
                // balanced row rather than a lone narrow column.
                const hasAside = Boolean(p.video || p.outcome)
                return (
                  <article
                    key={p.name}
                    className={hasAside ? 'pcard' : 'pcard pcard--solo'}
                  >
                    <div className="pcard__main">
                      <h3 className="pcard__title">{p.name}</h3>
                      <p className="pcard__summary">{p.summary}</p>
                      {/* For video cards the result lives here in the body,
                          since the aside is taken by the player. */}
                      {p.video && p.outcome && (
                        <p className="card__outcome">{p.outcome}</p>
                      )}
                      {p.stack?.length > 0 && (
                        <ul className="tags">
                          {p.stack.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      )}
                      {(p.repo || p.demo) && (
                        <div className="card__links">
                          {p.repo && (
                            <a href={p.repo} target="_blank" rel="noreferrer">
                              Code
                            </a>
                          )}
                          {p.demo && (
                            <a href={p.demo} target="_blank" rel="noreferrer">
                              {p.demoLabel || 'Live demo'}
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {hasAside && (
                      <div className="pcard__aside">
                        {p.video ? (
                          <VideoEmbed
                            id={p.video}
                            title={p.name}
                            start={p.videoStart}
                          />
                        ) : (
                          <p className="pcard__result">{p.outcome}</p>
                        )}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
            {githubUrl && (
              <p className="projects__more">
                These are a few highlights. Many more on{' '}
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  GitHub →
                </a>
              </p>
            )}
            </>
          ) : (
            <Empty what="projects" field="projects" />
          )}
        </Section>

        <Section id="experience" label="04" title="Experience">
          {experience.length ? (
            <ul className="stack">
              {experience.map((x) => (
                <li key={x.role + x.org} className="entry">
                  <div className="entry__head">
                    <h4 className="entry__title">{x.role}</h4>
                    <span className="entry__meta">{x.period}</span>
                  </div>
                  <p className="entry__sub">{x.org}</p>
                  {x.points?.length > 0 && (
                    <ul className="bullets">
                      {x.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  )}
                  <MediaStrip media={x.media} onOpen={openViewer} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="roles" field="experience" />
          )}
        </Section>

        <Section id="awards" label="05" title="Achievements & Certifications">
          {achievements.length ? (
            <ul className="stack">
              {achievements.map((a) => (
                <li key={a.title} className="entry">
                  <div className="entry__head">
                    <h4 className="entry__title">{a.title}</h4>
                    <span className="entry__meta">{a.year}</span>
                  </div>
                  <p className="entry__sub">{a.awarder}</p>
                  {a.detail && <p className="entry__detail">{a.detail}</p>}
                  {a.stats?.length > 0 && (
                    <ul className="stats">
                      {a.stats.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  )}
                  <MediaStrip media={a.media} onOpen={openViewer} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="achievements" field="achievements" />
          )}

          {certifications.length > 0 && (
            <div className="certs">
              <h4 className="certs__label">Certifications</h4>
              <div className="certgrid">
                {certifications.map((c) => (
                  <CertCard key={c.title} cert={c} onOpen={openViewer} />
                ))}
              </div>
            </div>
          )}
        </Section>

        <Section id="contact" label="06" title="Contact">
          {profile.email ? (
            <>
              <p className="prose">The fastest way to reach me is email.</p>
              <div className="contact__actions">
                <a
                  className="btn btn--primary btn--lg"
                  href={gmailHref(profile.email)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profile.email}
                </a>
                {profile.phone && (
                  <a
                    className="btn btn--lg"
                    href={whatsappHref(profile.phone)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp {profile.phone}
                  </a>
                )}
              </div>
            </>
          ) : (
            <Empty what="email address" field="profile.email" />
          )}

          {shownLinks.length > 0 && (
            <ul className="contact__links">
              {shownLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </main>

      <Footer />

      {viewer && (
        <Lightbox
          items={viewer.items}
          index={viewer.index}
          onIndex={setIndex}
          onClose={closeViewer}
        />
      )}
    </>
  )
}

/* ------------------------------ blog views ------------------------------- */

/** Slim top bar for the blog views: home link, blog link, theme toggle. */
function BlogTopBar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__mark" href="#">
          {initials(profile.name)}
        </a>
        <nav className="nav__links" aria-label="Primary">
          <a href="#">Portfolio</a>
          <a href="#/blog" className="is-active" aria-current="true">
            Blog
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

/** Renders an article's ordered content blocks (headings, paragraphs, equations). */
function ArticleBody({ body }) {
  return (
    <div className="article__body">
      {body.map((block, i) => {
        if (block.type === 'h') {
          return (
            <h2 key={i} className="article__subhead">
              {block.text}
            </h2>
          )
        }
        if (block.type === 'eq') {
          return (
            <figure key={i} className="equation">
              <p className="equation__expr">{block.text}</p>
              {block.caption && (
                <figcaption className="equation__caption">{block.caption}</figcaption>
              )}
            </figure>
          )
        }
        return (
          <p key={i} className="article__p">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

/** The blog index: one card per post, linking to its own page. */
function Blog() {
  return (
    <>
      <BlogTopBar />
      <main className="blog">
        <div className="blog__inner">
          <header className="blog__head">
            <p className="section__label">Writing</p>
            <h1 className="blog__title">Blog</h1>
            <p className="blog__lead">
              Essays and notes on things I am thinking about, from neuroscience to the
              systems I build.
            </p>
          </header>

          {writing.length ? (
            <ul className="postlist">
              {writing.map((w) => (
                <li key={w.slug} className="postcard">
                  <a className="postcard__link" href={`#/blog/${w.slug}`}>
                    <p className="postcard__meta">
                      {[w.date, w.readingTime].filter(Boolean).join(' · ')}
                    </p>
                    <h2 className="postcard__title">{w.title}</h2>
                    {w.summary && <p className="postcard__summary">{w.summary}</p>}
                    {w.tags?.length > 0 && (
                      <ul className="tags">
                        {w.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    <span className="postcard__more">Read →</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="writing" field="writing" />
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

/** A single post on its own page. */
function BlogPost({ post }) {
  return (
    <>
      <BlogTopBar />
      <main className="blog">
        <article className="post">
          <a className="post__back" href="#/blog">
            ← All writing
          </a>

          <header className="post__head">
            <p className="postcard__meta">
              {[post.date, post.readingTime].filter(Boolean).join(' · ')}
            </p>
            <h1 className="post__title">{post.title}</h1>
            {post.tags?.length > 0 && (
              <ul className="tags">
                {post.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </header>

          {post.disclaimer && <p className="article__disclaimer">{post.disclaimer}</p>}

          <ArticleBody body={post.body} />

          {post.url && (
            <a
              className="article__more"
              href={post.url}
              target="_blank"
              rel="noreferrer"
            >
              Read the published version →
            </a>
          )}

          <a className="post__back post__back--bottom" href="#/blog">
            ← All writing
          </a>
        </article>
      </main>
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}

function Hero({ links }) {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__tagline">{profile.tagline}</p>
          {profile.location && <p className="hero__location">{profile.location}</p>}

          <div className="hero__actions">
            {profile.resume && (
              <a
                className="btn btn--primary"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                View CV
              </a>
            )}
            {profile.email && (
              <a
                className="btn"
                href={gmailHref(profile.email)}
                target="_blank"
                rel="noreferrer"
              >
                Get in touch
              </a>
            )}
          </div>

          {links.length > 0 && (
            <ul className="hero__links">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {profile.photo && (
          <img
            className="hero__photo"
            src={profile.photo}
            alt={profile.photoAlt || profile.name}
          />
        )}
      </div>
    </section>
  )
}

function Section({ id, label, title, children }) {
  return (
    <section id={id} className="section">
      <div className="section__inner">
        <div className="section__head">
          <span className="section__label">{label}</span>
          <h2 className="section__title">{title}</h2>
        </div>
        <div className="section__body">{children}</div>
      </div>
    </section>
  )
}

/**
 * Thumbnail strip for an entry's scans and photos. Shared by research,
 * experience, and achievement entries; renders nothing when the entry has no
 * media, so a missing file can never leave a broken image behind.
 */
function MediaStrip({ media, onOpen }) {
  if (!media?.length) return null

  const verifiable = media.find((m) => m.url)

  return (
    <div className="cert">
      <div className="cert__thumbs">
        {media.map((m, i) => (
          <button
            key={m.src}
            type="button"
            className="cert__thumb"
            onClick={() => onOpen(media, i)}
            aria-label={`View: ${m.caption}`}
          >
            <img src={m.src} alt="" loading="lazy" />
            <span className="cert__thumb-hint">View</span>
          </button>
        ))}
      </div>

      <div className="cert__actions">
        <button
          type="button"
          className="btn btn--sm"
          onClick={() => onOpen(media, 0)}
        >
          {media.length > 1 ? `View all (${media.length})` : 'View certificate'}
        </button>
        {verifiable && (
          <a
            className="cert__verify"
            href={verifiable.url}
            target="_blank"
            rel="noreferrer"
          >
            Verify online →
          </a>
        )}
      </div>
    </div>
  )
}

/**
 * Compact card for a single course/certificate, laid out in a grid so the
 * lighter-weight credentials don't stretch the page the way full stacked
 * entries would. The thumbnail opens the same lightbox as MediaStrip.
 */
function CertCard({ cert, onOpen }) {
  const thumb = cert.media?.[0]
  const verifiable = cert.media?.find((m) => m.url)

  return (
    <div className="certcard">
      {thumb && (
        <button
          type="button"
          className="certcard__thumb"
          onClick={() => onOpen(cert.media, 0)}
          aria-label={`View: ${thumb.caption}`}
        >
          <img src={thumb.src} alt="" loading="lazy" />
          <span className="cert__thumb-hint">View</span>
        </button>
      )}
      <div className="certcard__body">
        <h5 className="certcard__title">{cert.title}</h5>
        <p className="certcard__sub">
          <strong className="certcard__awarder">{cert.awarder}</strong>
        </p>
        {cert.stats?.length > 0 && (
          <ul className="stats">
            {cert.stats.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        {verifiable && (
          <a
            className="cert__verify"
            href={verifiable.url}
            target="_blank"
            rel="noreferrer"
          >
            Verify online →
          </a>
        )}
      </div>
    </div>
  )
}

function Badge({ status }) {
  const tone = status.toLowerCase().startsWith('publish') ? 'published' : 'pending'
  return <span className={`badge badge--${tone}`}>{status}</span>
}

function Empty({ what, field }) {
  return (
    <p className="empty">
      No {what} yet. Set <code>{field}</code> in <code>src/content.js</code>.
    </p>
  )
}

function initials(name) {
  return (
    name
      .split(/\s+/)
      .filter((w) => /^[A-Za-z]/.test(w))
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('') || ''
  )
}
