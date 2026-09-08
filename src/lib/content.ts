import { getPayload } from 'payload'
import config from '@payload-config'
import {
  defaultHomepage,
  defaultProjects,
  defaultReels,
} from '@/lib/defaults'

type MediaDoc = {
  url?: string | null
  filename?: string | null
}

function mediaUrl(media: unknown): string {
  if (!media || typeof media !== 'object') return ''
  const m = media as MediaDoc
  return m.url || ''
}

type ServiceDoc = {
  icon?: string | null
  title: string
  description: string
  features?: { item: string }[] | null
  image?: unknown
  link?: string | null
  linkLabel?: string | null
}

export async function getHomepageContent() {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'homepage', depth: 2 })
    const skip = new Set(['id', 'updatedAt', 'createdAt', 'logoImage', 'services'])

    const services =
      Array.isArray(data.services) && data.services.length
        ? data.services.map((s: ServiceDoc) => ({
            icon: s.icon,
            title: s.title,
            description: s.description,
            features: s.features,
            imageUrl: mediaUrl(s.image),
            link: s.link || '',
            linkLabel: s.linkLabel || '',
          }))
        : defaultHomepage.services

    return {
      ...defaultHomepage,
      ...Object.fromEntries(
        Object.entries(data).filter(([k, v]) => {
          if (skip.has(k)) return false
          return v !== null && v !== undefined && v !== ''
        }),
      ),
      logoType: data.logoType === 'image' ? 'image' : 'text',
      logoUrl: mediaUrl(data.logoImage),
      heroStats:
        Array.isArray(data.heroStats) && data.heroStats.length
          ? data.heroStats
          : defaultHomepage.heroStats,
      services,
      aboutList:
        Array.isArray(data.aboutList) && data.aboutList.length
          ? data.aboutList
          : defaultHomepage.aboutList,
      tools:
        Array.isArray(data.tools) && data.tools.length ? data.tools : defaultHomepage.tools,
      processSteps:
        Array.isArray(data.processSteps) && data.processSteps.length
          ? data.processSteps
          : defaultHomepage.processSteps,
      socials:
        Array.isArray(data.socials) && data.socials.length
          ? data.socials
          : defaultHomepage.socials,
    }
  } catch {
    return defaultHomepage
  }
}

export async function getProjects() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      sort: 'order',
      depth: 1,
      limit: 50,
    })
    if (!result.docs.length) return defaultProjects
    return result.docs.map((doc) => ({
      title: doc.title,
      category: doc.category,
      videoUrl: mediaUrl(doc.video),
      imageUrl: mediaUrl(doc.coverImage),
      link: typeof doc.link === 'string' ? doc.link : '',
      linkLabel: typeof doc.linkLabel === 'string' && doc.linkLabel ? doc.linkLabel : 'View Project',
    }))
  } catch {
    return defaultProjects
  }
}

export async function getReels() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'reels',
      sort: 'order',
      depth: 1,
      limit: 50,
    })
    if (!result.docs.length) return defaultReels
    return result.docs.map((doc) => ({
      label: doc.label,
      videoUrl: mediaUrl(doc.video),
      imageUrl: mediaUrl(doc.coverImage),
      link: typeof doc.link === 'string' ? doc.link : '',
    }))
  } catch {
    return defaultReels
  }
}
