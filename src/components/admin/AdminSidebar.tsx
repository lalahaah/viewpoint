"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminSidebar() {
  const pathname = usePathname()

  const links = [
    { name: "대시보드", href: "/admin" },
    { name: "채널 심사", href: "/admin/channels" },
    { name: "회원 관리", href: "/admin/users" },
    { name: "브리프 모니터링", href: "/admin/briefs" },
    { name: "정산 관리", href: "/admin/settlements" },
  ]

  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-black flex flex-col md:flex-col flex-shrink-0 bg-white text-black font-sans">
      {/* Sidebar Header */}
      <div className="border-b border-black px-6 py-4 hidden md:block">
        <span className="uppercase text-xs tracking-widest text-gray-400 font-bold">
          ADMIN
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
  )
}
