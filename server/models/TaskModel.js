import Database from "../config/db.js";

export class TaskModel {

    static async getAllTasks () {
        return await Database.query(
            `
                SELECT
                    id, name, description
                FROM
                    taskmanagement.tasks;
            `
        )
    }

    static async getTaskById ({id}) {
        return await Database.query(
            `
                SELECT
                    id, name, description
                FROM
                    taskmanagement.tasks where id=?;
            `
        , [id])
    }

    static async createTask ({name, description, userid}) {
        return await Database.query(
            `
                INSERT INTO
                    taskmanagement.tasks (name, description, user_id)
                VALUES (?,?,?);
            `
        , [name, description, userid])
    }

    static async deleteTask ({id}) {
        return await Database.query(
            `
                DELETE FROM
                    taskmanagement.tasks
                WHERE id = ?;
            `
        , [id])
    }

    static async updateTask ({id, name, description}) {
        return await Database.query(
            `
                UPDATE
                    taskmanagement.tasks
                SET
                    name = ?,
                    description = ?
                WHERE id = ?;
            `
        , [name, description, id])
    }
}