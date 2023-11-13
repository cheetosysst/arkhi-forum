export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };

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
export type Topic = {
	name: string;
	url: string;
};

export type Article = {
	id: string;
	topic: string;
	title: string;
	content: string;
	created: Date;
	edited: Date;
	author: string;
};
