import { db } from "#/database/client";
import type { Article, Topic } from "#/renderer/types";
import { Island, Link } from "arkhi/client";
import { PageContextBuiltInServer } from "vike/types";
import { Layout } from "../layout";
import { type FormEventHandler } from "react";
import { api } from "#/api/api";

export { Page };
export const PrefetchSetting = { mode: "hover" };

function Page({ topic, topics }: { topic: string; topics: Array<Topic> }) {
	return (
		<Layout topics={topics}>
			<header className="capitalize text-3xl">new post</header>
			<div>
				<a className="text-sky-500 hover:text-sky-400" href={`/${topic}`}>
					{"< "}回到主題
				</a>
			</div>
			<div className="h-full">
				<FormIsland topic={topic} />
			</div>
		</Layout>
	);
}

declare global {
	interface Window {
		title: HTMLInputElement;
		content: HTMLInputElement;
	}
}

const PostForm = ({ topic, ...props }: { topic: string }) => {
	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const title = window.title as HTMLInputElement;
		const content = window.content as HTMLInputElement;
		api.post.post
			.query({ title: title.value, content: content.value, topic: topic })
			.then((res) => {
				window.location.assign(`/${topic}/${title.value}`);
			})
			.catch((e) => console.error(e));
	};
	return (
		<form {...props} onSubmit={handleSubmit} className="flex flex-col h-full">
			<label htmlFor="title" className="text-black/70">
				Title
			</label>
			<input
				type="text"
				id="title"
				className="border-[1px] drop-shadow focus:border-rose-300 hover:border-rose-400 transition-colors outline-none rounded-lg p-2"
			/>
			<label htmlFor="content" className="text-black/70 mt-4">
				Content
			</label>
			<textarea
				id="content"
				className="border-[1px] drop-shadow focus:border-rose-300 hover:border-rose-400 transition-colors outline-none rounded-lg min-h-[50%] h-1/2 p-2"
			/>
			<input
				type="submit"
				id="submit"
				className="border-[1px] mt-4 drop-shadow bg-gray-300/30 focus:border-rose-300 hover:border-rose-400 transition-colors outline-none rounded-lg p-2 w-fit"
				value={"Submit"}
			/>
		</form>
	);
};
const FormIsland = Island(PostForm);

export async function onBeforeRender(pageContext: PageContextBuiltInServer) {
	return {
		pageContext: {
			pageProps: {
				topic: decodeURI(decodeURI(pageContext.urlOriginal.split("/")[1])),
				topics: await db.query.topic.findMany(),
			},
		},
	};
}
