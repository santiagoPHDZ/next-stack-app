
import { createTRPCRouter, publicProcedure } from "../trpc";

interface Publication {
    title: string
    author: string
    link: string
}

export const mediumRoute = createTRPCRouter({

    // Get posts
    latestPosts: publicProcedure.query(async ({ }) => {

        const userId = '@sapahdz2003'
        const apiKey = '2b47311d97820f9074955db95f986ef28915cf3b91c191db3de108aa63573ec86'

        try {
            const response = await fetch(`https://v1.nocodeapi.com/sapahdz2003/medium/kgIOkQVwFPCGouwE`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch publications');
            }

            const data = await response.json();

            const posts: Publication[] = (data as any[] ?? []).map((post) => {
                return {
                    title: post.title,
                    author: post.author,
                    link: post.link
                }
            })
            return posts
        } catch (error) {
            console.error('Error fetching publications:', error);
        }

    }),
})