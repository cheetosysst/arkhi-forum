import { z } from "zod";
import {
	publicProcedure,
	createTRPCRouter,
	protectedProcedure,
} from "./trpc.js";
import { article } from "../database/schema.js";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";

/**
 * Example router
 * Try calling this router in frontend using `api.hello.hello.useQuery()`.
 */
export const postRouter = createTRPCRouter({
	post: protectedProcedure
		.input(
			z.object({
				title: z.string().min(1),
				content: z.string().min(1),
				topic: z.string().min(1),
			}),
		)
		.query(async ({ ctx: { db, req }, input }) => {
			const token = req.cookies["jwt"] as string;

			const user = jwt.verify(
				token,
				process ? process.env.JWT_SECRET! : import.meta.env.JWT_SECRET!,
			);
			if (typeof user === "string") {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message:
						"something weird happend, please clear your cookies and try again",
				});
			}

			await db.insert(article).values({
				...input,
				author: user.sub ?? "",
			});

			return {
				sucess: true,
				message: "post submitted",
				code: 200,
			};
		}),
});
