My personal website — built with React + TypeScript + Vite.

🔗 **Live at [amod981.github.io](https://amod981.github.io/)**

## 📝 Blogs

Blog posts live as Markdown in [`src/content/`](src/content/) so they read cleanly right here on GitHub and render on the site.

### Healthcare AI

- [Teaching a Healthcare Assistant to Say "I Don't Know"](src/content/floai/knowing-when-not-to-answer.md) — *5 min read*
- [Making Retrieval Understand "Where?"](src/content/floai/making-retrieval-understand-where.md) — *5 min read*

### MCP / LLM + Data

- [Giving an LLM a Data Warehouse It Can Actually Query](src/content/mcp/data-warehouse-an-llm-can-query.md) — *6 min read*
- [How to Check an LLM's SQL Before You Run It](src/content/mcp/checking-llm-sql-without-running-it.md) — *5 min read*
- [Putting OAuth in Front of an MCP Server](src/content/mcp/oauth-in-front-of-an-mcp-server.md) — *6 min read*

### Data Engineering

- [From Hand-Deployed Jobs to an Orchestrated Pipeline](src/content/bigdata/orchestrating-a-lakehouse-with-step-functions.md) — *6 min read*
- [The Update Problem in a Data Lake](src/content/bigdata/the-update-problem-in-a-data-lake.md) — *6 min read*
- [Every Source Wants a Different Slice of History](src/content/bigdata/every-source-wants-a-different-slice.md) — *6 min read*
- [In a Warehouse, Physical Layout Is the Performance](src/content/bigdata/physical-layout-is-the-performance.md) — *6 min read*

### Systems Design

- [The Cron Job That Ran Five Times](src/content/systems/the-cron-job-that-ran-five-times.md) — *6 min read*
- [Adding a Second Provider Without the System Noticing](src/content/systems/adding-a-provider-without-the-system-noticing.md) — *5 min read*
- [Knowing What Happened to a Message You Sent](src/content/systems/knowing-what-happened-to-a-message.md) — *6 min read*

---

## About this repo

The source for my personal site — a small React + TypeScript + Vite app. Posts are plain Markdown under [`src/content/`](src/content/); dropping in a new `.md` file adds it to the site automatically.

## Run locally

```bash
npm install
npm run dev     # start the dev server
npm run build   # production build
```
