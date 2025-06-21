export interface MdsvexFile {
	default: import('svelte').Component;
	metadata: Record<string, string>;
}

export type MdsvexResolver = () => Promise<MdsvexFile>;

export interface BlogPost {
	slug: string;
	title: string;
	author: string;
	description: string;
	date: string;
	published: boolean;
}
