import path from 'path'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    hidden: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      defaultValue: 'Image',
      admin: {
        description: 'Optional. Agar nahi pata to Image hi rehne do.',
      },
    },
  ],
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
    mimeTypes: ['image/*', 'video/*'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.alt) {
          data.alt = 'Image'
        }
        return data
      },
    ],
  },
}
