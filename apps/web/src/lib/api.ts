import { type AppRouter } from '@ui-guideline/api';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

const apiUrl = import.meta.env.VITE_API_URL;

export const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV !== 'production' || (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: apiUrl,
    }),
  ],
});

export { type RouterInputs, type RouterOutputs } from '@ui-guideline/api';
export * from '@ui-guideline/api/src/common';
export * from '@ui-guideline/db/common';

// This entrypoint is only used for local development (Express server).
// In production (Vercel), the API is served via /api/trpc/[trpc].ts as serverless functions
