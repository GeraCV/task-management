import { UserModel } from "../models/UserModel.js"
import { createUserSchema, deleteUserSchema, updateUserSchema } from "../validations/userSchema.js"

export class UserController {

    static async getAllUsers (req, res) {
        const users = await UserModel.getAllUsers()
        if(users.length) {
            res.json({data: users})
        } else {
            res.status(404).json({data: users, message: 'No se encontraron resultados.'})
        }
    }

    static async getUserById (req, res) {
        const id = req.params.id
        const users = await UserModel.getUserById({id})
        if(users.length) {
            res.json({data: users})
        } else {
            res.status(404).json({data: users, message: 'No se encontraron resultados.'})
        }
    }

    static async createUser (req, res) {
        const isValidData = await createUserSchema(req.body)

        if (!isValidData.success) {
            const errors = isValidData.error.formErrors.fieldErrors
            return res.status(422).json({ errors: errors, message: 'El formulario contiene errores.' })
        }

        const {name} = req.body
        try {
            const creationResult = await UserModel.createUser({name})
            if(creationResult.affectedRows) {
                res.json({mesage: "La información se insertó satisfactoriamente."})
            } else {
                res.status(500).json({mesage: "Hubo un error al insertar la información. Inténtalo mas tarde."})
            }
        } catch (error) {
            res.status(500).json({mesage: "Hubo un error al procesar la solicitud. Contacta al administrador."})
        }
    }

    static async deleteUser (req, res) {
        const id = req.params.id
        const isValidData = await deleteUserSchema({id})
        if (!isValidData.success) {
            const errors = isValidData.error.formErrors.fieldErrors
            return res.status(422).json({ errors: errors, message: 'El formulario contiene errores.' })
        }

        try {
            const creationResult = await UserModel.deleteUser({id})
            if(creationResult.affectedRows) {
                res.json({mesage: "La información se eliminó correctamente."})
            } else {
                res.status(500).json({mesage: "Hubo un error al eliminar la información. Inténtalo mas tarde."})
            }
        } catch (error) {
            res.status(500).json({mesage: "Hubo un error al procesar la solicitud. Contacta al administrador."})
        }
    }

    static async updateUser (req, res) {
        const body = req.body
        body['id'] = req.params.id

        const isValidData = await updateUserSchema(body)
        if (!isValidData.success) {
            const errors = isValidData.error.formErrors.fieldErrors
            return res.status(422).json({ errors: errors, message: 'El formulario contiene errores.' })
        }

        const {name, id} = body
        try {
            const creationResult = await UserModel.updateUser({id, name})
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
