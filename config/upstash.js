
import { Client as WordflowClient } from "@upstash/workflow";

import { QSTASH_TOKEN, QSTASH_URL } from "./env.js";

export const workflowClient = new WordflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});

