import { readFile } from "node:fs/promises";
import { IDocumentAdapter } from "../adapters/interface";
import { configDotenvAdapter } from "../adapters/functions";

configDotenvAdapter();

const getDocument = async (file: string): Promise<IDocumentAdapter[] | undefined> => {
    try {
        return (await readFile(`${process.env.DOCUMENTS_PATH}/${file}`, "utf8"))?.toString()?.split('.')?.map(sentence => {
            const document:IDocumentAdapter = {
                pageContent: sentence.trim(),
                metadata: {}
            }
            return document;
        }).filter(doc => doc.pageContent.length > 10);
    } catch (error) {
        console.log("Erro ao acessar documento: ", error);
    }
}

const getAllDocuments = async (files: string[]): Promise<IDocumentAdapter[][] | undefined> => {
    try {
        const documents: IDocumentAdapter[][] = []

        for (const file of files) {
            const document = await getDocument(file);

            if (document) {
                documents.push(document);
            }
        }

        return documents;
    } catch (error) {
        console.log("Erro ao acessar documento: ", error);
    }
}

export const infoBaseServices = {
    getDocument,
    getAllDocuments
}