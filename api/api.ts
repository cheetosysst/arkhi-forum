import type { AppRouters } from "./index";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

/**
 * Checks current enviroment and returns current base URL.
 * Copied from T3.
 * @returns Base URL
 */
const getBaseUrl = () => {
	if (typeof window !== "undefined") return "";
	// TODO add more edge runtime options.
	if (process ? process.env.VERCEL_URL : import.meta.env.VERCEL_URL)
		return `https://${import.meta.env.VERCEL_URL}`;
	return `http://localhost:${import.meta.env.PORT ?? 3000}`;
};

/**
 * Info: https://trpc.io/docs/client/nextjs/server-side-helpers#2-external-router
 */
export const api = createTRPCProxyClient<AppRouters>({
	transformer: superjson,
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}/trpc`,
			fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: "include",
				});
			},
		}),
	],
});
