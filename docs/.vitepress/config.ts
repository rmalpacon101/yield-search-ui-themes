import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SearchPro documentation",
  description: "Yield SearchPro",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        items: [
          { text: "Home", link: "/" },
          { text: "Getting Started", link: "/getting-started" },
          { text: "Manage Collections", link: "/manage-collections" },
          {
            text: "Search Configuration",
            link: "/search",
            items: [
              { text: "Browse", link: "/browse" },
              { text: "Display Fields", link: "/display-fields" },
              {
                text: "Filtering and Faceting",
                link: "/filtering-and-faceting",
              },
              { text: "Sort Display", link: "/sort-display" },
              { text: "Pagination", link: "/pagination" },
              { text: "Highlighting", link: "/highlighting" },
            ],
          },
          {
            text: "Relevance Configuration",
            link: "/relevance",
            items: [
              { text: "Global Filters", link: "/global-filters" },
              { text: "Sort Ranking", link: "/sort-ranking" },
              { text: "Searchable Fields", link: "/searchable-fields" },
              { text: "Synonyms", link: "/synonyms" },
            ],
          },
          { text: "Auto Suggestions", link: "/auto-suggestion" },
          { text: "Rules", link: "/rules" },
        ],
      },
      {
        text: "API Documentation",
        items: [
          { text: "Markdown Extension", link: "/markdown-examples" },
          { text: "Runtime API", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
