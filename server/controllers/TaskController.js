import { TaskModel } from "../models/taskModel.js"
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from "../validations/taskSchema.js"
import messages from "../utils/messages.js"

export class TaskController {

    static async getAllTasks (req, res) {
        try {
            const tasks = await TaskModel.getAllTasks()
            if(!tasks.length) {
                return res.status(404).json({data: tasks, message: messages.NOT_FOUND})
            }
            return res.json({data: tasks})
        } catch (error) {
            return res.status(500).json({ message: messages.SERVER_ERROR })
        }
    }

    static async getTaskById (req, res) {
        try {
            const id = req.params.id
            const task = await TaskModel.getTaskById({id})
            if(!task.length) {
                return res.status(404).json({data: task, message: messages.NOT_FOUND})
            }
            return res.json({data: task})
        } catch (error) {
            return res.status(500).json({ message: messages.SERVER_ERROR })
        }
    }

    static async createTask (req, res) {
        try {
            const isValidData = await createTaskSchema(req.body)
            if (!isValidData.success) {
                const errors = isValidData.error.formErrors.fieldErrors
                return res.status(422).json({ errors: errors, type: 'FORM_ERROR', message: messages.FORM_ERROR })
            }

            const {name, description, userid} = isValidData.data

            const creationResult = await TaskModel.createTask({name, description, userid})

            if(!creationResult.affectedRows) {
                return res.status(500).json({mesage: messages.INSERT_ERROR})
            }

            return res.json({mesage: messages.INSERT_SUCCESS})

        } catch (error) {
            return res.status(500).json({mesage: messages.SERVER_ERROR})
        }
    }

    static async deleteTask (req, res) {
        try {
            const id = req.params.id
            const isValidData = await deleteTaskSchema({id})
            if (!isValidData.success) {
                const errors = isValidData.error.formErrors.fieldErrors
                return res.status(400).json({ errors: errors,  type: 'PARAM_ERROR', message: messages.FORM_ERROR })
            }
            const creationResult = await TaskModel.deleteTask({id})
            if(!creationResult.affectedRows) {
                return res.status(500).json({mesage: messages.DELETE_ERROR})
            }
            return res.json({mesage: messages.DELETE_SUCCESS})
        } catch (error) {
            return res.status(500).json({mesage: messages.SERVER_ERROR})
        }
    }

    static async updateTask (req, res) {
        try {
            const body = req.body
            body['id'] = req.params.id

            const isValidData = await updateTaskSchema(body)
            if (!isValidData.success) {
                const errors = isValidData.error.formErrors.fieldErrors
                return res.status(422).json({ errors: errors,  type: 'FORM_ERROR', message: messages.FORM_ERROR })
            }

            const {name, description, id} = isValidData.data
            const creationResult = await TaskModel.updateTask({id, name, description})
            if(!creationResult.affectedRows) {
                return res.status(500).json({mesage: messages.UPDATE_ERROR})
            }
            return res.json({mesage: messages.UPDATE_SUCCESS})
        } catch (error) {
            return res.status(500).json({mesage: messages.SERVER_ERROR})
        }
    }
}