import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import uiStore from "../store/ui.store"
import userStore from "../../features/users/store/user.store"

const DeleteModal = () => {

    const  {isOpenDeleteModal, typeDeleteModal, closeDeleteModal, deleteModalData} = uiStore()
    const {deleteUser} = userStore()

    const submitForm = (e) => {
        e.preventDefault()
        const id = deleteModalData.id

        typeDeleteModal == 'USER'
            ? deleteUser(id)
            : ''

            handleClose()
    }

    const handleClose = () => closeDeleteModal()

    return (
        <Modal show={isOpenDeleteModal} onHide={handleClose} centered>
        <Modal.Header className='justify-content-center'>
            <Modal.Title>
                {typeDeleteModal == 'USER' ? 'Eliminar usuario' : 'Eliminar tarea'}
            </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitForm}>
            <Modal.Body className='text-center my-3'>
                    ¿Estás seguro que deseas eliminar la información?
                    {typeDeleteModal == 'USER' ? `
                        Al borrar el usuario se eliminarán todas
                        las tareas asociadas a este.
                    ` : ''}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                    onClick={handleClose}
                >
                    Cancelar
                </Button>
                <Button variant="primary" type='submit'>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Form>
        </Modal>
    )
}

export default DeleteModal