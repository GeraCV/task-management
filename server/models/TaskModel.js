import Database from "../config/db.js"

export class TaskModel {

    static async getAllTasks () {
        return await Database.query(
            `
                SELECT
                    id, name, description, status
                FROM
                    tasks;
            `
        )
    }

    static async getTaskById ({id}) {
        return await Database.query(
            `
                SELECT
                    id, name, description, status
                FROM
                    tasks where id=?;
            `
        , [id])
    }

    static async createTask ({name, description, userid, status}) {
        return await Database.query(
            `
                INSERT INTO
                    tasks (name, description, user_id, status)
                VALUES (?,?,?,?);
            `
        , [name, description, userid, status])
    }

    static async deleteTask ({id}) {
        return await Database.query(
            `
                DELETE FROM
                    tasks
                WHERE id = ?;
            `
        , [id])
    }

    static async updateTask ({id, name, description, status}) {
        return await Database.query(
            `
                UPDATE
                    tasks
                SET
                    name = ?,
                    description = ?,
                    status = ?
                WHERE id = ?;
            `
        , [name, description, status, id])
    }
}