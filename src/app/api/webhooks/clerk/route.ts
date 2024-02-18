
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/prisma'
import { createUser } from '@/server/services/user'

export async function POST(req: Request) {

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    // Get the ID and type
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', body)

    switch (eventType) {
        case "user.created":
            const firstName = evt.data.first_name
            const lastName = evt.data.last_name
            const sessionId = evt.data.id
            const email = evt.data.email_addresses[0].email_address
            const imageUrl = evt.data.image_url
            await createUser(sessionId, firstName, lastName, email, imageUrl)
            break;
        case "user.updated":
            const firstNameu = evt.data.first_name
            const lastNameu = evt.data.last_name
            const sessionIdu = evt.data.id
            await userUpdated(sessionIdu, firstNameu, lastNameu)
            break;
        case "user.deleted":
            break;
        default:
            break
    }

    return new Response('', { status: 200 })
}

async function userUpdated(sessionId: string, firstName: string, lastName: string) {
    await db.user.update({
        where: {
            sessionId
        },
        data: {
            firstName,
            lastName
        }
    })
}