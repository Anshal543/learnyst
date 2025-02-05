import { onAuthenticatedUser } from "@/actions/auth"
import { onGetChannelInfo } from "@/actions/channels"
import { onGetGroupInfo } from "@/actions/groups"
import { LeaderBoardCard } from "@/app/group/_components/leaderboard"
import { currentUser } from "@clerk/nextjs/server"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import React from "react"
import CreateNewPost from "./_components/create-post"
import Menu from "../../_components/group-navbar"

type Props = {
  params: Promise<{ channelid: string; groupid: string }>
}

// TODO: complete grouple channel page

const GroupChannelPage = async ({ params }: Props) => {
  const client = new QueryClient()
  const user = await currentUser()
  const authUser = await onAuthenticatedUser()
  const { channelid, groupid } = await params

  await client.prefetchQuery({
    queryKey: ["channel-info"],
    queryFn: () => onGetChannelInfo(channelid),
  })

  await client.prefetchQuery({
    queryKey: ["about-group-info"],
    queryFn: () => onGetGroupInfo(groupid),
  })

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="grid lg:grid-cols-4 grid-cols-1 w-full flex-1 h-0 gap-x-5 px-5 s">
        <div className="col-span-1 lg:inline relative hidden py-5">
          <LeaderBoardCard light />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-y-5 py-5">
          <Menu orientation="desktop" />
          <CreateNewPost
            userImage={user?.imageUrl!}
            channelid={channelid}
            username={user?.firstName!}
          />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default GroupChannelPage
