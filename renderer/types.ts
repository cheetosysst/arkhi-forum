export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };

import { article, comment, topic } from "#/database/schema";
import type {
	PageContextBuiltInServer,
	PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
} from "vike/types";

type Page = (pageProps: PageProps) => React.ReactElement;
type PageProps = {};

export type PageContextCustom = {
	Page: Page;
	pageProps?: PageProps;
	urlPathname: string;
	exports: {
		documentProps?: {};
		PrefetchSetting?: {
			mode?: string;
		};
	};
};

type PageContextServer = PageContextBuiltInServer<Page> & PageContextCustom;
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom;

type PageContext = PageContextClient | PageContextServer;

// ==== Custom types ====
export type Topic = typeof topic.$inferSelect;

export type Article = typeof article.$inferSelect;

export type Comment = typeof comment.$inferSelect;
