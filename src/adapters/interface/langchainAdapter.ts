import { EmbeddingsInterface } from "@langchain/core/embeddings";
import { TSearchType, TIndexType } from "../type";
import { Document } from "@langchain/core/documents";
import { Neo4jVectorStore } from "@langchain/community/vectorstores/neo4j_vector";
import { Ollama } from "@langchain/ollama";

export interface IInitOllama {
    baseUrl: string;
    model: string;
    temperature: number;
}

export interface IInitOllamaEmbeddings {
    model: string;
    baseUrl: string;
}

export interface INeo4jVectorStoreArgsAdapter {
    url: string;
    username: string;
    password: string;
    database?: string;
    preDeleteCollection?: boolean;
    textNodeProperty?: string;
    textNodeProperties?: string[];
    embeddingNodeProperty?: string;
    keywordIndexName?: string;
    indexName?: string;
    searchType?: TSearchType;
    indexType?: TIndexType;
    retrievalQuery?: string;
    nodeLabel?: string;
    createIdIndex?: boolean;
}

export interface IEmbeddingInterfaceAdapter extends EmbeddingsInterface {};

export interface IDocumentAdapter extends Document {};

export interface INeo4jVectorStoreAdapter extends Neo4jVectorStore {};

export interface IOllamaAdapter extends Ollama {};