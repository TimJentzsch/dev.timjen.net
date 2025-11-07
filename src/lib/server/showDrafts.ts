/** @returns `true` if draft posts should be shown to the user, else `false`. */
export function showDrafts(url: URL): boolean {
	return import.meta.env.DEV || url.searchParams.has('showDrafts');
}
