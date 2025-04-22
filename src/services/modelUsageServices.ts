import { INeo4jVectorStoreAdapter, IOllamaAdapter } from "../adapters/interface";

const getModelResponse = async (question:string, vectorDB: INeo4jVectorStoreAdapter, model: IOllamaAdapter) => {
    const dbResult = await vectorDB.similaritySearchWithScore(question, 1);
    const relevantChunks = dbResult?.map(result => result[0]?.pageContent?.replace('text: ', '')).filter(Boolean);

    if (relevantChunks.length === 0) {
        return "Sorry, I couldn't find enough information to answer.";
    }

    const context = relevantChunks.join("\n");
    const prompt = `
        Response de forma concisa e natural baseada no seguinte contexto:
        Não use informação de fora do contexto providenciado.

        Contexto:
        ${context}

        Pergunta: ${question}

        Informe uma resposta direta e informativa:
    `;

    return await model.invoke(prompt);
}

export const modelUsageServices = {
    getModelResponse
}