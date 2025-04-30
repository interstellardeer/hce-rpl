'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const router = useRouter()
  const searchParams = useSearchParams()

  const category = searchParams.get('category') || 'all';
  const [eventChecked, setEventChecked] = useState(false)
  const [penelitianChecked, setPenelitianChecked] = useState(false)

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // Set checkbox state based on URL
  useEffect(() => {
    if (category === 'events') {
      setEventChecked(true)
      setPenelitianChecked(false)
    } else if (category === 'research') {
      setEventChecked(false)
      setPenelitianChecked(true)
    } else if (category === 'both') {
      setEventChecked(true)
      setPenelitianChecked(true)
    } else {
      setEventChecked(false)
      setPenelitianChecked(false)
    }
  }, [category])

  useEffect(() => {
    let newCategory = 'all'
    if (eventChecked && penelitianChecked) {
      newCategory = 'both'
    } else if (eventChecked) {
      newCategory = 'events'
    } else if (penelitianChecked) {
      newCategory = 'research'
    }

    if (newCategory !== (category || 'all')) {
      const query = newCategory === 'all' ? '' : `?category=${newCategory}`
      router.push(`/posts${query}`)
    }
  }, [eventChecked, penelitianChecked, category, router])

  return (
    <div className="container mb-8">
      <label className="font-medium text-sm mb-2 block">Filter kategori:</label>
      <div className="flex items-center gap-4">
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={eventChecked}
            onCheckedChange={(val) => setEventChecked(Boolean(val))}
          />
          <span className="text-sm">Event</span>
        </label>
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={penelitianChecked}
            onCheckedChange={(val) => setPenelitianChecked(Boolean(val))}
          />
          <span className="text-sm">Penelitian</span>
        </label>
      </div>
    </div>
  )
}

export default PageClient
