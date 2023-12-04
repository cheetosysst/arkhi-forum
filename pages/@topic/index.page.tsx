import { Card } from "#/components/Card";
import type { Article, Topic } from "#/renderer/types";
import type { PageContextBuiltInServer } from "vike/types";
import { Layout } from "../layout";
import { db } from "#/database/client";
import { article, topic } from "#/database/schema";
import { desc, eq, sql } from "drizzle-orm";

export { Page };
export const PrefetchSetting = { mode: "hover" };

function Page({
	id,
	name,
	description,
	page,
	articles,
	topics,
	pageCount,
}: Props) {
	return (
		<Layout topics={topics}>
			<div className="flex justify-between items-center">
				<h1 className="flex flex-col text-3xl">
					{name}
					<span className="text-lg text-black/80">{description}</span>
				</h1>
				<a
					href={`/${id}/new`}
					className="float-right drop-shadow-sm border-[1px] text-lg p-2 rounded-lg capitalize"
				>
					new
				</a>
			</div>
			<section className="flex flex-col gap-4">
				{!articles.length && (
					<span className="text-center">{"no post here yet (´ ∀ ` *)"}</span>
				)}
				{articles.map((item) => (
					<Card
						key={`${name}${item.id}`}
						title={item.title}
						author={item.author}
						time={item.edited}
						href={`/${id}/${item.title}`}
					/>
				))}
			</section>

			<Pagination totalPages={pageCount} current={page} />
		</Layout>
	);
}
const Pagination = ({
	totalPages,
	current,
}: {
	totalPages: number;
	current: number;
}) => {
	const renderPageNumbers = () => {
		const pageNumbers = [];

		// Calculate the range of page numbers to display
		const startPage = Math.max(1, current - 4);
		const endPage = Math.min(totalPages, current + 5);

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<li key={`paginate${i}`}>
					<a
						className={`p-2 rounded-md border-[1px] drop-shadow-sm hover:bg-sky-50 transition-colors ${
							i === current ? "bg-neutral-300/60" : "bg-neutral-100/60"
						}`}
						href={`?page=${i}`}
					>
						{i}
					</a>
				</li>,
			);
		}
		return pageNumbers;
	};

	return (
		<ul className="flex gap-2 w-full justify-center">{renderPageNumbers()}</ul>
	);
};

type Props = Topic & {
	page: number;
	articles: Array<Omit<Article, "content" | "topic" | "created">>;
	topics: Array<Topic>;
	pageCount: number;
};

export async function onBeforeRender(pageContext: PageContextBuiltInServer) {
	const topicId = pageContext.urlOriginal.split("/")[1].split("?")[0];
	const offset = pageContext.urlParsed.search.page
		? +pageContext.urlParsed.search.page < 0
			? 1
			: +pageContext.urlParsed.search.page
		: 1;

	const data = await db.transaction(async (tx) => {
		const articles = await tx
			.select()
			.from(article)
			.where(eq(article.topic, topicId))
			.orderBy(desc(article.id))
			.limit(10)
			.offset((offset - 1) * 10);
		const topics = await tx.select().from(topic).limit(10);
		const topicMeta = (
			await tx.select().from(topic).where(eq(topic.id, topicId))
		)[0];
		const articleCount = (
			await tx
				.select({ count: sql<number>`cast(count(${article.id}) as int)` })
				.from(article)
				.where(eq(article.topic, topicId))
		)[0].count;
		return {
			articles,
			topics,
			topicMeta,
			pageCount: Math.ceil(articleCount / 10),
		};
	});
	const props: Props = {
		...data.topicMeta,
		page: offset + 1,
		topics: data.topics,
		articles: data.articles,
		pageCount: data.pageCount,
	};
	return {
		pageContext: {
			pageProps: props,
		},
	};
}
