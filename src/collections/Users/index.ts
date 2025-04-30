/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload, type CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import configPromise from '@payload-config'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'googleScholarUrl'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'googleScholarUrl',
      label: 'Google Scholar URL',
      type: 'text',
      admin: {
        placeholder: 'https://scholar.google.com/citations?user=...',
      },
      validate: (val: any) => {
        const pattern = /^https:\/\/scholar\.google\.com\/citations\?user=.+$/;
        if (val && !pattern.test(val)) {
          return 'Masukkan URL Google Scholar yang valid';
        }
        return true;
      },
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        position: 'sidebar',
      },
    }
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.profileImage) {
          const payload = await getPayload({ config: configPromise })
          const defaultImage = await payload.find({
            collection: 'media',
            where: {
              isDefaultProfileImage: { equals: true },
            },
            limit: 1,
            sort: '-createdAt',
          })

          if (defaultImage.docs[0]) {
            data.profileImage = defaultImage.docs[0].id
          }
        }

        return data
      },
    ],
  },
  timestamps: true,
}
