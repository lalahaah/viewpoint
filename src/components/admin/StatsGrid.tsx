import * as React from "react"

interface StatItem {
  label: string
  value: string | number
}

interface StatsGridProps {
  stats: StatItem[]
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border border-black divide-x divide-y md:divide-y-0 divide-black bg-white">
      {stats.map((stat, idx) => (
        <div key={idx} className="p-6 bg-white">
          <p className="uppercase text-xs tracking-wider text-gray-500 mb-1">{stat.label}</p>
          <p className="text-2xl font-black">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
