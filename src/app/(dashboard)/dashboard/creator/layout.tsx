"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const links = [
    { name: "홈", href: "/dashboard/creator" },
    { name: "내 채널", href: "/dashboard/creator/channel" },
    { name: "받은 브리프", href: "/dashboard/creator/briefs" },
    { name: "수익/정산", href: "/dashboard/creator/earnings" },
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-black font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-black flex flex-col md:flex-col flex-shrink-0">
        {/* Sidebar Header */}
        <div className="border-b border-black px-6 py-4 hidden md:block">
          <span className="uppercase text-xs tracking-widest text-gray-400 font-bold">
            CREATOR
          </span>
        </div>
        {/* Links */}
        <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex-shrink-0 border-r md:border-r-0 md:border-b border-black px-6 py-4 uppercase text-xs tracking-widest hover:bg-gray-50 transition-colors ${
                  isActive ? "border-l-4 border-black font-black bg-gray-50" : ""
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}
