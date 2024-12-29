export class TaskBadFieldException extends Error {
    constructor(message: string) {
      super(message);
      this.name = "TaskBadFieldException";
    }
  }
  