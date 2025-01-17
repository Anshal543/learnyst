"use client"
import { useGroupChatOnline } from "@/hooks/groups"
import { useSideBar } from "@/hooks/navigation"
import { cn } from "@/lib/utils"
import React from "react"
import { DropDown } from "../drop-down"
import { CarotSort } from "@/icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Group } from "lucide-react"
import Image from "next/image"

type Props = {
    groupid: string
    userid: string
    mobile?: boolean
}

export interface IGroupInfo {
    status: number
    group:
        | {
              id: string
              name: string
              category: string
              thumbnail: string | null
              description: string | null
              gallery: string[]
              jsonDescription: string | null
              htmlDescription: string | null
              privacy: boolean
              active: boolean
              createdAt: Date
              userId: string
              icon: string
          }
        | undefined
}

export interface IChannels {
    id: string
    name: string
    icon: string
    createdAt: Date
    groupId: string | null
}

export interface IGroups {
    status: number
    groups:
        | {
              icon: string | null
              id: string
              name: string
          }[]
        | undefined
}

const SideBar = ({ groupid, userid, mobile }: Props) => {
    const { groupInfo, groups, mutate, variables, isPending, channels } =
        useSideBar(groupid)
    useGroupChatOnline(userid)
    let href = ""
    if(channels?.channels?.[0].id) {
        // console.log(channels?.channels?.[0].id)
        href = `/group/${groupid}/channel/${channels?.channels?.[0].id}`
    }
    return (
        <div
            className={cn(
                "h-screen flex-col gap-y-10 sm:px-5",
                !mobile
                    ? "hidden bg-black md:w-[300px] fixed md:flex"
                    : "w-full flex",
            )}
        >
            {groups.groups && groups.groups.length > 0 && (
                <DropDown
                    title="Groups"
                    trigger={
                        <div className="w-full flex items-center justify-between text-themeTextGray md:border-[1px] border-themeGray p-3 rounded-xl">
                            <div className="flex gap-x-3 items-center">
                                <img
                                    src={`https://ucarecdn.com/${groupInfo.group?.icon as string}/`}
                                    alt="icon"
                                    // width={20}
                                    // height={20}
                                    className="w-10 rounded-lg"
                                />
                                <p className="text-sm">
                                    {groupInfo.group?.name}
                                </p>
                            </div>
                            <span className="">
                                <CarotSort />
                            </span>
                        </div>
                    }
                >
                    {groups &&
                        groups.groups.length > 0 &&
                        groups.groups.map((item) => (
                            <Link
                                key={item.id}
                                // href={`/group/${item.id}/channel/${channels?.channels?.[0].id!}`}
                                href={href}
                            >
                                <Button
                                    variant="ghost"
                                    className="flex gap-2 w-full justify-start hover:bg-themeGray items-center"
                                >
                                    <Group />
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                </DropDown>
            )}
        </div>
    )
}

export default SideBar
