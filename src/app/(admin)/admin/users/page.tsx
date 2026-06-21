"use client"

import React, { useState } from "react"
import { adminDashboardMock } from "@/lib/mockData"

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { users } = adminDashboardMock

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const roleMap: Record<string, string> = {
    CREATOR: "크리에이터",
    SPONSOR: "광고주",
    ADMIN: "관리자"
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">회원 관리</h1>
        <p className="text-gray-500 text-sm">플랫폼에 가입된 크리에이터, 광고주, 관리자 회원 정보를 통합 검색하고 모니터링합니다.</p>
      </div>

      {/* Search Input */}
      <div className="max-w-md bg-white">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="이름 또는 이메일 검색"
          className="w-full rounded-none border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Users Table */}
      <div className="border border-black overflow-x-auto bg-white">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-black text-white text-xs uppercase tracking-widest font-black border-b border-black">
            <tr>
              <th className="px-6 py-4">이름</th>
              <th className="px-6 py-4">이메일</th>
              <th className="px-6 py-4">역할</th>
              <th className="px-6 py-4">가입일</th>
              <th className="px-6 py-4 text-center">등록 채널</th>
              <th className="px-6 py-4 text-center">브리프 건수</th>
              <th className="px-6 py-4 text-center">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black text-sm">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  검색 결과에 해당하는 회원이 없습니다.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-0.5 border border-black ${
                      user.role === "ADMIN" ? "bg-red-50 text-red-900 border-red-500" :
                      user.role === "SPONSOR" ? "bg-blue-50 text-blue-900 border-blue-500" :
                      "bg-gray-50 text-gray-900"
                    }`}>
                      {roleMap[user.role] || user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.joinedAt}</td>
                  <td className="px-6 py-4 text-center">{user.role === "CREATOR" ? user.channelCount : "–"}</td>
                  <td className="px-6 py-4 text-center">{user.role !== "ADMIN" ? user.briefCount : "–"}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-bold ${
                      user.status === "ACTIVE" ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"
                    }`}>
                      {user.status === "ACTIVE" ? "정상" : "정지"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
