import { Document } from "mongoose";

export interface ITask extends Document {
    title: string;
    description?: string;
    state: boolean;
  }