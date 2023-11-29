import { renderIslands, ClientRouter } from "arkhi/client";

window.clientRouter ||= new ClientRouter(render, { mode: "visible" });
export const clientRouter = window.clientRouter;
function render() {
	clientRouter.beforeRender();
	renderIslands(document.body);
}

export { render };
