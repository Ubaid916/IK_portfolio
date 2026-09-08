import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Website Content',
  admin: {
    group: 'Your Website',
    description: 'Logo, text, services, about, contact — sab yahan se edit hota hai. Save dabao, website update ho jayegi.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Logo & Menu',
          fields: [
            {
              name: 'logoType',
              type: 'radio',
              label: 'Logo kaise dikhe?',
              defaultValue: 'text',
              options: [
                { label: 'Text likho (jaise IKRAM)', value: 'text' },
                { label: 'Logo photo upload karo', value: 'image' },
              ],
              admin: {
                layout: 'horizontal',
                description: 'Ek choose karo. Baad mein change kar sakte ho.',
              },
            },
            {
              name: 'logoText',
              type: 'text',
              label: 'Logo text',
              required: true,
              defaultValue: 'IKRAM',
              admin: {
                condition: (data) => data?.logoType !== 'image',
                description: 'Navbar pe yeh naam dikhega.',
              },
            },
            {
              name: 'logoImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo photo',
              admin: {
                condition: (data) => data?.logoType === 'image',
                description: 'PNG (transparent) best hai. Yahi se upload karo — Media page pe jaane ki zaroorat nahi.',
              },
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              name: 'navCta',
              type: 'text',
              label: 'Top button text',
              required: true,
              defaultValue: "Let's Talk",
            },
            {
              name: 'navCtaLink',
              type: 'text',
              label: 'Top button kahan le jaye?',
              defaultValue: '#contact',
              admin: {
                description:
                  'Examples: #contact  |  mailto:you@email.com  |  https://wa.me/92...  |  https://instagram.com/...',
              },
            },
            {
              name: 'siteTitle',
              type: 'text',
              label: 'Browser tab title',
              required: true,
              defaultValue: 'Ikram Ullah Khan | Video Editor & Motion Designer',
            },
          ],
        },
        {
          label: 'Hero (top)',
          fields: [
            {
              name: 'heroTag',
              type: 'text',
              label: 'Small tag',
              defaultValue: 'Available for freelance projects',
            },
            {
              name: 'heroNameLine1',
              type: 'text',
              label: 'Name line 1',
              defaultValue: 'Ikram Ullah',
            },
            {
              name: 'heroNameLine2',
              type: 'text',
              label: 'Name line 2',
              defaultValue: 'Khan.',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              label: 'Short intro',
              defaultValue:
                'Video Editor & Motion Designer creating cinematic videos, engaging social content, motion graphics and AI-powered visual stories.',
            },
            {
              name: 'heroPrimaryCta',
              type: 'text',
              label: 'Main button text',
              defaultValue: 'View My Work ->',
            },
            {
              name: 'heroPrimaryCtaLink',
              type: 'text',
              label: 'Main button link',
              defaultValue: '#work',
              admin: {
                description: '#work, #contact, mailto:, WhatsApp, ya koi website.',
              },
            },
            {
              name: 'heroSecondaryCta',
              type: 'text',
              label: 'Second button text',
              defaultValue: "Let's Work Together",
            },
            {
              name: 'heroSecondaryCtaLink',
              type: 'text',
              label: 'Second button link',
              defaultValue: '#contact',
            },
            {
              name: 'heroStats',
              type: 'array',
              label: 'Numbers (stats)',
              labels: { singular: 'Stat', plural: 'Stats' },
              fields: [
                { name: 'value', type: 'text', required: true, label: 'Number (e.g. 1.5+)' },
                { name: 'label', type: 'text', required: true, label: 'Text (e.g. Years Experience)' },
              ],
            },
          ],
        },
        {
          label: 'Portfolio headings',
          fields: [
            {
              name: 'workLabel',
              type: 'text',
              defaultValue: 'Selected Work',
            },
            {
              name: 'workTitle',
              type: 'text',
              defaultValue: 'My Portfolio.',
            },
            {
              name: 'workDescription',
              type: 'textarea',
              defaultValue: 'A selection of my latest video projects and short-form content.',
            },
            {
              name: 'reelsLabel',
              type: 'text',
              defaultValue: 'Short Form',
            },
            {
              name: 'reelsTitle',
              type: 'text',
              defaultValue: 'Reels.',
            },
            {
              name: 'reelsDescription',
              type: 'text',
              defaultValue: 'Short-form edits made for social media.',
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'servicesLabel',
              type: 'text',
              defaultValue: 'What I Do',
            },
            {
              name: 'servicesTitle',
              type: 'text',
              defaultValue: 'Creative services.',
            },
            {
              name: 'servicesDescription',
              type: 'textarea',
              defaultValue:
                'From raw footage to polished final videos, I handle the complete visual production process.',
            },
            {
              name: 'services',
              type: 'array',
              label: 'Service cards',
              labels: { singular: 'Service', plural: 'Services' },
              admin: {
                description: 'Add / edit / delete. Har service pe photo aur link laga sakte ho. Sab isi page pe.',
              },
              fields: [
                { name: 'icon', type: 'text', defaultValue: '✦', label: 'Icon (optional, e.g. ✦)' },
                { name: 'title', type: 'text', required: true, label: 'Service name' },
                { name: 'description', type: 'textarea', required: true, label: 'Short description' },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Service photo (optional)',
                  admin: {
                    description: 'Yahi se upload. Alag page nahi.',
                  },
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Link (optional)',
                  admin: {
                    description: 'Click pe kahan jaye? Example: #work  |  https://...  |  mailto:...',
                  },
                },
                {
                  name: 'linkLabel',
                  type: 'text',
                  label: 'Button text',
                  defaultValue: 'View work',
                  admin: {
                    description: 'Sirf tab dikhega jab link diya ho.',
                  },
                },
                {
                  name: 'features',
                  type: 'array',
                  label: 'Bullet points',
                  fields: [{ name: 'item', type: 'text', required: true, label: 'Point' }],
                },
              ],
            },
          ],
        },
        {
          label: 'About',
          fields: [
            {
              name: 'aboutLabel',
              type: 'text',
              defaultValue: 'About Me',
            },
            {
              name: 'aboutTitle',
              type: 'text',
              defaultValue: 'Behind every good video is a good story.',
            },
            {
              name: 'aboutParagraph1',
              type: 'textarea',
              label: 'Paragraph 1',
              defaultValue:
                "I'm Ikram Ullah Khan, a Video Editor and Motion Designer focused on creating engaging, cinematic and modern visual content.",
            },
            {
              name: 'aboutParagraph2',
              type: 'textarea',
              label: 'Paragraph 2',
              defaultValue:
                'I combine editing, motion graphics, sound, typography and AI visuals to transform ideas into content that looks professional and keeps viewers engaged.',
            },
            {
              name: 'aboutCardLabel',
              type: 'text',
              defaultValue: 'VIDEO EDITOR / MOTION DESIGNER',
            },
            {
              name: 'aboutCardText',
              type: 'text',
              defaultValue: 'Turning ideas into visual stories.',
            },
            {
              name: 'aboutList',
              type: 'array',
              label: 'About points',
              fields: [{ name: 'item', type: 'text', required: true, label: 'Point' }],
            },
          ],
        },
        {
          label: 'Tools',
          fields: [
            {
              name: 'toolsLabel',
              type: 'text',
              defaultValue: 'My Toolkit',
            },
            {
              name: 'toolsTitle',
              type: 'text',
              defaultValue: 'Software & Tools',
            },
            {
              name: 'toolsDescription',
              type: 'textarea',
              defaultValue:
                'The creative tools I use to edit, design, animate and produce visual content.',
            },
            {
              name: 'tools',
              type: 'array',
              label: 'Tools list',
              fields: [{ name: 'name', type: 'text', required: true, label: 'Tool name' }],
            },
          ],
        },
        {
          label: 'Process',
          fields: [
            {
              name: 'processLabel',
              type: 'text',
              defaultValue: 'My Process',
            },
            {
              name: 'processTitle',
              type: 'text',
              defaultValue: 'From idea to final cut.',
            },
            {
              name: 'processDescription',
              type: 'textarea',
              defaultValue:
                'A simple creative workflow designed to keep projects organized and visually strong.',
            },
            {
              name: 'processSteps',
              type: 'array',
              label: 'Steps',
              fields: [
                { name: 'number', type: 'text', required: true, label: 'Step number (e.g. 01 / DISCOVER)' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Contact & Footer',
          fields: [
            {
              name: 'contactLabel',
              type: 'text',
              defaultValue: 'Have a Project?',
            },
            {
              name: 'contactTitle',
              type: 'text',
              defaultValue: "Let's create something",
            },
            {
              name: 'contactTitleAccent',
              type: 'text',
              label: 'Colored last line',
              defaultValue: 'great together.',
            },
            {
              name: 'contactDescription',
              type: 'textarea',
              defaultValue: 'Have an idea, project or video that needs a professional touch?',
            },
            {
              name: 'contactEmail',
              type: 'email',
              label: 'Email',
              defaultValue: 'ikram@example.com',
            },
            {
              name: 'contactCta',
              type: 'text',
              label: 'Contact button text',
              defaultValue: 'Start a Conversation ->',
            },
            {
              name: 'contactCtaLink',
              type: 'text',
              label: 'Contact button link',
              defaultValue: 'mailto:ikram@example.com',
              admin: {
                description:
                  'mailto:email  |  WhatsApp link  |  koi URL. Khali chhodo to Contact Email use hogi.',
              },
            },
            {
              name: 'footerText',
              type: 'text',
              defaultValue: '© 2026 Ikram Ullah Khan. All rights reserved.',
            },
            {
              name: 'socials',
              type: 'array',
              label: 'Social links',
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Name (Instagram, YouTube...)' },
                { name: 'url', type: 'text', required: true, label: 'Full link (https://...)' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
