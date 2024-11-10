/// <reference types="@sveltejs/kit" />

// declare namespace App {
//   interface PrivateEnv {
//     MONGODB_URI: string;
//   }
// }

declare module "$env/static/private" {
  export const MONGODB_URI: string;
}
