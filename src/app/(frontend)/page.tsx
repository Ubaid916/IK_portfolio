import { PortfolioSite } from '@/components/PortfolioSite'
import { getHomepageContent, getProjects, getReels } from '@/lib/content'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomepageContent()
  return {
    title: content.siteTitle,
    description: content.heroDescription,
  }
}

export default async function HomePage() {
  const [content, projects, reels] = await Promise.all([
    getHomepageContent(),
    getProjects(),
    getReels(),
  ])

  return <PortfolioSite content={content} projects={projects} reels={reels} />
}
