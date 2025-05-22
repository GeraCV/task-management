import { z } from 'zod'
import Database from "../config/db.js"

const createSchema = z.object({
    name: z.string()
        .min(5, { message: "Asegúrate de ingresar al menos 5 caracteres" })
        .max(50, {message: "Asegúrate de no superar 50 caracteres"})
        .refine(async (name) => {
            const result = await Database.query(`
                SELECT name FROM taskmanagement.users WHERE name = ?;
                `, [name])

            return result.length == 0
        }, {
        message: 'Usuario existente, ingresa otro nombre.',
        })
})

const deleteSchema = z.object({
    id: z.string().refine(async (id) => {
        const result = await Database.query('SELECT id FROM taskmanagement.users WHERE id = ?;', [id])
        return result.length > 0
        }, {
        message: 'Asegúrate de ingresar un ID de usuario válido',
        })
})


const updateSchema = createSchema.merge(deleteSchema)

export const createUserSchema = (data) => {
    return createSchema.safeParseAsync(data)
}

export const deleteUserSchema = (data) => {
    return deleteSchema.safeParseAsync(data)
}

export const updateUserSchema = (data) => {
    return updateSchema.safeParseAsync(data)
}
