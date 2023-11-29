import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "./trpc.js";

/**
 * Example router
 * Try calling this router in frontend using `api.hello.hello.useQuery()`.
 */
export const topicRouter = createTRPCRouter({
	getAllTopics: publicProcedure.query(async ({ ctx }) => {
		const topics = await ctx.db.query.topic.findMany();
		return {
			topics,
		};
	}),
});
