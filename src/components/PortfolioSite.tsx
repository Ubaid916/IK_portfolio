import type { ReactNode } from 'react'

type Homepage = Awaited<ReturnType<typeof import('@/lib/content').getHomepageContent>>
type Project = {
  title: string
  category: string
  videoUrl: string
  imageUrl?: string
  link?: string
  linkLabel?: string
}
type Reel = { label: string; videoUrl: string; imageUrl?: string; link?: string }

function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href)
}

function CtaLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  const external = isExternalLink(href)
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

function MediaPlaceholder({
  label,
  tall,
}: {
  label: string
  tall?: boolean
}) {
  return (
    <div
      style={{
        aspectRatio: tall ? '9/16' : '16/9',
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#555',
        fontSize: 13,
      }}
    >
      {label}
    </div>
  )
}

export function PortfolioSite({
  content,
  projects,
  reels,
}: {
  content: Homepage
  projects: Project[]
  reels: Reel[]
}) {
  const navLink = content.navCtaLink || '#contact'
  const primaryLink = content.heroPrimaryCtaLink || '#work'
  const secondaryLink = content.heroSecondaryCtaLink || '#contact'
  const contactLink =
    content.contactCtaLink ||
    (content.contactEmail ? `mailto:${content.contactEmail}` : '#contact')
  const showLogoImage = content.logoType === 'image' && content.logoUrl

  return (
    <>
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="#" className="logo">
            {showLogoImage ? (
              <img src={content.logoUrl} alt={content.logoText || 'Logo'} className="logo-image" />
            ) : (
              <>
                {content.logoText}
                <span>.</span>
              </>
            )}
          </a>
          <ul className="nav-links">
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#software">Tools</a>
            </li>
          </ul>
          <CtaLink href={navLink} className="nav-btn">
            {content.navCta}
          </CtaLink>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="dot" />
              {content.heroTag}
            </div>
            <h1>
              {content.heroNameLine1}
              <br />
              <span>{content.heroNameLine2}</span>
            </h1>
            <p className="hero-description">{content.heroDescription}</p>
            <div className="hero-buttons">
              <CtaLink href={primaryLink} className="btn btn-primary">
                {content.heroPrimaryCta}
              </CtaLink>
              <CtaLink href={secondaryLink} className="btn btn-outline">
                {content.heroSecondaryCta}
              </CtaLink>
            </div>
            <div className="hero-stats">
              {content.heroStats?.map((stat, i) => (
                <div className="stat" key={i}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="portfolio" id="work">
        <div className="container">
          <div className="section-label">{content.workLabel}</div>
          <h2 className="section-title">{content.workTitle}</h2>
          <p className="section-description">{content.workDescription}</p>

          <div className="featured-videos">
            {projects.map((project, i) => (
              <div className="video-card" key={i}>
                {project.videoUrl ? (
                  <video controls preload="none" poster={project.imageUrl || undefined}>
                    <source src={project.videoUrl} type="video/mp4" />
                    Your browser does not support video.
                  </video>
                ) : project.imageUrl ? (
                  project.link ? (
                    <CtaLink href={project.link}>
                      <img src={project.imageUrl} alt={project.title} className="cover" />
                    </CtaLink>
                  ) : (
                    <img src={project.imageUrl} alt={project.title} className="cover" />
                  )
                ) : (
                  <MediaPlaceholder label="Add photo or video in Admin" />
                )}
                <div className="video-info">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  {project.link ? (
                    <CtaLink href={project.link} className="btn btn-outline project-link-btn">
                      {project.linkLabel || 'View Project'}
                    </CtaLink>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="reels-heading">
            <div>
              <div className="section-label">{content.reelsLabel}</div>
              <h2 className="section-title">{content.reelsTitle}</h2>
            </div>
            <p>{content.reelsDescription}</p>
          </div>

          <div className="reels-grid">
            {reels.map((reel, i) => {
              const media = reel.videoUrl ? (
                <video controls preload="none" poster={reel.imageUrl || undefined}>
                  <source src={reel.videoUrl} type="video/mp4" />
                </video>
              ) : reel.imageUrl ? (
                <img src={reel.imageUrl} alt={reel.label} className="cover-reel" />
              ) : (
                <MediaPlaceholder label="No video" tall />
              )

              return (
                <div className="reel-card" key={i}>
                  {reel.link ? <CtaLink href={reel.link}>{media}</CtaLink> : media}
                  <div className="reel-label">{reel.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="services">
        <div className="container">
          <div className="section-label">{content.servicesLabel}</div>
          <h2 className="section-title">{content.servicesTitle}</h2>
          <p className="section-description">{content.servicesDescription}</p>
          <div className="services-grid">
            {content.services?.map((service, i) => {
              const inner = (
                <>
                  {service.imageUrl ? (
                    <img src={service.imageUrl} alt={service.title} className="service-card-media" />
                  ) : (
                    <div className="service-icon">{service.icon || '✦'}</div>
                  )}
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.features?.map((f, j) => (
                      <li key={j}>{f.item}</li>
                    ))}
                  </ul>
                  {service.link && service.linkLabel ? (
                    <span className="service-btn">{service.linkLabel}</span>
                  ) : null}
                </>
              )

              return service.link ? (
                <CtaLink href={service.link} className="service-card" key={i}>
                  {inner}
                </CtaLink>
              ) : (
                <div className="service-card" key={i}>
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-card">
                <span>{content.aboutCardLabel}</span>
                <strong>{content.aboutCardText}</strong>
              </div>
            </div>
            <div className="about-text">
              <div className="section-label">{content.aboutLabel}</div>
              <h2 className="section-title">{content.aboutTitle}</h2>
              <p>{content.aboutParagraph1}</p>
              <p>{content.aboutParagraph2}</p>
              <ul className="about-list">
                {content.aboutList?.map((item, i) => (
                  <li key={i}>{item.item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="software" id="software">
        <div className="container">
          <div className="section-label">{content.toolsLabel}</div>
          <h2 className="section-title">{content.toolsTitle}</h2>
          <p className="section-description">{content.toolsDescription}</p>
          <div className="tools">
            {content.tools?.map((tool, i) => (
              <div className="tool" key={i}>
                {tool.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process">
        <div className="container">
          <div className="section-label">{content.processLabel}</div>
          <h2 className="section-title">{content.processTitle}</h2>
          <p className="section-description">{content.processDescription}</p>
          <div className="process-grid">
            {content.processSteps?.map((step, i) => (
              <div className="process-card" key={i}>
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="container">
          <div className="cta-content">
            <div className="section-label">{content.contactLabel}</div>
            <h2>
              {content.contactTitle}
              <br />
              <span style={{ color: 'var(--accent)' }}>{content.contactTitleAccent}</span>
            </h2>
            <p>{content.contactDescription}</p>
            <CtaLink href={contactLink} className="btn btn-primary">
              {content.contactCta}
            </CtaLink>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-inner">
          <p>{content.footerText}</p>
          <div className="socials">
            {content.socials?.map((social, i) => (
              <a key={i} href={social.url} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
