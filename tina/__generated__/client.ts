import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'b148247977ac4a7421ef6dbb769f4cde7b0be0c1', queries,  });
export default client;
  