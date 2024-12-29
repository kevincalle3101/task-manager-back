export class TaskNotFoundException extends Error {
    constructor() {
      super('No se encontró la tarea')
    }
  }
  