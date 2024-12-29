import { TaskBadFieldException } from "../models/errors/task-bad-field.exception";
import { DeleteTaskService } from "../services/delete-task.service";
import { Request, Response } from "express";


export class DeleteTasksController {
    public constructor(
        private readonly deleteAllTasksService: DeleteTaskService
    ) { }

    public async deleteTasks(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.deleteAllTasksService.execute(id)
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            if (error instanceof Error || error instanceof TaskBadFieldException) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error', error: error?.message });
            }
        }
    }
} 