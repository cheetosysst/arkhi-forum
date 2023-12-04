import { Head } from "arkhi/client";
import { CardTopic } from "#/components/Card";
import type { Topic } from "#/renderer/types";
import type { PageContextBuiltInServer } from "vike/types";
import { db } from "#/database/client";
import Layout from "../layout";

export { Page };
export const PrefetchSetting = { mode: "hover" };

function Page({ topics }: { topics: Array<Topic> }) {
	return (
		<Layout topics={topics}>
			<Head>
				<title>Index Page - Arkhi</title>
			</Head>
			{topics.map((item) => (
				<CardTopic
					title={item.name}
					key={item.id}
					description={item.description}
					href={`/${item.id}`}
				/>
			))}
		</Layout>
	);
}

export async function onBeforeRender(pageContext: PageContextBuiltInServer) {
	const props = {
		topics: (await db.query.topic.findMany()) as Array<Topic>,
	};
	return {
		pageContext: {
			pageProps: props,
		},
	};
}
