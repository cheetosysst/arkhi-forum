import { Card } from "#/components/Card";
import type { Article, Topic } from "#/renderer/types";
import type { PageContextBuiltInServer } from "vike/types";
import { Layout } from "../layout";
import { db } from "#/database/client";

export { Page };
export const PrefetchSetting = { mode: "hover" };

function Page({ name, page, articles, topics }: Props) {
	return (
		<Layout topics={topics}>
			<h1 className="text-3xl">{name}</h1>
			<section className="flex flex-col gap-4">
				{articles.map((item) => (
					<Card
						key={`${name}${item.id}`}
						title={item.title}
						author={item.author}
						time={item.edited.toISOString()}
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
	const props: Props = {
		id: pageContext.routeParams.topic,
		name: pageContext.routeParams.topic,
		description: "",
		page: +pageContext.urlParsed.search.page,
		topics: await db.query.topic.findMany(),
		articles: [
			{
				id: "laborumnon",
				title: "Ex sint mollit sint in",
				edited: new Date(),
				author: "dsaasda",
			},
			{
				id: "dolornostrud",
				title: "Ex sint mollit sint in",
				edited: new Date(),
				author: "dsaasda",
			},
			{
				id: "autefugiat",
				title: "Ex sint mollit sint in",
				edited: new Date(),
				author: "dsaasda",
			},
			{
				id: "incididunt",
				title: "Ex sint mollit sint in",
				edited: new Date(),
				author: "dsaasda",
			},
			{
				id: "incididunt",
				title: "Ex sint mollit sint in",
				edited: new Date(),
				author: "dsaasda",
			},
			{
				id: "incididunt",
				title: "Ex sint mollit sint in",
				edited: new Date(),
				author: "dsaasda",
			},
			{
				id: "incididunt",
				title: "Ex sint mollit sint in",
				edited: new Date(),
				author: "dsaasda",
			},
			{
				id: "incididunt",
				title: "Ex sint mollit sint in",
				edited: new Date(),
				author: "dsaasda",
			},
			{
				id: "incididunt",
				title: "Ex sint mollit sint in",
				edited: new Date(),
				author: "dsaasda",
			},
			{
				id: "incididunt",
				title: "Ex sint mollit sint in",
				edited: new Date(),
				author: "dsaasda",
			},
		],
	};
	return {
		pageContext: {
			pageProps: props,
		},
	};
}
