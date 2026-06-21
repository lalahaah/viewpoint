import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Prisma, ChannelType } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const type = searchParams.get("type") // ACTIVE or UPCOMING
    const q = searchParams.get("q")
    const pageParam = searchParams.get("page")

    const page = pageParam ? parseInt(pageParam, 10) : 1
    const limit = 12
    const skip = (page - 1) * limit

    const where: Prisma.ChannelWhereInput = {
      status: "APPROVED",
    }

    if (category) {
      where.category = category
    }

    if (type) {
      where.channelType = type as ChannelType
    }

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { tags: { has: q } },
      ]
    }

    const [channels, total] = await Promise.all([
      prisma.channel.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.channel.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        channels,
        total,
        page,
        totalPages,
      },
    })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch channels" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || (session.user.role !== "CREATOR" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const {
      name,
      description,
      youtubeUrl,
      channelType,
      category,
      tags,
      subscriberCount,
      avgViews,
      totalVideos,
      recentMonthViews,
      subscriberGrowth,
      engagementRate,
      uploadFrequency,
      audienceGender,
      audienceAge,
      audienceCountry,
      audienceDevice,
      adPrices,
      sponsorCases,
      mediaKitUrl,
      launchDate,
      fundingGoal,
      earlyBirdDeadline,
    } = body

    const channel = await prisma.channel.create({
      data: {
        creatorId: session.user.id!,
        name,
        description,
        youtubeUrl,
        channelType: channelType || "ACTIVE",
        category,
        tags: tags || [],
        subscriberCount: subscriberCount ? parseInt(subscriberCount, 10) : null,
        avgViews: avgViews ? parseInt(avgViews, 10) : null,
        totalVideos: totalVideos ? parseInt(totalVideos, 10) : null,
        recentMonthViews: recentMonthViews ? parseInt(recentMonthViews, 10) : null,
        subscriberGrowth: subscriberGrowth ? parseInt(subscriberGrowth, 10) : null,
        engagementRate: engagementRate ? parseFloat(engagementRate) : null,
        uploadFrequency,
        audienceGender: audienceGender || null,
        audienceAge: audienceAge || null,
        audienceCountry: audienceCountry || null,
        audienceDevice: audienceDevice || null,
        adPrices: adPrices || null,
        sponsorCases: sponsorCases || null,
        mediaKitUrl,
        launchDate: launchDate ? new Date(launchDate) : null,
        fundingGoal: fundingGoal ? parseInt(fundingGoal, 10) : null,
        earlyBirdDeadline: earlyBirdDeadline ? new Date(earlyBirdDeadline) : null,
        status: "PENDING",
      },
    })

    return NextResponse.json({ success: true, data: { channel } })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create channel" },
      { status: 500 }
    )
  }
}
