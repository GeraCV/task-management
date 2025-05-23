import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import uiStore from '../../../shared/store/ui.store';
import taskStore from '../store/tasks.store';
import userStore from '../../users/store/user.store';
const TaskModal = () => {

    const {isOpenModal, openModal, modalData} = uiStore()
    const { users, getAllUsers } = userStore()
    const {submitTask, errors} = taskStore()
    const [ formData, setFormData ] = useState ({
        id: '',
        name: '',
        description: '',
        status: '',
        userid: ''
    })

    useEffect( () => {
        const getUsers = async () => {
            await getAllUsers()
        }
        getUsers()
    },[getAllUsers])

    const onCloseModal = () => openModal(false)

    const handleForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        setFormData({
            id: modalData ? modalData.id : '',
            name: modalData ? modalData.name : '',
            description: modalData ? modalData.description : '',
            status: modalData ? modalData.status : '',
            userid: modalData ? modalData.userid : ''
        })
    }, [modalData, isOpenModal])

    const submitForm = async (e) => {
        e.preventDefault()
        const result = await submitTask(formData, modalData ? 'EDIT' : 'CREATE')
        if(result != 422) {
            openModal(false, null)
        }
    }

    const closeModal = () => {
        openModal(true, null)
    }

    return (
        <Modal show={isOpenModal} onHide={closeModal} centered>
        <Modal.Header className='justify-content-center'>
            <Modal.Title>
                {modalData ? 'Editar tarea' : 'Añadir tarea'}
            </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitForm}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="form-name">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                        name='status'
                        value={formData.status}
                        onChange={handleForm}
                        isInvalid={!!errors.status}
                    >
                        <option value="null">Elegir estado</option>
                        <option value="1">Completada</option>
                        <option value="0">Pendiente</option>
                    </Form.Select>
                     {errors.status && <p style={{ color: 'red' }}>{errors.status[0]}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="form-name">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Select
                        name='userid'
                        value={formData.userid}
                        onChange={handleForm}
                        isInvalid={!!errors.userid}
                    >
                        {formData && formData.id
                            ? users
                                .filter(el => el.id == formData.userid)
                                .map(el => (
                                    <option key={el.id} value={el.id}>
                                        {el.name}
                                    </option>
                                ))
                            : users.map(el => (
                                <option key={el.id} value={el.id}>
                                    {el.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                     {errors.userid && <p style={{ color: 'red' }}>{errors.userid[0]}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="form-name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        onChange={handleForm}
                        name='name'
                        value={formData.name}
                        isInvalid={!!errors.name}
                    type="text" />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name[0]}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="form-name">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        onChange={handleForm}
                        name='description'
                        value={formData.description}
                        isInvalid={!!errors.description}
                    type="text" />
                        {errors.description && <p style={{ color: 'red' }}>{errors.description[0]}</p>}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                    onClick={onCloseModal}
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


export default TaskModal