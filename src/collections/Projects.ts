import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Portfolio Projects',
  },
  admin: {
    group: 'Your Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
    description: 'Naya project: Create New → title, cover photo, video, link — sab ek hi form pe. Save dabao.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project name',
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      defaultValue: 'FEATURED PROJECT',
      label: 'Small label',
      admin: {
        description: 'Jaise: FEATURED PROJECT 01',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover photo',
      admin: {
        description: 'Website pe thumbnail. Yahi se upload karo.',
      },
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      label: 'Video (optional)',
      admin: {
        description: 'Video yahi se upload. Agar sirf photo + link hai to video skip kar sakte ho.',
      },
      filterOptions: {
        mimeType: { contains: 'video' },
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Project link (optional)',
      admin: {
        description: 'YouTube, Behance, Instagram, ya koi website. Example: https://...',
      },
    },
    {
      name: 'linkLabel',
      type: 'text',
      label: 'Link button text',
      defaultValue: 'View Project',
      admin: {
        description: 'Sirf tab dikhega jab upar link diya ho.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Order (1 pehle dikhega)',
      admin: {
        description: 'Chhota number pehle. 1, 2, 3...',
      },
    },
  ],
}
