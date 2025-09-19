import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { AppRouter } from './router.ts';

const url: URL = new URL('http://localhost:1984/api/rpc');

const client = createTRPCProxyClient<AppRouter>({
  links: [loggerLink(), httpBatchLink({ url })],
});

export { client };