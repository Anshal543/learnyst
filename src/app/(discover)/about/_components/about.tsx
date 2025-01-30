import { useGroupInfo } from '@/hooks/groups'
import React from 'react'

type Props = {
    userid:string
    groupid:string
}

const AboutGroup = ({groupid, userid}: Props) => {
    const {group} = useGroupInfo()
  return (
    <div>AboutGroup</div>
  )
}

export default AboutGroup