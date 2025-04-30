import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import {
  GoogleScholarButtonLink,
  LinkedInButtonLink,
  CMSLink
} from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 flex flex-col gap-4">
        {/* Atas: Logo dan navigasi seperti semula */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>

          <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
            <ThemeSelector />
            <nav className="flex flex-col md:flex-row gap-4 md:items-center justify-center">
              {navItems.map(({ link }, i) => (
                <CMSLink className="text-white" key={i} {...link} />
              ))}
              <LinkedInButtonLink />
              <GoogleScholarButtonLink />
            </nav>
          </div>
        </div>

        {/* Copyright: selalu di bawah */}
        <div className="pt-4 border-t border-border">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Human Centered Engineering RPL UPI. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
