import Database from "../config/db.js"

export class UserModel {

    static async getAllUsers () {
        return await Database.query(
            `
                SELECT
                    id, name
                FROM
                    users;
            `
        )
    }

    static async getUserById ({id}) {
        return await Database.query(
            `
                SELECT
                    id, name
                FROM
                    users
                WHERE
                    id=?;
            `
        , [id])
    }

    static async createUser ({name}) {
        return await Database.query(
            `
                INSERT INTO
                    users (name)
                VALUES (?);
            `
        , [name])
    }

    static async deleteUser ({id}) {
        return await Database.query(
            `
                DELETE FROM
                    users
                WHERE
                    id = ?;
            `
        , [id])
    }

    static async updateUser ({id, name}) {
        return await Database.query(
            `
                UPDATE
                    users
                SET
                    name = ?
                WHERE
                    id = ?;
            `
        , [name, id])
    }
}