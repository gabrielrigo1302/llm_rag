import { readFile } from "node:fs/promises";
import { IDocumentAdapter } from "../adapters/interface";

const getDocuments = async (): Promise<IDocumentAdapter[] | undefined> => {
    try {
        return (await readFile('../llm_rag/src/data/javascript.txt', "utf8"))?.toString()?.split('.')?.map(sentence => {
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

export const infoBaseRoutines = {
    getDocuments
}