import TaskList from "../components/TaskList"
import AddButton from "../components/AddButton"
import TaskModal from "../components/TaskModal"
import DeleteModal from "../../../shared/components/DeleteModal"
import FilterSelect from "../components/FilterSelect"
import { useState } from "react"
const TaskPage = () => {

    const [filter, setFilter] = useState({
        users: 'none',
        tasktype: 'none'
    })

    return (
        <div className="main-wrapper">
            <div className="main-content-tasks mx-4">
                <h2 className="text-center"> Tareas </h2>
                <div className="d-flex justify-content-end gap-3 mt-5 mb-3">
                    <FilterSelect filter={filter} setFilter={setFilter} />
                    <AddButton />
                </div>
                <TaskList filter={filter} />
                <TaskModal />
                <DeleteModal />
            </div>
        </div>
    )
}

export default TaskPage