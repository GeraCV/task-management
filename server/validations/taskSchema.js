import { z } from "zod"
import Database from "../config/db.js"

const createSchema = z.object({
    name: z.string({required_error: 'El campo es obligatorio.'})
        .trim()
        .min(1, { message: "Asegúrate de ingresar al menos un caracter" })
        .max(50, {message: "Asegúrate de no superar 50 caracteres" }),
    description: z.string({required_error: 'El campo es obligatorio.'})
        .trim()
        .min(1, { message: "Asegúrate de ingresar al menos un caracter" })
        .max(2000, {message: "Asegúrate de no superar 2000 caracteres" }),
    userid: z.string({required_error: 'El campo es obligatorio.'})
        .refine(async (id) => {
        const result = await Database.query(`
                SELECT
                    id
                FROM
                    users
                WHERE
                    id = ?
            `, [id])
        return result.length > 0
    }, {
        message: 'Asegúrate de ingresar un ID de usuario válido',
    })
})


const deleteSchema = z.object({
    id: z.string().refine(async (id) => {
        const result = await Database.query(`
            SELECT
                id
            FROM
                tasks
            WHERE
                id = ?
            `, [id])
        return result.length > 0
        }, {
        message: 'Asegúrate de ingresar un ID de tarea válido',
    })
})

const updateSchema = createSchema.merge(deleteSchema)

export const createTaskSchema = (data) => {
    return createSchema.safeParseAsync(data)
}

export const deleteTaskSchema = (data) => {
    return deleteSchema.safeParseAsync(data)
}

export const updateTaskSchema = (data) => {
    return updateSchema.safeParseAsync(data)
}