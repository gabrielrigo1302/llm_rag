import { conectVectorDB } from './db';
import { model } from './model';
import { modelUsageRoutines, dbManipulationRoutines, infoBaseRoutines } from './functions';
import { configDotenvAdapter } from "./adapters/functions";

configDotenvAdapter();

const main = async () => { 
  const vectorDB = await conectVectorDB();

  try {
    // const stream = await getModelResponseStream("Explique o conceito de cadeias de linguagem (LangChain) em uma frase.");
  
    // process.stdout.write("Resposta em streaming:\n\n");
  
    // for await (const content of stream) {
    //   process.stdout.write(content);
    // }
  

  const documents = await infoBaseRoutines.getDocuments();

  await dbManipulationRoutines.postAllDocumentIfNotExists(documents ?? [], vectorDB);

  await Promise.all([
      "Is JavaScript a object oriented programing language?",
      "Is JavaScript an interpreted language?",
      "Node.js and JavaScript are the same?",
  ].map(async question => {
      // Ask a Question and Get an Answer
      const response = await modelUsageRoutines.getModelResponse(question, vectorDB, model);
      console.log("\n❓ Question: \n", question);
      console.log("\n💡 Final Answer:\n", response);
  }));


  } catch (error) {
    process.stdout.write(error as string)

  } finally {
    vectorDB.close();
  }
}

main();