import { z } from "zod";
import {
	publicProcedure,
	createTRPCRouter,
	protectedProcedure,
} from "./trpc.js";
import { eq } from "drizzle-orm";
import { user } from "../database/schema.js";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";

/**
 * Example router
 * Try calling this router in frontend using `api.hello.hello.useQuery()`.
 */
export const authRouter = createTRPCRouter({
	register: publicProcedure
		.input(
			z.object({
				username: z.string().min(1).max(64),
				password: z.string().min(1).max(64),
				email: z.string().email().min(3),
			}),
		)
		.query(async ({ input, ctx }) => {
			const existingUser = await ctx.db.query.user.findFirst({
				where: eq(user.username, input.username),
			});

			if (existingUser !== undefined) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "user not found",
				});
			}

			const createUser = await ctx.db.insert(user).values(input);

			return {
				sucess: true,
				message: "new user registered",
				code: 200,
			};
		}),

	login: publicProcedure
		.input(
			z.object({
				username: z.string().or(z.undefined()),
				email: z.string().or(z.undefined()),
				password: z.string(),
			}),
		)
		.query(async ({ input, ctx }) => {
			if (!(input.username || input.email)) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Bad Credentials",
				});
			}
			const userRecord = input.username
				? await ctx.db.query.user.findFirst({
						where: eq(user.username, input.username),
				  })
				: await ctx.db.query.user.findFirst({
						where: eq(user.username, input.email!),
				  });
			if (!userRecord) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "User not found",
				});
			}

			if (userRecord.password !== input.password) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Wrong password",
				});
			}

			const time = new Date();
			const token = jwt.sign(
				{
					sub: userRecord.username,
					iat: time.getTime(),
					exp: time.getTime() + 2592000, // 30 days
					role: userRecord.role,
				},
				process ? process.env.JWT_SECRET! : import.meta.env.JWT_SECRET!,
			);

			ctx.res.cookie("jwt", token);

			return {
				message: "Login Successfull",
			};
		}),

	logout: protectedProcedure.query(({ ctx }) => {
		ctx.res.cookie("jwt", "");
		return {
			message: "bye!",
		};
	}),
});
