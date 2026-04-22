import React from 'react'

const PageBackground = ({ eager = false }) => {
  return (
    <>
      <picture className="pointer-events-none fixed inset-0 z-0 block">
        <source srcSet="/hero-bg.avif" type="image/avif" />
        <source srcSet="/hero-bg.webp" type="image/webp" />
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-100 dark:opacity-[0.60]"
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
        />
      </picture>

      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#F2F0E9]/20 to-[#F2F0E9]/85 dark:via-gray-900/40 dark:to-gray-900/90" />
    </>
  )
}

export default PageBackground
