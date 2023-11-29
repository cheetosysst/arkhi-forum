import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { db } from "../database/index.js";

/**
 * Add context here (Authentication, database connection, ...).
 * Info: https://trpc.io/docs/server/context
 */
export const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => {
	return {
		req,
		res,
		db,
	};
};

export type TRPCContext = inferAsyncReturnType<typeof createContext>;
