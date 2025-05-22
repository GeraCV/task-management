import { Router } from "express"
import { UserController } from "../controllers/UserController.js"

const userRouter = Router()

userRouter.get('/', UserController.getAllUsers)
userRouter.get('/:id', UserController.getUserById)
userRouter.post('/', UserController.createUser)
userRouter.delete('/:id', UserController.deleteUser)
userRouter.put('/:id', UserController.updateUser)

export default userRouter