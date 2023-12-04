import { api } from "#/api/api";
import type { Topic } from "#/renderer/types";
import { Island } from "arkhi/client";
import { LogIn, LogOut, Menu, User, UserPlus } from "lucide-react";
import type { MouseEventHandler, PropsWithChildren } from "react";

export default function Layout({
	children,
	topics,
}: PropsWithChildren & { topics: Array<Topic> }) {
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
					{topics.map((item) => (
						<a
							className="flex gap-2 items-center capitalize text-lg p-2 font-medium hover:bg-gray-100 rounded"
							key={`topic${item.id}`}
							href={`/${item.id}`}
						>
							{item.name}
						</a>
					))}
				</nav>
				<nav className="flex flex-col">
					<UserIsland />
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

export function Logout({ ...props }) {
	const handler: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		api.auth.logout
			.query()
			.then(() => {
				window.location.assign("/");
			})
			.catch((e: Error) => {
				console.error(e);
			});
	};
	return (
		<button
			className="flex gap-2 items-center text-lg p-2 font-medium hover:bg-gray-100 rounded"
			onClick={handler}
			{...props}
		>
			<LogOut />
			Logout
		</button>
	);
}

export function Info({ ...props }) {
	const jwt =
		typeof document !== "undefined"
			? document.cookie.split(";").reduce((prev, curr, index) => {
					const data = curr.split("=");
					if (data.length !== 2) return prev;
					if (data.at(0) !== "jwt") return prev;
					if (data.at(1)?.length) return true;
					return prev;
			  }, false)
			: undefined;

	return (
		<div {...props}>
			{jwt ? (
				<>
					<Logout />
					<a
						className="flex gap-2 items-center text-lg p-2 font-medium hover:bg-gray-100 rounded"
						href="#"
					>
						<User />
						Profile
					</a>
				</>
			) : (
				<>
					<a
						className="flex gap-2 items-center text-lg p-2 font-medium hover:bg-gray-100 rounded"
						href="/login"
					>
						<LogIn />
						login
					</a>
					<a
						className="flex gap-2 items-center text-lg p-2 font-medium hover:bg-gray-100 rounded"
						href="/register"
					>
						<UserPlus />
						register
					</a>
				</>
			)}
		</div>
	);
}

export const UserIsland = Island(Info);
