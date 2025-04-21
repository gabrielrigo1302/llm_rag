import { conectVectorDB } from "../db";
import { modelUsageServices } from "../services";
import { model } from "../model";

export const AskContext = async (question: string) => {
    const vectorDB = await conectVectorDB();

    try {
        return await modelUsageServices.getModelResponse(question, vectorDB, model);

    } catch (error) {
        process.stdout.write(error as string)

    } finally {
        vectorDB.close();
    }
}