import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: true,
  },
  auth: {
    cookies: {
      sameSite: 'Lax',
      secure: (process.env.NEXT_PUBLIC_SERVER_URL || '').startsWith('https://'),
    },
  },
  fields: [],
}
