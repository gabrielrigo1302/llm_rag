import { Ollama, OllamaEmbeddings } from "@langchain/ollama"
import { IEmbeddingInterfaceAdapter, INeo4jVectorStoreArgsAdapter, IInitOllama, IInitOllamaEmbeddings } from "../interface"
import { Neo4jVectorStore } from "@langchain/community/vectorstores/neo4j_vector"

const initOllama = (init: IInitOllama) => {
    return new Ollama(init)
}

const initOllamaEmbeddings = (init: IInitOllamaEmbeddings) => {
    return new OllamaEmbeddings(init);
}

const conectGraphVectorDB = (ollamaEmbeddings: IEmbeddingInterfaceAdapter, vectorDBConfig: INeo4jVectorStoreArgsAdapter) => {
    return Neo4jVectorStore.fromExistingGraph(ollamaEmbeddings, vectorDBConfig);
}

export const langchainAdapter = {
    initOllama,
    initOllamaEmbeddings,
    conectGraphVectorDB
}