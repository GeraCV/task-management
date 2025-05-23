import Button from 'react-bootstrap/Button';
import uiStore from '../../../shared/store/ui.store';
import taskStore from '../store/tasks.store';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

const ListItem = ({id, name, description, status, username, userid}) => {

    const {openModal, openDeleteModal} = uiStore()
    const {setErrors} = taskStore()
    const showModal = () => {
        const data = {
            id: id,
            name: name,
            description: description,
            status: status,
            userid: userid
        }
        setErrors()
        openModal(true, data)
    }

    const showDeleteModal = () => {
        const data = {id: id}
        openDeleteModal(true, data, 'TASK')
    }

    return (
        <tr key={id}>
            <td>{id}</td>
            <td className='text-center'>
                <Badge bg={status ? 'success' : 'warning'}>
                    {status ? 'Completado' : 'Pendiente'}
                </Badge>
            </td>
            <td>{name}</td>
            <td>{description}</td>
            <td>{username}</td>
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