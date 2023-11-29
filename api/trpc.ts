import { TRPCError, initTRPC } from "@trpc/server";
import { TRPCContext } from "./context.js";
import superjson from "superjson";
import jwt from "jsonwebtoken";

const t = initTRPC.context<TRPCContext>().create({
	transformer: superjson,
});

/**
 * You can add authentication-required procedures here.
 * Info: https://trpc.io/docs/server/metadata#example-with-per-route-authentication-settings
 */
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const checkAuth = t.middleware((opt) => {
	const { ctx } = opt;
	const token = ctx.req.cookies["jwt"] as string;

	const user = jwt.verify(
		token,
		process ? process.env.JWT_SECRET! : import.meta.env.JWT_SECRET!,
	);
	if (typeof user === "string") {
		// Note: I'm not quite sure how this works so I guess all strings goes here.
		ctx.res.cookie("jwt", "");
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Illegal jwt payload",
		});
	}
	return opt.next({
		ctx: {
			user: user,
		},
	});
});
export const protectedProcedure = t.procedure.use(checkAuth);
