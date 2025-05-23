import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import uiStore from '../../../shared/store/ui.store';
import userStore from '../store/user.store';

const UserModal = () => {

    const {isOpenModal, openModal, modalData} = uiStore()
    const {submitUser, errors} = userStore()
    const [ formData, setFormData ] = useState ({
        id: '',
        name: ''
    })

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
            name: modalData ? modalData.name : ''
        })
    }, [modalData, isOpenModal])

    const submitForm = async (e) => {
        e.preventDefault()
        const result = await submitUser(formData, modalData ? 'EDIT' : 'CREATE')
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
                {modalData ? 'Editar usuario' : 'Añadir usuario'}
            </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitForm}>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                    onClick={onCloseModal}
                >
                    Cancelar
                </Button>
                <Button variant="primary" type='submit'>
                    Agregar
                </Button>
            </Modal.Footer>
        </Form>
        </Modal>
    )

}


export default UserModal