import Database from "../config/db.js"

export class TaskModel {

    static async getAllTasks () {
        return await Database.query(
            `
                SELECT
                    tasks.id,
                    tasks.name,
                    tasks.description,
                    tasks.status,
                    users.name as username,
                    users.id as userid
                FROM
                    tasks
                LEFT JOIN
                    users
                ON tasks.user_id = users.id;
            `
        )
    }

    static async getTaskById ({id}) {
        return await Database.query(
            `
                SELECT
                    tasks.id,
                    tasks.name,
                    tasks.description,
                    tasks.status,
                    users.name as username,
                    users.id as userid
                FROM
                    tasks
                LEFT JOIN
                    users
                ON tasks.user_id = users.id
                WHERE
                    tasks.id = ?;
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