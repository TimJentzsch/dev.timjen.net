export interface ProjectLink {
	label: string;
	href: string;
}

export interface Project {
	name: string;
	description: string;
	/** My role in the project */
	role: string;
	tags: string[];
	links: ProjectLink[];
	/** Screenshot of the project, a placeholder is shown if missing */
	image?: { src: string; alt: string };
}

export const projects: Project[] = [
	{
		name: 'GameFeeder',
		role: 'Co-maintainer',
		description:
			'A notification bot for game updates on Discord and Telegram, covering 40+ games like Dota 2, Counter-Strike and Team Fortress 2.',
		tags: ['TypeScript', 'Docker'],
		links: [{ label: 'Code', href: 'https://github.com/GameFeeder/GameFeeder' }]
	},
	{
		name: 'Color ID',
		role: 'Creator',
		description:
			'A web tool to identify colors, with RGB, HSL and HSV breakdowns, similar named CSS colors and WCAG contrast checks.',
		tags: ['TypeScript', 'Svelte'],
		links: [
			{ label: 'Try it', href: 'https://color-id.timjen.net/' },
			{ label: 'Code', href: 'https://github.com/TimJentzsch/color-id' }
		]
	},
	{
		name: 'Stonefish Engine',
		role: 'Creator',
		description:
			'An amateur chess engine written in Rust, using alpha-beta search with iterative deepening. It plays on Lichess.',
		tags: ['Rust', 'UCI'],
		links: [
			{ label: 'Play it', href: 'https://lichess.org/@/StonefishEngine' },
			{ label: 'Code', href: 'https://github.com/TimJentzsch/stonefish_engine' }
		]
	}
];
