import { Request, Response } from "express";
import SendForgoutPasswordEmailService from "../services/SendForgoutPasswordEmailService";

export default class ForgoutPasswordController {
  public async create(request: Request, response: Response) : Promise<Response> {
    const { email } = request.body;
    const sendForgoutPasswordEmail = new SendForgoutPasswordEmailService();
    await sendForgoutPasswordEmail.execute({email});
    return response.status(204).json();
  }
}
