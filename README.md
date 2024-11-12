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

### Check Node version
Requires Node v20.

### Set up environment variables
- copy `env.example` as `.env` or `.env.local`
- put your `MONGODB_URI="mongodb+srv://<userName>:<password>@cluster0.h2kdfoe.mongodb.net/<dbName>` in there

### Install dependencies & run dev server
- `pnpm i`
- `pnpm run dev`
