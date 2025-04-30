'use client'

import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export const Logo = (props: Props) => {
  const { className, loading = 'lazy', priority = false } = props

  return (
    <>
      {/* Light Mode */}
      <Image
        alt="Logo Light"
        width={193}
        height={34}
        loading={loading}
        priority={priority}
        className={clsx('block [data-theme="dark"]:hidden max-w-[9.375rem] w-full h-[34px]', className)}
        src="/logo-long-white.svg"
      />
      {/* Dark Mode */}
      <Image
        alt="Logo Dark"
        width={193}
        height={34}
        loading={loading}
        priority={priority}
        className={clsx('hidden [data-theme="dark"]:block max-w-[9.375rem] w-full h-[34px]', className)}
        src="/logo-long-black.svg"
      />
    </>
  )
}
