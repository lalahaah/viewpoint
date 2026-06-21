"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export default function SponsorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const links = [
    { name: "홈", href: "/dashboard/sponsor" },
    { name: "보낸 브리프", href: "/dashboard/sponsor/briefs" },
    { name: "크레딧 / 결제", href: "/dashboard/sponsor/billing" },
    { name: "얼리버드 내역", href: "/dashboard/sponsor/earlybird" },
  ]

  return (
    <div className="max-w-screen-xl mx-auto px-6 bg-white text-black font-sans">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-black flex flex-col md:flex-col flex-shrink-0">
          {/* Sidebar Header */}
          <div className="border-b border-black px-6 py-4 hidden md:block">
            <span className="uppercase text-xs tracking-widest text-gray-400 font-bold">
              SPONSOR
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
        <main className="flex-1 py-6 md:py-8 md:pl-8">
          {children}
        </main>
      </div>
    </div>
  )
}
