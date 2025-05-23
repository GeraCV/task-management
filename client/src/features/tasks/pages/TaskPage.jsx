import TaskList from "../components/TaskList"
import AddButton from "../components/AddButton"
import TaskModal from "../components/TaskModal"
import DeleteModal from "../../../shared/components/DeleteModal"

const TaskPage = () => {
    return (
        <div className="main-wrapper">
            <div className="main-content-tasks mx-4">
                <h2 className="text-center"> Tareas </h2>
                <AddButton />
                <TaskList />
                <TaskModal />
                <DeleteModal />
            </div>
        </div>
    )
}

export default TaskPage