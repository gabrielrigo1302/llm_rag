import { conectVectorDB } from "../db";
import { infoBaseServices, dbManipulationServices } from "../services";

export const DocumentationContext = async () => {
    const vectorDB = await conectVectorDB();

    try {
        const documents = await infoBaseServices.getDocuments();

        await dbManipulationServices.postAllDocumentIfNotExists(documents ?? [], vectorDB);

    } catch (error) {
        process.stdout.write(error as string)

    } finally {
        vectorDB.close();
    }
}