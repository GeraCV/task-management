import Database from "../config/db.js";

export class UserModel {

    static async getAllUsers () {
        return await Database.query(
            `
                SELECT
                    id, name
                FROM
                    taskmanagement.users;
            `
        )
    }

    static async getUserById ({id}) {
        return await Database.query(
            `
                SELECT
                    id, name
                FROM
                    taskmanagement.users where id=?;
            `
        , [id])
    }

    static async createUser ({name}) {
        return await Database.query(
            `
                INSERT INTO
                    taskmanagement.users (name)
                VALUES (?);
            `
        , [name])
    }

    static async deleteUser ({id}) {
        return await Database.query(
            `
                DELETE FROM
                    taskmanagement.users
                WHERE id = ?;
            `
        , [id])
    }

    static async updateUser ({id, name}) {
        return await Database.query(
            `
                UPDATE
                    taskmanagement.users
                SET
                    name = ?
                WHERE id = ?;
            `
        , [name, id])
    }
}