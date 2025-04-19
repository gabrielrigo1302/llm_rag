import { Neo4jVectorStore } from "@langchain/community/vectorstores/neo4j_vector"
import { Ollama } from "@langchain/ollama";

const getModelResponse = async (question:string, vectorDB: Neo4jVectorStore, model:Ollama) => {
    const dbResult = await vectorDB.similaritySearchWithScore(question, 1);
    const relevantChunks = dbResult?.map(result => result[0]?.pageContent?.replace('text: ', '')).filter(Boolean);

    if (relevantChunks.length === 0) {
        console.log("⚠️ No relevant context found.");
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

    const response = await model.invoke(prompt);

    return response;
}

export const modelUsageRoutines = {
    getModelResponse
}