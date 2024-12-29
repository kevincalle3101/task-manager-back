import { Request, Response } from "express";
import { UpdateTaskService } from "../services/update-task.service";
import { TaskBadFieldException } from "../models/errors/task-bad-field.exception";


export class UpdateTasksController  {
    public constructor (
        private readonly updateTaskService: UpdateTaskService
    ) {}

    public async updateTask(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const {data} = await this.updateTaskService.execute({ id, ...req.body })
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