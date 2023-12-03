import { Card } from "#/components/Card";
import type { Article, Topic } from "#/renderer/types";
import type { PageContextBuiltInServer } from "vike/types";
import { Layout } from "../layout";
import { db } from "#/database/client";
import { article, topic } from "#/database/schema";

export { Page };
export const PrefetchSetting = { mode: "hover" };

function Page({ name, page, articles, topics }: Props) {
	return (
		<Layout topics={topics}>
			<h1 className="text-3xl">
				{name}

				<a
					href={`/${name}/new`}
					className="float-right drop-shadow-sm border-[1px] text-lg p-2 rounded-lg"
				>
					new
				</a>
			</h1>
			<section className="flex flex-col gap-4">
				{articles.map((item) => (
					<Card
						key={`${name}${item.id}`}
						title={item.title}
						author={item.author}
						time={item.edited}
						href={`/${name}/${item.title}`}
					/>
				))}
			</section>
			<div>page: {page}</div>
		</Layout>
	);
}

type Props = Topic & {
	page: number;
	articles: Array<Omit<Article, "content" | "topic" | "created">>;
	topics: Array<Topic>;
};

export async function onBeforeRender(pageContext: PageContextBuiltInServer) {
	const data = await db.transaction(async (tx) => {
		const articles = await tx
			.select()
			.from(article)
			.orderBy(article.id)
			.limit(10)
			.offset(0);
		const topics = await tx.select().from(topic).limit(10);
		return { articles, topics };
	});
	const props: Props = {
		id: pageContext.routeParams.topic,
		name: pageContext.routeParams.topic,
		description: "",
		page: +pageContext.urlParsed.search.page,
		topics: data.topics,
		articles: data.articles,
	};
	return {
		pageContext: {
			pageProps: props,
		},
	};
}
