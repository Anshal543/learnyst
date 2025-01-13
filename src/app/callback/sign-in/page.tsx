import { onSignInUser } from "@/actions/auth"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

const CompleteSigIn = async () => {
    const user = await currentUser()
    if (!user) return redirect("/sign-in")

    const authenticated = await onSignInUser(user.id)

    if (authenticated.status === 200) return redirect(`/group/create`)

    if (authenticated.status === 207)
        return redirect(
            `/group/${authenticated.groupId}/channel/${authenticated.channelId}`,
        )

    if (authenticated.status !== 200) {
        redirect("/sign-in")
    }
}

export default CompleteSigIn
