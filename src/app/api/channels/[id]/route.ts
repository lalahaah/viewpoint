import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Prisma } from "@prisma/client"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if channel exists and get details
    const channel = await prisma.channel.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!channel) {
      return NextResponse.json({ success: false, error: "Channel not found" }, { status: 404 })
    }

    // Increment viewCount
    const updatedChannel = await prisma.channel.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: { channel: updatedChannel } })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch channel" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const channel = await prisma.channel.findUnique({
      where: { id },
    })

    if (!channel) {
      return NextResponse.json({ success: false, error: "Channel not found" }, { status: 404 })
    }

    // Check ownership
    if (channel.creatorId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()

    // Handle parsed inputs safely like dates and numbers
    const updateData: Record<string, unknown> = {}

    const fields = [
      "name",
      "description",
      "youtubeUrl",
      "channelType",
      "category",
      "tags",
      "subscriberCount",
      "avgViews",
      "totalVideos",
      "recentMonthViews",
      "subscriberGrowth",
      "engagementRate",
      "uploadFrequency",
      "audienceGender",
      "audienceAge",
      "audienceCountry",
      "audienceDevice",
      "adPrices",
      "sponsorCases",
      "mediaKitUrl",
      "fundingGoal",
    ]

    fields.forEach((field) => {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    })

    if (body.subscriberCount !== undefined)
      updateData.subscriberCount = body.subscriberCount ? parseInt(body.subscriberCount, 10) : null
    if (body.avgViews !== undefined)
      updateData.avgViews = body.avgViews ? parseInt(body.avgViews, 10) : null
    if (body.totalVideos !== undefined)
      updateData.totalVideos = body.totalVideos ? parseInt(body.totalVideos, 10) : null
    if (body.recentMonthViews !== undefined)
      updateData.recentMonthViews = body.recentMonthViews
        ? parseInt(body.recentMonthViews, 10)
        : null
    if (body.subscriberGrowth !== undefined)
      updateData.subscriberGrowth = body.subscriberGrowth
        ? parseInt(body.subscriberGrowth, 10)
        : null
    if (body.engagementRate !== undefined)
      updateData.engagementRate = body.engagementRate ? parseFloat(body.engagementRate) : null
    if (body.fundingGoal !== undefined)
      updateData.fundingGoal = body.fundingGoal ? parseInt(body.fundingGoal, 10) : null
    if (body.launchDate !== undefined)
      updateData.launchDate = body.launchDate ? new Date(body.launchDate) : null
    if (body.earlyBirdDeadline !== undefined)
      updateData.earlyBirdDeadline = body.earlyBirdDeadline
        ? new Date(body.earlyBirdDeadline)
        : null

    if (body.status !== undefined && session.user.role === "ADMIN") {
      updateData.status = body.status
    }

    const updatedChannel = await prisma.channel.update({
      where: { id },
      data: updateData as Prisma.ChannelUpdateInput,
    })

    return NextResponse.json({ success: true, data: { channel: updatedChannel } })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update channel" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const channel = await prisma.channel.findUnique({
      where: { id },
    })

    if (!channel) {
      return NextResponse.json({ success: false, error: "Channel not found" }, { status: 404 })
    }

    // Check ownership or admin role
    if (channel.creatorId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
    }

    await prisma.channel.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: "Channel deleted successfully" })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete channel" },
      { status: 500 }
    )
  }
}
