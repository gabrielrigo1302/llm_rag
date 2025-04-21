import { langchainAdapter, configDotenvAdapter } from "../adapters/functions";

configDotenvAdapter();

export const model = langchainAdapter.initOllama({
  baseUrl: process.env.OLLAMA_BASE_URL ?? '',
  model: process.env.OLLAMA_MODEL ?? '',
  temperature: 0.9,
 });
