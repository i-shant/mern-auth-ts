import { Request } from "express";

export interface PayloadType {
  userId: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IRequestWithUser extends Request {
  user?: IUser;
}
