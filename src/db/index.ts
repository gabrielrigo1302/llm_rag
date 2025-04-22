import { configDotenvAdapter, langchainAdapter } from "../adapters/functions";
import { INeo4jVectorStoreArgsAdapter } from "../adapters/interface";
import { TSearchType } from "../adapters/type";

configDotenvAdapter();

const searchType: TSearchType = "vector"

const vectorDBConfig: INeo4jVectorStoreArgsAdapter = {
    url: process.env.NEO4J_URI ?? '',
    username: process.env.NEO4J_USER ?? '',
    password: process.env.NEO4J_PASSWORD ?? '',
    textNodeProperties: ["text"],
    indexName: "javascript_index",
    keywordIndexName: "javascript_keywords",
    searchType,
    nodeLabel: "Chunk",
    textNodeProperty: "text",
    embeddingNodeProperty: "embedding",
}

const ollamaEmbeddings = langchainAdapter.initOllamaEmbeddings({
    model: process.env.OLLAMA_EMBEDDING_MODEL ?? "",
    baseUrl: process.env.OLLAMA_BASE_URL ?? ""
})

export const conectVectorDB = () => langchainAdapter.conectGraphVectorDB(ollamaEmbeddings, vectorDBConfig);