import { Link } from "arkhi/client";
import { MessageSquare } from "lucide-react";

export function Card({
	title,
	author,
	time,
	description,
	replies,
	href,
}: {
	title: string;
	author: string;
	time: string;
	description?: string;
	replies?: number;
	href?: string;
}) {
	return (
		<a
			href={href || "#"}
			className="border rounded-smooth p-4 drop-shadow-md hover:drop-shadow-lg bg-white transition-all ease-in-out"
		>
			<h2 className="text-xl font-medium">{title}</h2>
			<p className="text-sm text-gray-500">
				Posted by{" "}
				<span className="hover:text-sky-400 text-sky-500">{author}</span> at{" "}
				{time}
			</p>
			{description ?? <p className="mt-2 line-clamp-2">{description}</p>}
			<div className="mt-2 flex gap-2 text-sm text-gray-500">
				<MessageSquare /> {replies}
			</div>
		</a>
	);
}

export function CardTopic({
	title,
	description,
	href,
}: {
	title: string;
	href?: string;
	description?: string;
}) {
	return (
		<a
			href={href || "#"}
			className="border p-4 rounded-smooth shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out"
		>
			<h2 className="text-xl font-medium capitalize">{title}</h2>
			<p className="mt-2 text-gray-500 line-clamp-2">{description ?? ""}</p>
		</a>
	);
}
