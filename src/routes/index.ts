import { Router, Request, Response } from "express";
import { DocumentationContext, AskContext } from "../controller";

export const routes = Router();

routes.post("/documentation", (request: Request, response: Response) => {
  DocumentationContext();

  response.json({
    response: "sucesso ao atualizar documentação"
  })
})

routes.post("/ask", async (request: Request, response: Response) => {
  const result =  await AskContext(request?.body?.question)
  
  response.json({
    response: result
  })
})
