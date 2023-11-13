import type { Article } from "#/renderer/types";
import { Link } from "arkhi/client";
import { PageContextBuiltInServer } from "vike/types";

export { Page };
export const PrefetchSetting = { mode: "hover" };

const tempArticle: Article = {
	id: "",
	topic: "",
	created: new Date(),
	edited: new Date(),
	author: "Non tempor nostrud",
	title: "Exercitation eiusmod irure ad nulla quis nisi aliqua",
	content: `Minim irure magna in mollit exercitation non labore eiusmod labore laboris aliqua. Aliqua et proident esse laboris nulla consequat quis non ut excepteur ad veniam elit enim. Est aliqua tempor cillum laborum dolor consectetur enim. Aliqua laboris irure in mollit est deserunt nulla. Cillum non pariatur deserunt incididunt magna excepteur ea.

Lorem cupidatat ullamco nisi adipisicing voluptate non excepteur ad incididunt quis in laboris. Enim deserunt ullamco aliquip aliqua pariatur. In sit Lorem consequat nulla.

Sit commodo ut laboris excepteur et magna velit occaecat sint dolore voluptate. Exercitation amet aute laborum elit ut amet fugiat ea. Culpa eu officia nulla sit do eiusmod commodo cillum laborum reprehenderit Lorem.

Exercitation exercitation deserunt exercitation sit reprehenderit incididunt. Mollit culpa pariatur duis ut irure ex aliqua labore commodo est amet eu aute. Ea nulla ea in dolore anim. Nisi anim reprehenderit consectetur aliquip cupidatat quis fugiat quis.

Officia excepteur qui commodo culpa. Et sint Lorem pariatur consectetur occaecat culpa ex dolor eu culpa. Sit ipsum quis consectetur irure nostrud esse sit quis id incididunt. Voluptate laboris ut sit laboris fugiat do veniam proident deserunt dolor minim. Irure aute aliquip tempor ea elit aliquip sunt do sunt non laboris mollit non minim. Labore officia culpa non dolor Lorem eiusmod qui fugiat incididunt labore consequat reprehenderit nisi sint.

Dolore amet labore ullamco reprehenderit nulla dolor nostrud. Aute consequat ex sunt nostrud laborum pariatur labore dolore eiusmod ea proident nisi officia. Eu ad nisi magna consequat eu irure eiusmod magna sint Lorem eu consequat ad occaecat.

Eu quis minim cillum in ullamco culpa aliqua eiusmod officia voluptate amet in velit. Culpa cillum adipisicing dolor non ut nisi. Voluptate ex mollit nostrud veniam consectetur enim ullamco magna adipisicing minim dolor. Ex tempor velit et ullamco officia labore est velit in ea id veniam consequat.

Proident enim deserunt proident in aute elit qui dolore non esse tempor. Reprehenderit sunt id eiusmod nulla ullamco aliqua enim incididunt. In eiusmod magna ad officia labore commodo commodo cillum sint. Enim ad culpa enim do nulla pariatur nisi esse et. Lorem pariatur labore minim fugiat qui commodo eu duis magna aliqua. Tempor aliquip esse aliquip Lorem magna laborum ex.

Esse laborum ex Lorem sunt sint consectetur. Irure occaecat deserunt reprehenderit duis veniam velit dolore. Incididunt et ipsum dolor labore commodo pariatur aute occaecat laboris. Ea sint qui duis culpa laboris fugiat enim. Consectetur enim ullamco ut nostrud reprehenderit aute. Officia ut in eu commodo ea nulla non ipsum duis sunt quis Lorem. Lorem deserunt veniam pariatur ex officia duis labore do aliquip proident sunt est.

Id proident pariatur eiusmod ipsum. Aute aliqua aliqua commodo amet fugiat deserunt cillum incididunt incididunt eu exercitation anim consequat officia. Nisi mollit ipsum laborum excepteur quis ea commodo ut id ut. Dolor excepteur ad excepteur occaecat cillum laborum minim. Fugiat anim amet minim ipsum. Qui velit in pariatur dolore incididunt deserunt esse. Cupidatat dolor nulla cillum est qui mollit dolor consequat dolor qui excepteur amet officia.`,
};

function Page({ article }: { article: Article }) {
	return (
		<>
			<article className="max-w-3xl flex flex-col gap-4 mx-auto text-justify">
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
					.map((section) => (
						<section>{section}</section>
					))}
			</article>
		</>
	);
}

export async function onBeforeRender(pageContext: PageContextBuiltInServer) {
	const mockData = { ...tempArticle, topic: pageContext.routeParams.topic };
	return {
		pageContext: {
			pageProps: {
				article: mockData,
			},
		},
	};
}
