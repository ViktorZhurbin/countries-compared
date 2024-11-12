## Objectives

- Learn some Svelte
- Try various data visualisation libraries
- Try some web-scrapping techniques

## Results

- A minimalistic app that allowed to learn most basic and some advanced concepts of Svelte.
- A nice interactive map visualising country ratings through color coding, built with [echarts](https://github.com/apache/echarts).
  - Tried D3.js, but it looked ugly and DX wasn't good either.
- A set of web-scrappers to query static html pages.
  - HTML parsed with [cheerio](https://github.com/cheeriojs/cheerio)
  - Data persisted in MongoDB Atlas with [mongoose](https://github.com/Automattic/mongoose)

## To run the app locally

Tested with Node v20 and v22.

You'd need to copy `env.example`, rename it to `.env`, and put your `MONGODB_URI="mongodb+srv://<userName>:<password>@cluster0.h2kdfoe.mongodb.net/<dbName>` in there.

From the project root:

- `pnpm i`
- `pnpm run dev` to start dev server
