import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],
  highlight: {
    alias: { rs: 'rust', js: 'javascript', ts: 'typescript' },
  }
});

export default config;
