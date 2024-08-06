import { Request } from "express";
import { User } from "../models/userModel";

declare module "express"{
    export interface Request{
        user?: User;
    }
}