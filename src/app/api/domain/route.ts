import { client } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const host = searchParams.get("host")
    if (host) {
      const data = await client.group.findFirst({
        where: {
          domain: host,
        },
        select: {
          domain: true,
          id: true,
        },
      })
      return { status: 200, domain: data }
    }
  } catch (error) {
    return new NextResponse(
      "An error occurred when calling the Domain API of a group:",
    )
  }
}
