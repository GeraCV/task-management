import Button from 'react-bootstrap/Button'
import uiStore from '../../../shared/store/ui.store'
import userStore from '../store/user.store'
const AddButton = () => {

    const {openModal} = uiStore()
    const {setErrors} = userStore()

    const showModal = () => {
        setErrors()
        openModal(true, null)
    }

    return (
        <div className="container-add-task mb-4 text-end">
            <Button variant="primary"
                onClick={showModal}
            >
                Añadir usuario
            </Button>
        </div>
    )
}

export default  AddButton