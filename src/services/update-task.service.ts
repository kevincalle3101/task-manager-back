import { TaskModel } from "../models/task.model";
import { UpdateTaskDto } from "./dto/update-tast.dto";
import { ITask } from "../models/constants/index";
import { TaskNotFoundException } from "./errors/task-not-found-exception";


export class UpdateTaskService {
    public constructor(){}

    public async execute(fields: UpdateTaskDto) : Promise<{data: ITask}> {
        const { id, ...updates } = fields;

        const existingTask = await TaskModel.findById(id);
            if (!existingTask) {
            throw new TaskNotFoundException();
        }
        Object.assign(existingTask, updates);

        const updatedTask = await existingTask.save();

        return { data: updatedTask };
    }
}