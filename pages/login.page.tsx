import { api } from "#/api/api";
import { hash } from "#/utils/hash";
import { Head, Island } from "arkhi/client";
import { FormEventHandler } from "react";
import { Layout } from "./layout";
import type { PageContextBuiltInServer } from "vike/types";
import { db } from "#/database/client";
import type { Topic } from "#/renderer/types";

export { Page };
export const PrefetchSetting = { mode: "hover" };

function Page({ topics }: { topics: Array<Topic> }) {
	return (
		<Layout topics={topics}>
			<Head>
				<title>Login - Arkhi</title>
			</Head>
			<div className="border mx-auto max-w-screen-lg rounded-smooth p-10 drop-shadow-md hover:drop-shadow-lg bg-white transition-all ease-in-out">
				<h2 className="text-xl font-medium">Login</h2>
				<LoginIsland />
			</div>
		</Layout>
	);
}

declare global {
	interface Window {
		username: HTMLInputElement;
		password: HTMLInputElement;
	}
}

const LoginIsland = Island(LoginForm);

function LoginForm({ ...props }) {
	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const username = window.username as HTMLInputElement;
		const password = window.password as HTMLInputElement;

		if (!(username.value && password.value)) {
			// TODO invalidate
			console.error("missing data");
			return;
		}

		api.auth.login
			.query({
				username: username.value,
				password: await hash(password.value),
			})
			.then((response) => {
				// window.clientRouter.go("/");
				// @ts-ignore
				window.location = "/";
			})
			.catch((error) => {
				console.error("error on registering", error);
				return;
			});
	};
	return (
		<form onSubmit={handleSubmit} className="flex flex-col" {...props}>
			<label htmlFor="username" className="capitalize text-neutral-700 w-full">
				username
			</label>
			<input
				type="text"
				name="username"
				id="username"
				className="border-2 p-2 rounded-smooth border-neutral-500 mb-4"
			/>
			<label htmlFor="password" className="capitalize text-neutral-700 w-full">
				password
			</label>
			<input
				type="password"
				name="password"
				id="password"
				className="border-2 p-2 rounded-smooth border-neutral-500 mb-4"
			/>
			<input
				type="submit"
				value="submit"
				className="rounded-[1.1rem/1rem] drop-shadow-md capitalize cursor-pointer bg-sky-500 text-white w-fit self-end p-2"
			/>
		</form>
	);
}

export async function onBeforeRender(pageContext: PageContextBuiltInServer) {
	const props = {
		topics: (await db.query.topic.findMany()) as Array<Topic>,
	};
	return {
		pageContext: {
			pageProps: props,
		},
	};
}
