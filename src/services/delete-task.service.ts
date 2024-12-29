import { TaskModel } from "../models/task.model";
import { TaskNotFoundException } from "./errors/task-not-found-exception";


export class DeleteTaskService {
    public constructor(){}

    public async execute(taskId: string) : Promise<void> {

        const existingTask = await TaskModel.findById(taskId);
                if (!existingTask) {
                    throw new TaskNotFoundException();
                }
        await existingTask.deleteOne();
    }
}