import Table from "react-bootstrap/Table";
import userStore from "../store/user.store"
import { useEffect } from "react";
import ListItem from "./ListItem";

const UserList = () => {

    const { users, getAllUsers } = userStore()

    useEffect( () => {
        const getUsers = async () => {
            await getAllUsers()
        }
        getUsers()
    },[getAllUsers])

    return (
        <div className="user-table-container">
            <Table className="user-table" striped bordered hover>
                <thead className="text-center">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length
                        ?   users.map(el => (
                                <ListItem
                                    key={el.id}
                                    id={el.id}
                                    name={el.name}
                                />
                            ))
                        : <tr>
                            <td colSpan={3} className="text-center"> Sin resultados</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default UserList