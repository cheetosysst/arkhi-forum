import { createTRPCRouter } from "./trpc.js";
import { authRouter } from "./auth.js";
import { topicRouter } from "./topic.js";
import { postRouter } from "./post.js";

/**
 * Default router entry point.
 * Info: https://trpc.io/docs/server/routers#defining-a-router
 */
export const appRouters = createTRPCRouter({
	auth: authRouter,
	topic: topicRouter,
	post: postRouter,
});

export type AppRouters = typeof appRouters;
