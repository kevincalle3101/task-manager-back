import express from 'express'
import { Request, Response } from "express";

import { CreateTasksController } from '../controllers/create-task.controller';
import { GetTasksController } from '../controllers/get-all-tasks.controller';
import { CreateTaskService } from '../services/create-task.service';
import { GetAllTaskService } from '../services/get-all-tasks.service';
import { UpdateTaskService } from '../services/update-task.service';
import { UpdateTasksController } from '../controllers/update-task.controller';
import { DeleteTaskService } from '../services/delete-task.service';
import { DeleteTasksController } from '../controllers/delete-task.controller';

import { validateCreate, validateId } from '../validators/task.validator';


export default (router: express.Router) => {
    const getAllTaskService    = new GetAllTaskService();
    const getTasksController   = new GetTasksController(getAllTaskService);
    const createTaskService    = new CreateTaskService();
    const createTaskController = new CreateTasksController(createTaskService);
    const updateTaskService    = new UpdateTaskService();
    const updateTaskController = new UpdateTasksController(updateTaskService);
    const deleteTaskService    = new DeleteTaskService();
    const deleteTaskController = new DeleteTasksController(deleteTaskService);

/**
 * @swagger
 * /task    :
 *   get:
 *     summary: Returns the list of all the Tasks
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: boolean
 *         description: Filtro de tareas por estado (true or false)
 *         example: true
 *     responses:
 *       200:
 *         description: Listado de tareas obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *           description: Ruta no encontrada
 *       500:
 *           description: Error interno del servidor
 */

    router.get('/task/', (req: Request, res: Response) => getTasksController.getAllTasks(req, res))

/**
 * @swagger
 * /task    :
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea (requerido).
 *                   - Debe ser un string.
 *                 example: "Estudiar"
 *               description:
 *                 type: string
 *                 description: La descripción de la tarea (opcional)
 *                 example: "Estudiar matemáticas por la tarde" 
 *     responses:
 *       200:
 *         description: Tarea creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación en los datos enviados.
 *       404:
 *         description: Ruta no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
    router.post('/task/', validateCreate, (req: Request, res: Response) => createTaskController.createTask(req, res))

/**
 * @swagger
 * /task/{id}:
 *   patch:
 *     summary: Actualiza los campos de una tarea existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:  
 *           type: string
 *         description: El ID de la tarea a actualizar, debe ser un formato válido de Mongo Object ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El nuevo título de la tarea (opcional).
 *                 example: "Estudiar física"
 *               description:
 *                 type: string
 *                 description: La nueva descripción de la tarea (opcional).
 *                 example: "Estudiar física cuántica en la tarde"
 *               state:
 *                 type: boolean
 *                 description: El nuevo estado de la tarea (opcional).
 *                 example: "true"      
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación en los datos enviados.
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error interno del servidor.
 */
    router.patch('/task/:id', validateId, (req: Request, res: Response) => updateTaskController.updateTask(req, res))

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Elimina una tarea existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:  
 *           type: string
 *         description: El ID de la tarea a eliminar, debe ser un formato válido de Mongo Object ID.
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente.
 *       400:
 *         description: Tarea no encontrada con el ID proporcionado.
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error interno del servidor.
 */
    router.delete('/task/:id', validateId, (req: Request, res: Response) => deleteTaskController.deleteTasks(req, res))
}