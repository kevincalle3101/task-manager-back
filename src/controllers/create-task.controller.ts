import { Request, Response } from "express";
import { CreateTaskService } from "../services/create-task.service";
import { TaskBadFieldException } from "../models/errors/task-bad-field.exception";
import { ITask } from "src/models/constants";


export class CreateTasksController  {
    public constructor (
        private readonly createTaskService: CreateTaskService
    ) {}

    public async createTask(req: Request, res: Response): Promise<void> {
        try {
            const {data} = await this.createTaskService.execute(req.body)
            res.status(200).json({ data });
        } catch (error) {
            if(error instanceof Error || error instanceof TaskBadFieldException) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error', error: error?.message });
            }
        }
    }
}