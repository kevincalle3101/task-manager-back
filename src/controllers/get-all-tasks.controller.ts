import { ITask } from "src/models/constants";
import { TaskBadFieldException } from "../models/errors/task-bad-field.exception";
import { GetAllTaskService } from "../services/get-all-tasks.service";
import { Request, Response } from "express";


export class GetTasksController  {
    public constructor (
        private readonly getAllTasksService: GetAllTaskService 
    ) {}

    public async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const { state } = req.query;
            const stateBool = state === 'true' ? true : state === 'false' ? false : undefined;
            const {data} = await this.getAllTasksService.execute(stateBool)
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