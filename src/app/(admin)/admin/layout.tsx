import React from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-xl mx-auto px-6 bg-white text-black font-sans min-h-screen flex flex-col">
      {/* Admin Top Header */}
      <header className="h-16 flex items-center justify-between border-b border-black">
        <span className="uppercase text-sm tracking-widest font-black text-black">
          VIEWPOINT ADMIN
        </span>
      </header>

      {/* Main Content Layout with Sidebar */}
      <div className="flex flex-col md:flex-row flex-grow">
        <AdminSidebar />
        <main className="flex-1 py-6 md:py-8 md:pl-8">
          {children}
        </main>
      </div>
    </div>
  )
}
