import Button from 'react-bootstrap/Button';
import uiStore from '../../../shared/store/ui.store';
import userStore from '../store/user.store';

const ListItem = ({id, name}) => {

    const {openModal, openDeleteModal} = uiStore()
    const {setErrors} = userStore()
    const showModal = () => {
        const data = {id: id, name: name}
        setErrors()
        openModal(true, data)
    }

    const showDeleteModal = () => {
        const data = {id: id}
        openDeleteModal(true, data, 'USER')
    }

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>
                <div className="d-flex justify-content-around m-auto w-70">
                    <Button
                        variant="info"
                        onClick={showModal}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={showDeleteModal}
                    >
                        Eliminar
                    </Button>
                </div>
            </td>
        </tr>
    )
}

export default ListItem