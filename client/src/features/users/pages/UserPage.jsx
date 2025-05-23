import UserList from "../components/UserList"
import AddButton from "../components/AddButton"
import UserModal from "../components/UserModal"
import DeleteModal from "../../../shared/components/DeleteModal"

const UserPage = () => {
    return (
        <div className="main-wrapper">
            <div className="main-content-users mx-4">
                <h2 className="text-center"> Usuarios </h2>
                <AddButton />
                <UserList />
                <UserModal />
                <DeleteModal />
            </div>
        </div>
    )
}

export default UserPage