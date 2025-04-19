import { Neo4jVectorStore, SearchType } from "@langchain/community/vectorstores/neo4j_vector";
import { OllamaEmbeddings } from "@langchain/ollama";
import { INeo4jVectorStoreArgsAdapter } from "../interfaces";
import * as dotenv from "dotenv";

dotenv.config();
const searchType: SearchType = "vector"

const vectorDBConfig:INeo4jVectorStoreArgsAdapter = {
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

// process.env.NEO4J_PORT ?? "",

const ollamaEmbeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: process.env.OLLAMA_BASE_URL
})

export const conectVectorDB = () => Neo4jVectorStore.fromExistingGraph(ollamaEmbeddings, vectorDBConfig);