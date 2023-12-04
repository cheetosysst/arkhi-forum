import { db } from "#/database/client";
import { api } from "#/api/api";
import { hash } from "#/utils/hash";
import { Head, Island } from "arkhi/client";
import Layout from "./layout";
import { useState } from "react";
import type { Topic } from "#/renderer/types";
import type { FormEventHandler } from "react";
import type { PageContextBuiltInServer } from "vike/types";

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
		email: HTMLInputElement;
		password: HTMLInputElement;
		passwordconfirm: HTMLInputElement;
	}
}

export function LoginForm({ ...props }) {
	const [errorMessage, setErrorMessage] = useState<string>("");

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const username = window.username as HTMLInputElement;
		const email = window.email as HTMLInputElement;
		const password = window.password as HTMLInputElement;
		const passwordconfirm = window.passwordconfirm as HTMLInputElement;
		if (
			!(
				username.value &&
				email.value &&
				password.value &&
				passwordconfirm.value
			)
		) {
			// TODO invalidate
			console.error("missing data");
			return;
		}

		if (password.value !== passwordconfirm.value) {
			// TODO password doesn't match
			console.error("password doesn't match");
			return;
		}

		api.auth.register
			.query({
				username: username.value,
				password: await hash(password.value),
				email: email.value,
			})
			.then((response) => {
				window.clientRouter.go("/login");
			})
			.catch((error) => {
				console.error("error on registering", error);
				return;
			});
	};
	return (
		<form
			onSubmit={handleSubmit}
			method="POST"
			className="flex flex-col"
			{...props}
		>
			<label htmlFor="username" className="capitalize text-neutral-700 w-full">
				username
			</label>
			<input
				type="text"
				name="username"
				id="username"
				className="border-2 rounded-[0.9rem/0.7rem] border-neutral-500 mb-4 p-2"
			/>
			<label htmlFor="email" className="capitalize text-neutral-700 w-full">
				email
			</label>
			<input
				type="text"
				name="email"
				id="email"
				className="border-2 rounded-[0.9rem/0.7rem] border-neutral-500 mb-4 p-2"
			/>
			<label htmlFor="password" className="capitalize text-neutral-700 w-full">
				password
			</label>
			<input
				type="password"
				name="password"
				id="password"
				className="border-2 rounded-[0.9rem/0.7rem] border-neutral-500 mb-4 p-2"
			/>
			<label
				htmlFor="passwordconfirm"
				className="capitalize text-neutral-700 w-full"
			>
				confirm password
			</label>
			<input
				type="password"
				name="passwordconfirm"
				id="passwordconfirm"
				className="border-2 rounded-[0.9rem/0.7rem] border-neutral-500 mb-4 p-2"
			/>

			{errorMessage ?? (
				<span className="border-2 rounded-[0.9rem/0.7rem] border-pink-600 mb-4 p-2">
					{errorMessage}
				</span>
			)}

			<input
				type="submit"
				value="submit"
				className="rounded-[1.1rem/1rem] drop-shadow-md capitalize cursor-pointer bg-sky-500 text-white w-fit self-end p-2"
			/>
		</form>
	);
}
export const LoginIsland = Island(LoginForm);

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
