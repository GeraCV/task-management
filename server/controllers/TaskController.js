import { TaskModel } from "../models/taskModel.js";
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from "../validations/taskSchema.js";

export class TaskController {

    static async getAllTasks (req, res) {
        const tasks = await TaskModel.getAllTasks()
        if(tasks.length) {
            res.json({data: tasks})
        } else {
            res.status(404).json({data: tasks, message: 'No se encontraron resultados.'})
        }
    }

    static async getTaskById (req, res) {
        const id = req.params.id
        const task = await TaskModel.getTaskById({id})
        if(task.length) {
            res.json({data: task})
        } else {
            res.status(404).json({data: task, message: 'No se encontraron resultados.'})
        }
    }
    static async createTask (req, res) {
        const isValidData = await createTaskSchema(req.body)
        if (!isValidData.success) {
            const errors = isValidData.error.formErrors.fieldErrors
            return res.status(422).json({ errors: errors, message: 'El formulario contiene errores.' })
        }

        const {name, description, userid} = req.body
        try {
            const creationResult = await TaskModel.createTask({name, description, userid})
            if(creationResult.affectedRows) {
                res.json({mesage: "La información se insertó satisfactoriamente."})
            } else {
                res.status(500).json({mesage: "Hubo un error al insertar la información. Inténtalo mas tarde."})
            }
        } catch (error) {
            res.status(500).json({mesage: "Hubo un error al procesar la solicitud. Contacta al administrador."})
        }
    }

    static async deleteTask (req, res) {
        const id = req.params.id
        const isValidData = await deleteTaskSchema({id})
        if (!isValidData.success) {
            const errors = isValidData.error.formErrors.fieldErrors
            return res.status(422).json({ errors: errors, message: 'El formulario contiene errores.' })
        }

        try {
            const creationResult = await TaskModel.deleteTask({id})
            if(creationResult.affectedRows) {
                res.json({mesage: "La información se eliminó correctamente."})
            } else {
                res.status(500).json({mesage: "Hubo un error al eliminar la información. Inténtalo mas tarde."})
            }
        } catch (error) {
            res.status(500).json({mesage: "Hubo un error al procesar la solicitud. Contacta al administrador."})
        }
    }

    static async updateTask (req, res) {
        const body = req.body
        body['id'] = req.params.id

        const isValidData = await updateTaskSchema(req.body)
        if (!isValidData.success) {
            const errors = isValidData.error.formErrors.fieldErrors
            return res.status(422).json({ errors: errors, message: 'El formulario contiene errores.' })
        }

        const {name, description, id} = body
        try {
            const creationResult = await TaskModel.updateTask({id, name, description})
            if(creationResult.affectedRows) {
                res.json({mesage: "La información se actualizó satisfactoriamente."})
            } else {
                res.status(500).json({mesage: "Hubo un error al actualizar la información. Inténtalo mas tarde."})
            }
        } catch (error) {
            res.status(500).json({mesage: "Hubo un error al procesar la solicitud. Contacta al administrador."})
        }
    }
}