import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import fs from 'fs'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Reels } from './collections/Reels'
import { Homepage } from './globals/Homepage'
import { defaultHomepage } from './lib/defaults'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = (
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.COOLIFY_URL ||
  'http://localhost:3000'
).replace(/\/$/, '')

function resolveSqliteUrl() {
  const candidates = [
    process.env.DATABASE_URL,
    `file:${path.join(process.cwd(), 'portfolio.db')}`,
    'file:/tmp/portfolio.db',
  ].filter(Boolean) as string[]

  for (const url of candidates) {
    if (!url.startsWith('file:')) return url
    const filePath = url.slice('file:'.length)
    const abs = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath)
    try {
      fs.mkdirSync(path.dirname(abs), { recursive: true })
      fs.accessSync(path.dirname(abs), fs.constants.W_OK)
      return `file:${abs}`
    } catch {
      // try next writable location
    }
  }

  return 'file:/tmp/portfolio.db'
}

export default buildConfig({
  serverURL,
  cors: [serverURL],
  csrf: [serverURL],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | Edit Website',
    },
    components: {
      beforeDashboard: ['/components/admin/EasyDashboard'],
    },
  },
  collections: [Users, Media, Projects, Reels],
  globals: [Homepage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'change-me-in-production-min-32-chars!!',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: resolveSqliteUrl(),
    },
    // Local `next dev` still auto-pushes. Production ignores push and
    // must run these migrations or admin/login crashes with no tables.
    push: true,
    prodMigrations: migrations,
  }),
  sharp,
  onInit: async (payload) => {
    try {
      const existing = await payload.findGlobal({ slug: 'homepage' })
      if (!existing?.logoText) {
        const { logoUrl: _logoUrl, services, ...rest } = defaultHomepage
        await payload.updateGlobal({
          slug: 'homepage',
          data: {
            ...rest,
            services: services.map(({ imageUrl: _imageUrl, ...service }) => service),
          },
        })
        payload.logger.info('Seeded homepage content defaults')
      }
    } catch (error) {
      payload.logger.error({ err: error }, 'Homepage seed skipped')
    }
  },
})
