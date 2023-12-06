
import { appRouter } from '../../../../trpc';
import { createTRPCContext } from '../../../../trpc/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

// Handle TRPC endpoint requests
const handler = (req: NextRequest) => {
    
}

export { handler as GET, handler as POST };