import { db } from "#/database/client";
import type { Article, Topic } from "#/renderer/types";
import type { PageContextBuiltInServer } from "vike/types";
import Layout from "../layout";
import { article, topic } from "#/database/schema";
import { and, eq } from "drizzle-orm";

export { Page };
export const PrefetchSetting = { mode: "hover" };

function Page({ article, topics }: { article: Article; topics: Array<Topic> }) {
	return (
		<Layout topics={topics}>
			<article className="max-w-3xl w-full flex flex-col gap-4 mx-auto text-justify">
				<header>
					<h1 className="text-3xl">{article.title}</h1>
				</header>
				<div>
					<a
						className="text-sky-500 hover:text-sky-400"
						href={`/${article.topic}`}
					>
						{"< "}回到主題
					</a>
				</div>
				{article.content
					.split("\n")
					.filter((section) => section.length)
					.map((section, index) => (
						<p key={`sec${index}`}>{section}</p>
					))}
			</article>
		</Layout>
	);
}

export async function onBeforeRender(pageContext: PageContextBuiltInServer) {
	const data = await db.transaction(async (tx) => {
		const articleContent = await tx
			.select()
			.from(article)
			.where(
				and(
					eq(article.topic, decodeURI(pageContext.urlOriginal.split("/")[1])),
					eq(article.title, decodeURI(pageContext.urlOriginal.split("/")[2])),
				),
			);
		const topics = await tx.select().from(topic).limit(10);
		return { article: articleContent[0], topics };
	});

	return {
		pageContext: {
			pageProps: {
				article: data.article,
				topics: data.topics,
			},
		},
	};
}
