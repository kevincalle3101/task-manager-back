import mongoose, { Model } from "mongoose";
import { ITask } from "./constants";

interface TaskModelType extends Model<ITask> {
    make(fields: { title: string; description?: string; state?: boolean }): ITask;
  }

const TaskSchema = new mongoose.Schema<ITask>({
    title: {type: String, required: true},
    description: {type: String},
    state: {type: Boolean, required: true, default: false },

},
{ timestamps: true }
)

TaskSchema.statics.make = function (fields: { title: string; description?: string
 }): ITask {
    return new this({
      title: fields.title,
      description: fields.description || null,
      state: false,
    });
  };

export const TaskModel = mongoose.model<ITask, TaskModelType>('Task', TaskSchema);