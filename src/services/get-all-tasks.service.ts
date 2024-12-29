import { ITask } from "src/models/constants";
import { TaskModel } from "../models/task.model";



export class GetAllTaskService {
    public constructor(){}

    public async execute(state?: boolean) : Promise<{data: ITask[]}> {
        const filter: { state?: boolean } = {};

        if (state !== undefined) {
            filter.state = state;
        }

        const tasksFound: ITask[] = await TaskModel.find(filter);

        return {data: tasksFound};
    }
}