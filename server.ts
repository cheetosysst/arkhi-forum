import { injectMiddleware, startServer } from "arkhi/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouters } from "./api/index.js";
import { createContext } from "./api/context.js";
import cookieparser from "cookie-parser";
import cors from "cors";

injectMiddleware(cookieparser());
injectMiddleware(cors());

injectMiddleware(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouters,
		createContext,
	}),
);

startServer();
