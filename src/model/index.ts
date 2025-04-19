import { IterableReadableStream } from "@langchain/core/dist/utils/stream";
import { Ollama } from "@langchain/ollama";
import * as dotenv from "dotenv";

dotenv.config();

export const model:Ollama = new Ollama({
  baseUrl: process.env.OLLAMA_BASE_URL,
  model: process.env.OLLAMA_MODEL,
  temperature: 0.9,
 });

export const getModelResponseStream = async (message: string): Promise<IterableReadableStream<string>> => {
  return await model.stream([message]);
}