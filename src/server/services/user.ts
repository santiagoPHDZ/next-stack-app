import { db } from "@/lib/prisma";
import { User } from "@clerk/nextjs/server";
import { user } from "@prisma/client";

interface UserData {
    user: user | null,
}

export async function getUser(session: User): Promise<UserData> {

    if (!session) {
        console.log("🟨 Need to log in")
        return {
            user: null,
        }
    }

    console.log(session)
    const sessionId: string = session?.id
    const email = session?.emailAddresses[0].emailAddress
    const firstName = session?.firstName ?? ""
    const lastName = session?.lastName ?? ""
    const imageUrl: string = session?.imageUrl

    console.log("🟦 CREDENTIALS: ", sessionId)

    // Get user
    const user = await db.user.findUnique({
        where: {
            sessionId,
        }
    })

    // No user found
    if (!user) {
        return await createUser(sessionId, firstName, lastName, email, imageUrl)
    }

    return {
        user
    }
}

export async function createUser(sessionId: string, firstName: string, lastName: string, email: string, imageUrl: string) {

    try {
        const newUser = await db.user.create({
            data: {
                sessionId,
                email,
                firstName,
                lastName,
            }
        })

        console.log("🟦 New user created: ", newUser)

        return {
            user: newUser
        }
    } catch {
        return {
            user: null
        }
    }
}