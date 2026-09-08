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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.COOLIFY_URL ||
  'http://localhost:3000'

fs.mkdirSync(path.resolve(dirname, '../media'), { recursive: true })

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
      url: process.env.DATABASE_URL || 'file:./portfolio.db',
    },
    // Production Docker (HostCry) starts with an empty DB. Push creates tables.
    push: true,
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
