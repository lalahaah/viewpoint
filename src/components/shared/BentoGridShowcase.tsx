"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 10 } },
}

interface BentoGridShowcaseProps {
  integration: React.ReactNode
  trackers: React.ReactNode
  statistic: React.ReactNode
  focus: React.ReactNode
  productivity: React.ReactNode
  shortcuts: React.ReactNode
  className?: string
}

export const BentoGridShowcase = ({ integration, trackers, statistic, focus, productivity, shortcuts, className }: BentoGridShowcaseProps) => {
  return (
    <motion.section variants={containerVariants} initial="hidden" animate="visible"
      className={cn("grid w-full grid-cols-1 md:grid-cols-3 md:grid-rows-3 auto-rows-[minmax(180px,auto)] border border-black", className)}>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-3 border-b md:border-b-0 md:border-r border-black p-6">{integration}</motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 border-b md:border-r border-black p-6">{trackers}</motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 border-b border-black p-6">{statistic}</motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 border-b md:border-r border-black p-6">{focus}</motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 border-b border-black p-6">{productivity}</motion.div>
      <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 border-t border-black p-6 bg-black text-white">{shortcuts}</motion.div>
    </motion.section>
  )
}
