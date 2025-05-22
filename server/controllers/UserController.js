import { UserModel } from "../models/UserModel.js"
import { createUserSchema, deleteUserSchema, updateUserSchema } from "../validations/userSchema.js"
import messages from "../utils/messages.js"

export class UserController {

    static async getAllUsers (req, res) {
        try {
            const users = await UserModel.getAllUsers()
            if(!users.length) {
                return res.status(404).json({data: users, message: messages.NOT_FOUND})
            }
            return res.json({data: users})
        } catch (error) {
            return res.status(500).json({ message: messages.SERVER_ERROR })
        }
    }

    static async getUserById (req, res) {
        try {
            const id = req.params.id
            const users = await UserModel.getUserById({id})
            if(!users.length) {
                return res.status(404).json({data: users, message: messages.NOT_FOUND})
            }
            res.json({data: users})
        } catch (error) {
            return res.status(500).json({ message: messages.SERVER_ERROR })
        }
    }

    static async createUser (req, res) {
        try {
            const isValidData = await createUserSchema(req.body)

            if (!isValidData.success) {
                const errors = isValidData.error.formErrors.fieldErrors
                return res.status(422).json({ errors: errors, type: 'FORM_ERROR', message: messages.FORM_ERROR })
            }

            const {name} = isValidData.data
            const creationResult = await UserModel.createUser({name})
            if(!creationResult.affectedRows) {
                return res.status(500).json({mesage: messages.INSERT_ERROR})
            }

            return res.json({mesage: messages.INSERT_SUCCESS})
        } catch (error) {
            return res.status(500).json({ message: messages.SERVER_ERROR })
        }
    }

    static async deleteUser (req, res) {
        try {
            const id = req.params.id
            const isValidData = await deleteUserSchema({id})
            if (!isValidData.success) {
                const errors = isValidData.error.formErrors.fieldErrors
                return res.status(400).json({ errors: errors, type: 'PARAM_ERROR', message: messages.FORM_ERROR })
            }
            const creationResult = await UserModel.deleteUser({id})
            if(!creationResult.affectedRows) {
                return res.status(500).json({mesage: messages.DELETE_ERROR})
            }
            return res.json({mesage: messages.DELETE_SUCCESS})
        } catch (error) {
            return res.status(500).json({ message: messages.SERVER_ERROR })
        }
    }

    static async updateUser (req, res) {
        try {
            const body = req.body
            body['id'] = req.params.id

            const isValidData = await updateUserSchema(body)
            if (!isValidData.success) {
                const errors = isValidData.error.formErrors.fieldErrors
                return res.status(422).json({ errors: errors, type: 'FORM_ERROR', message: messages.FORM_ERROR })
            }

            const {name, id} = isValidData.data
            const creationResult = await UserModel.updateUser({id, name})
            if(!creationResult.affectedRows) {
                return res.status(500).json({mesage: messages.UPDATE_ERROR})
            }
            return res.json({mesage: messages.UPDATE_SUCCESS})
        } catch (error) {
            return res.status(500).json({ message: messages.SERVER_ERROR })
        }
    }
}
