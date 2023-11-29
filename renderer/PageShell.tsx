import React from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import "./PageShell.css";
import { ArkhiProvider } from "arkhi/client";

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
					{children}
				</PageContextProvider>
			</ArkhiProvider>
		</React.StrictMode>
	);
}
