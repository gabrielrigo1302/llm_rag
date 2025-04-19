import { Neo4jVectorStore } from "@langchain/community/vectorstores/neo4j_vector";
import { Document } from "@langchain/core/documents";

const getDocument = async(document: Document, vectorDB: Neo4jVectorStore) => {
    return await vectorDB.similaritySearch(document.pageContent, 2);
}

const postDocumentIfNotExists = async(document: Document, vectorDB: Neo4jVectorStore) => {
    const response = await getDocument(document, vectorDB);

    if (response.length === 0) {
        await vectorDB.addDocuments([document]);
    }
}

const postAllDocumentIfNotExists = async (documents: Document[], vectorDB: Neo4jVectorStore) => {
    try {
        for (const document of documents) {
            await postDocumentIfNotExists(document, vectorDB);
        }
    } catch (error) {
        console.log('Post all documents error: ', error);
    }
}

export const dbManipulationRoutines = {
    getDocument,
    postDocumentIfNotExists,
    postAllDocumentIfNotExists
}