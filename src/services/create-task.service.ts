import { TaskModel } from "../models/task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ITask } from "../models/constants/index";



export class CreateTaskService {
    public constructor(){}

    public async execute(fields: CreateTaskDto) : Promise<{data: ITask}> {
        const newTask = await TaskModel.make(fields).save();

        return {data: newTask};
    }
}