import { SearchType, IndexType } from "@langchain/community/vectorstores/neo4j_vector";

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
    searchType?: SearchType;
    indexType?: IndexType;
    retrievalQuery?: string;
    nodeLabel?: string;
    createIdIndex?: boolean;
}
