import { Router } from "express"
import { TaskController } from "../controllers/taskController.js"

const taskRouter = Router()

taskRouter.get('/', TaskController.getAllTasks)
taskRouter.get('/:id', TaskController.getTaskById)
taskRouter.post('/', TaskController.createTask)
taskRouter.delete('/:id', TaskController.deleteTask)
taskRouter.put('/:id', TaskController.updateTask)

export default taskRouter