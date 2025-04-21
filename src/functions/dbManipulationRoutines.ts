import { IDocumentAdapter, INeo4jVectorStoreAdapter } from "../adapters/interface";


const getDocument = async(document: IDocumentAdapter, vectorDB: INeo4jVectorStoreAdapter) => {
    return await vectorDB.similaritySearch(document.pageContent, 2);
}

const postDocumentIfNotExists = async(document: IDocumentAdapter, vectorDB: INeo4jVectorStoreAdapter) => {
    const response = await getDocument(document, vectorDB);

    if (response.length === 0) {
        await vectorDB.addDocuments([document]);
    }
}

const postAllDocumentIfNotExists = async (documents: IDocumentAdapter[], vectorDB: INeo4jVectorStoreAdapter) => {
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