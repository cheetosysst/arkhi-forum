import React, { PropsWithChildren } from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext, Topic } from "./types";
import "./PageShell.css";
import { ArkhiProvider } from "arkhi/client";
import { LogOut, Menu, User } from "lucide-react";

export { PageShell };

function PageShell({
	children,
	pageContext,
}: {
	children: React.ReactNode;
	pageContext: PageContext;
}) {
	return (
		<React.StrictMode>
			<ArkhiProvider>
				<PageContextProvider pageContext={pageContext}>
					<Layout>{children}</Layout>
				</PageContextProvider>
			</ArkhiProvider>
		</React.StrictMode>
	);
}

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

function Layout({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-row w-full">
			<input
				type="checkbox"
				className="hidden peer/sidebar"
				defaultChecked
				id="sidebar"
			/>
			<aside className="w-56 hidden peer-checked/sidebar:flex justify-between flex-col max-h-[100dvh] p-6 space-y-4 bg-ingigo-800/50 border-neutral-100 border-r-2">
				<nav className="flex flex-col gap-2">
					<h2 className="text-3xl font-bold p-2 uppercase bg-gradient-to-r from-red-500 to-pink-400 hover:from-violet-500 hover:to-sky-400 hover:drop-shadow-xl transition-all drop-shadow-lg bg-clip-text text-transparent ">
						<a href="/">amare</a>
					</h2>
					{tempTopics.map((item) => (
						<a
							className="flex gap-2 items-center capitalize text-lg p-2 font-medium hover:bg-gray-100 rounded"
							href={item.url}
						>
							{item.name}
						</a>
					))}
				</nav>
				<nav className="flex flex-col">
					<a
						className="flex gap-2 items-center text-lg p-2 font-medium hover:bg-gray-100 rounded"
						href="#"
					>
						<User />
						Profile
					</a>
					<a
						className="flex gap-2 items-center text-lg p-2 font-medium hover:bg-gray-100 rounded"
						href="#"
					>
						<LogOut />
						Logout
					</a>
				</nav>
			</aside>

			<div className="flex-grow flex flex-col h-[100dvh]">
				<nav className="flex h-16 px-4 border-b-2 border-neutral-100">
					<label
						htmlFor="sidebar"
						className="transition-colors text-neutral-800/50 items-center flex justify-center cursor-pointer"
					>
						<Menu />
					</label>
				</nav>
				<main className="flex flex-grow gap-6 overflow-y-scroll p-8 w-full flex-col">
					{children}
				</main>
			</div>
		</div>
	);
}
