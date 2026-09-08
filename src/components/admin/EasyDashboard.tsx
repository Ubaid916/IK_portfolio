import Link from 'next/link'
import React from 'react'

const cards = [
  {
    href: '/admin/globals/homepage',
    title: 'Logo & Website Text',
    body: 'Logo photo ya text, naam, about, services, contact, social links.',
    action: 'Edit text →',
  },
  {
    href: '/admin/collections/projects/create',
    title: 'Add a Project',
    body: 'Cover photo, video aur link — ek hi form. Naya page nahi.',
    action: 'Add project →',
  },
  {
    href: '/admin/collections/projects',
    title: 'Portfolio Projects',
    body: 'Purane projects edit / delete, order change.',
    action: 'Open list →',
  },
  {
    href: '/admin/collections/reels/create',
    title: 'Add a Reel',
    body: 'Short video upload. Optional cover photo aur Instagram link.',
    action: 'Add reel →',
  },
  {
    href: '/admin/collections/reels',
    title: 'Reels',
    body: 'Saari reels dekho aur edit karo.',
    action: 'Open list →',
  },
  {
    href: '/',
    title: 'View Website',
    body: 'Save ke baad website kholo aur check karo.',
    action: 'Open site →',
    external: true,
  },
]

export default function EasyDashboard() {
  return (
    <div className="easy-dash">
      <h1>Edit your website</h1>
      <p className="easy-hint">
        Coding ki zaroorat nahi. Box pe click karo, text / photo / video change karo, phir upar{' '}
        <strong>Save</strong> dabao.
      </p>

      <div className="easy-dash-grid">
        {cards.map((card) =>
          card.external ? (
            <a key={card.href} href={card.href} target="_blank" rel="noreferrer" className="easy-card">
              <strong>{card.title}</strong>
              <span>{card.body}</span>
              <em className="easy-action">{card.action}</em>
            </a>
          ) : (
            <Link key={card.href} href={card.href} className="easy-card">
              <strong>{card.title}</strong>
              <span>{card.body}</span>
              <em className="easy-action">{card.action}</em>
            </Link>
          ),
        )}
      </div>

      <div className="easy-steps">
        <strong>Simple steps</strong>
        <ol>
          <li>Upar se box choose karo.</li>
          <li>Text likho, ya photo/video isi page pe upload karo.</li>
          <li>Services / projects pe link paste karo (YouTube, WhatsApp, #work).</li>
          <li>
            <strong>Save</strong> dabao, phir <strong>View Website</strong> se check karo.
          </li>
        </ol>
      </div>
    </div>
  )
}
