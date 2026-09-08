import type { CollectionConfig } from 'payload'

export const Reels: CollectionConfig = {
  slug: 'reels',
  labels: {
    singular: 'Reel',
    plural: 'Reels',
  },
  admin: {
    group: 'Your Website',
    useAsTitle: 'label',
    defaultColumns: ['label', 'updatedAt'],
    description: 'Short videos. Create New → naam + video upload — ek hi page. Save dabao.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Reel name',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover photo (optional)',
      admin: {
        description: 'Thumbnail. Video ke saath bhi laga sakte ho.',
      },
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      label: 'Video',
      admin: {
        description: 'Yahi se upload. Alag Media page nahi.',
      },
      filterOptions: {
        mimeType: { contains: 'video' },
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link (optional)',
      admin: {
        description: 'Instagram / YouTube Shorts link. Example: https://...',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Order (1 pehle dikhega)',
    },
  ],
}
