import { Head } from "arkhi/client";
import { CardTopic } from "#/components/Card";
import type { Topic } from "#/renderer/types";

export { Page };
export const PrefetchSetting = { mode: "hover" };

const tempTopics: Array<Topic> = [
	{
		name: "Programming",
		url: "/programming",
	},
	{
		name: "Memes",
		url: "/memes",
	},
	{
		name: "Music",
		url: "/music",
	},
	{
		name: "anime",
		url: "/anime",
	},
];

function Page() {
	return (
		<>
			<Head>
				<title>Index Page - Arkhi</title>
			</Head>
			{tempTopics.map((item) => (
				<CardTopic title={item.name} href={item.url} />
			))}
		</>
	);
}
