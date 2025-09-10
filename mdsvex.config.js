import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],
  highlight: {
    alias: { rs: 'rust', sh: 'bash' },
  }
});

export default config;
