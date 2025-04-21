import { INeo4jVectorStoreAdapter, IOllamaAdapter } from "../adapters/interface";

const getModelResponse = async (question:string, vectorDB: INeo4jVectorStoreAdapter, model: IOllamaAdapter) => {
    const dbResult = await vectorDB.similaritySearchWithScore(question, 1);
    const relevantChunks = dbResult?.map(result => result[0]?.pageContent?.replace('text: ', '')).filter(Boolean);

    if (relevantChunks.length === 0) {
        return "Sorry, I couldn't find enough information to answer.";
    }

    const context = relevantChunks.join("\n");
    const prompt = `
        Answer the question concisely and naturally based on the following context:
        Don't use information outside of the provided context.

        Context:
        ${context}

        Question: ${question}

        Provide a direct and informative response:

    `;

    return await model.invoke(prompt);
}

export const modelUsageServices = {
    getModelResponse
}