import * as React from "react"

interface StatusBadgeProps {
  status: string
}

const statusMap: Record<string, string> = {
  PENDING: "심사중",
  APPROVED: "승인",
  REJECTED: "반려",
  SUSPENDED: "정지",
  SENT: "발송",
  VIEWED: "열람",
  ACCEPTED: "수락",
  CANCELLED: "취소",
  COMPLETED: "완료",
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const displayStatus = statusMap[status] || status

  return (
    <span className="inline-block uppercase text-xs tracking-widest px-2 py-0.5 rounded-full border border-black bg-white text-black font-medium">
      {displayStatus}
    </span>
  )
}
