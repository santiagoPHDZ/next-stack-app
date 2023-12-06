
import { userRouter } from './routers/user';
import { createTRPCRouter } from './trpc';

// This is where we'll define our tRPC routers. 
export const appRouter = createTRPCRouter({
    user: userRouter,
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;