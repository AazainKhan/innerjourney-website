import { createClient } from "tinacms/dist/client";
import { queries } from "./types";

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const apiUrl =
  isLocal || !clientId
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/2.2/content/${clientId}/github/${branch}`

export const client = createClient({
  url: apiUrl,
  token: process.env.TINA_TOKEN || '',
  queries,
});
export default client;
