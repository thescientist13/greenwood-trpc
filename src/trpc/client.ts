import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { AppRouter } from './router.ts';

// TODO: would be great to get this from Greenwood
// https://github.com/ProjectEvergreen/greenwood/discussions/1530
const url: URL = new URL(`${window.location.origin}/api/rpc`);

const client = createTRPCProxyClient<AppRouter>({
  links: [loggerLink(), httpBatchLink({ url })],
});

export { client };