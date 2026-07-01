# amod981.github.io

My personal website — built with React + TypeScript + Vite.

## 📝 Blogs

Blog posts live as Markdown in [`src/content/`](src/content/) so they read cleanly right here on GitHub and render on the site.

### Healthcare AI

- [Teaching a Healthcare Assistant to Say "I Don't Know"](src/content/floai/knowing-when-not-to-answer.md) — *2026-06-24 · 5 min read*
- [Making Retrieval Understand "Where?"](src/content/floai/making-retrieval-understand-where.md) — *2026-06-17 · 5 min read*

### MCP / LLM + Data

- [Giving an LLM a Data Warehouse It Can Actually Query](src/content/mcp/data-warehouse-an-llm-can-query.md) — *2026-06-30 · 6 min read*
- [How to Check an LLM's SQL Before You Run It](src/content/mcp/checking-llm-sql-without-running-it.md) — *2026-06-30 · 5 min read*
- [Putting OAuth in Front of an MCP Server](src/content/mcp/oauth-in-front-of-an-mcp-server.md) — *2026-07-01 · 6 min read*

### Data Engineering

- [From Hand-Deployed Jobs to an Orchestrated Pipeline](src/content/bigdata/orchestrating-a-lakehouse-with-step-functions.md) — *2026-06-26 · 6 min read*
- [The Update Problem in a Data Lake](src/content/bigdata/the-update-problem-in-a-data-lake.md) — *2026-06-22 · 6 min read*
- [In a Warehouse, Physical Layout Is the Performance](src/content/bigdata/physical-layout-is-the-performance.md) — *2026-06-18 · 6 min read*

### Systems Design

- [The Cron Job That Ran Five Times](src/content/systems/the-cron-job-that-ran-five-times.md) — *2026-06-28 · 6 min read*
- [Adding a Second Provider Without the System Noticing](src/content/systems/adding-a-provider-without-the-system-noticing.md) — *2026-06-20 · 5 min read*
- [Knowing What Happened to a Message You Sent](src/content/systems/knowing-what-happened-to-a-message.md) — *2026-06-14 · 6 min read*

---

## Tooling notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
