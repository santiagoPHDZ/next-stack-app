
import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson'
import { currentUser } from '@clerk/nextjs';
import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { getUser } from '../services/user';

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
  const session = await currentUser();

  return {
    session,
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

// check if the user is signed in, otherwise throw a UNAUTHORIZED CODE
const isAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.session?.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  const user = await getUser()

  if (!user || !user.id) throw new TRPCError({ code: "UNAUTHORIZED" })

  return next({
    ctx: {
      session: ctx.session,
      user,
      userId: user.id
    },
  })
})

// Protected (authenticated) procedure
export const protectedProcedure = t.procedure.use(isAuthed);
