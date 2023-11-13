/** @type {import('tailwindcss').Config} */
export default {
	content: ["./**/*.{html,js,jsx,ts,tsx}", "./index.html"],
	theme: {
		extend: {
			borderRadius: {
				smooth: "1.5rem/1.25rem",
			},
		},
	},
	plugins: ["prettier-plugin-tailwindcss"],
};
