import { IDocumentAdapter, INeo4jVectorStoreAdapter } from "../adapters/interface";

const getDocument = async(document: IDocumentAdapter, vectorDB: INeo4jVectorStoreAdapter) => {
    return await vectorDB.similaritySearchWithScore(document.pageContent, 1);
}

const postDocumentIfNotExists = async(document: IDocumentAdapter, vectorDB: INeo4jVectorStoreAdapter) => {
    const response = await getDocument(document, vectorDB);
    const similarityScore = response.at(0)?.at(1);

    if (typeof similarityScore === 'number' && similarityScore > 0.9) {
        console.log("Muito similar");
    } else {
        await vectorDB.addDocuments([document]);
    }
}

const postAllDocumentIfNotExists = async (documents: IDocumentAdapter[][], vectorDB: INeo4jVectorStoreAdapter) => {
    try {
        for (const document of documents) {
            for (const chunk of document) {
                await postDocumentIfNotExists(chunk, vectorDB);
            }
        }
    } catch (error) {
        console.log('Post all documents error: ', error);
    }
}

export const dbManipulationServices = {
    getDocument,
    postDocumentIfNotExists,
    postAllDocumentIfNotExists
}