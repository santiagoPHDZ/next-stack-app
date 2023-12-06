
import { appRouter } from '../../../../trpc';
import { createTRPCContext } from '../../../../trpc/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

// Handle TRPC endpoint requests
const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: process.env.TRPC_ENDPOINT!,
        req,
        router: appRouter,
        createContext: () => createTRPCContext({ req }),
        onError: ({ error, path }) => {
            // Recived TRPC error
            console.error(`🛑 tRPC ERROR on '${path}'`, error);
        }
    });

export { handler as GET, handler as POST };