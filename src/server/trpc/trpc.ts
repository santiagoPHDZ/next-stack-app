
import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson'
import { currentUser } from '@clerk/nextjs';
import { ZodError } from 'zod';

// Create context

// https://clerk.com/docs/references/nextjs/trpc
// https://github.com/t3-oss/create-t3-app

// This section defines the "contexts" that are available in the backend API.
// These allow you to access things when processing a request, like the database, the session, etc.
interface CreateContextOptions {
  headers: Headers;
}

// This is the actual context you will use in your router. It will be used to process every request
// that goes through your tRPC endpoint.

export const createTRPCContext = async (opts: CreateContextOptions) => {
  return {
    ...opts
  }
};

// tRPC API initialized

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// This is how you create new routers and sub-routers in your tRPC API.

export const createTRPCRouter = t.router;

// Public procedure
export const publicProcedure = t.procedure;
