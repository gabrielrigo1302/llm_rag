import { Router, Request, Response } from "express";
import { DocumentationContext, AskContext } from "../controller";

export const routes = Router();

routes.post("/documentation", async (request: Request, response: Response) => {
    const {
        files
    } = request.body;
    
    const result = await DocumentationContext(files);

    response.json({
        response: result
    })
})

routes.post("/ask", async (request: Request, response: Response) => {
    const {
        question
    } = request.body;

    if (!question) {
        response.status(404).json({
            response: "o campo question é obrigatório"
        })
    }

    const result =  await AskContext(request?.body?.question)
    
    response.json({
        response: result
    })
})
