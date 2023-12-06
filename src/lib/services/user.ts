import { currentUser } from "@clerk/nextjs";
import { user } from "@prisma/client";
import { db } from "../prisma";

export async function getUser(): Promise<user | null> {

    const session = await currentUser()

    if (!session) {
        console.log("🟨 Need to log in")
        return null
    }

    const sub: string = session?.id
    const email = session?.emailAddresses[0].emailAddress
    const firstName = session?.firstName
    const lastName = session?.lastName
    const imageUrl: string = session?.imageUrl

    if (!email || !firstName || !lastName) {
        console.log("🟨 Missing fields")
        return null
    }

    console.log("🟦 CREDENTIALS: ", sub, email, firstName)

    const user = await db.user.findFirst({
        where: {
            authId: sub,
        }
    })

    if (!user) {
        const newUser = await db.user.create({
            data: {
                authId: sub,
                emailAddress: email,
                firstName,
                lastName,
                imageUrl
            },
        })

        console.log("🟦 New user created: ", newUser)

        return newUser
    }

    return user
}