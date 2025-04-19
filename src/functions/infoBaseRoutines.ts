import { readFile } from "node:fs/promises";
import { Document } from "@langchain/core/documents";

const getDocuments = async (): Promise<Document[] | undefined> => {
    try {
        return (await readFile('../llm_rag/src/data/javascript.txt', "utf8"))?.toString()?.split('.')?.map(sentence => {
            const document:Document = {
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