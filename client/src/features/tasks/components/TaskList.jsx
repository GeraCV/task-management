import Table from "react-bootstrap/Table";
import taskStore from "../store/tasks.store";
import { useEffect } from "react";
import ListItem from "./ListItem";

const TaskList = () => {

    const { tasks, getAllTasks } = taskStore()

    useEffect( () => {
        const getTasks = async () => {
            await getAllTasks()
        }
        getTasks()
    },[getAllTasks])

    return (
        <div className="task-table-container">
            <Table className="task-table" striped bordered hover>
                <thead className="text-center">
                    <tr>
                        <th>Id</th>
                        <th>Estatus</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length
                        ?   tasks.map(el => (
                                <ListItem
                                    key={el.id}
                                    id={el.id}
                                    name={el.name}
                                    description={el.description}
                                    status={el.status}
                                    username={el.username}
                                    userid={el.userid}

                                />
                            ))
                        : <tr>
                            <td colSpan={6} className="text-center"> Sin resultados</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default TaskList