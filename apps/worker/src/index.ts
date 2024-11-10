/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import mongoose from "mongoose";
import { updateRankingsForStaticSources } from "./scrappers/staticSources";

interface Env {
  MONGODB_URI: string;
}
export default {
  async scheduled(request, env, ctx) {
    try {
      console.log("web-scrapper: START");

      await mongoose.connect(env.MONGODB_URI);

      await updateRankingsForStaticSources();

      await mongoose.disconnect();

      console.log("web-scrapper: DONE");
    } catch (error) {
      console.log("web-scrapper: ERROR", error);
    }
  },
} satisfies ExportedHandler<Env>;
