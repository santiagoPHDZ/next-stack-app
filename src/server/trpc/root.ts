
import { mediumRoute } from './routers/medium';
import { createTRPCRouter } from './trpc';

// - Client API definition

// This is where we'll define our tRPC routers. 
export const appRouter = createTRPCRouter({
    medium: mediumRoute
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;