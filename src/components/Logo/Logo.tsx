'use client'

import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export const LogoIcon = () =>{
  return (
    <Image
      alt="Logo"
      width={64}
      height={64}
      loading="lazy"
      className="w-full h-full max-w-[3.5rem] max-h-[3.5rem]"
      src="/favicon.svg"
    />
  )
}

export const LoginLogo = () => {
  return (
    <Image
      alt="Logo"
      width={193}
      height={34}
      loading="lazy"
      className="block max-w-[9.375rem] w-full h-[34px]"
      src="/logo-long-white.svg"
    />
  )
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
        className={clsx(
          'block [data-theme="dark"]:hidden max-w-[9.375rem] w-full h-[34px]',
          className,
        )}
        src="/logo-long-white.svg"
      />
      {/* Dark Mode */}
      <Image
        alt="Logo Dark"
        width={193}
        height={34}
        loading={loading}
        priority={priority}
        className={clsx(
          'hidden [data-theme="dark"]:block max-w-[9.375rem] w-full h-[34px]',
          className,
        )}
        src="/logo-long-black.svg"
      />
    </>
  )
}