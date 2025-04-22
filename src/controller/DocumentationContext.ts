import { conectVectorDB } from "../db";
import { infoBaseServices, dbManipulationServices } from "../services";

export const DocumentationContext = async (files: string[]) => {
    const vectorDB = await conectVectorDB();

    try {
        const documents = await infoBaseServices.getAllDocuments([
            "javascript.txt",
            "javascript2.txt",
            "javascript3.txt",
            "javascript4.txt",
        ]);

        if (documents && documents?.length > 0) {
            await dbManipulationServices.postAllDocumentIfNotExists(documents ?? [], vectorDB);
        }


    } catch (error) {
        process.stdout.write(error as string)

    } finally {
        vectorDB.close();
    }
}