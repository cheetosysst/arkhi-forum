import { Card } from "#/components/Card";
import type { Article, Topic } from "#/renderer/types";
import { PageContextBuiltInServer } from "vike/types";

export { Page };
export const PrefetchSetting = { mode: "hover" };

function Page({ name, page, url, articles }: Props) {
	return (
		<>
			<h1 className="text-3xl">{name}</h1>
			<section className="flex flex-col gap-4">
				{articles.map((item) => (
					<Card
						title={item.title}
						author={item.author}
						time={item.edited.toISOString()}
						href={`/${name}/${item.title}`}
					/>
				))}
			</section>
			<div>page: {page}</div>
		</>
	);
}

type Props = Topic & {
	page: number;
	articles: Array<Omit<Article, "content" | "topic" | "created">>;
};

export async function onBeforeRender(pageContext: PageContextBuiltInServer) {
	const props: Props = {
		name: pageContext.routeParams.topic,
		url: `/${pageContext.routeParams.topic}`,
		page: Number(pageContext.urlParsed.search.page),
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
