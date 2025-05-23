import Button from 'react-bootstrap/Button'
import uiStore from '../../../shared/store/ui.store'
import taskStore from '../store/tasks.store'
const AddButton = () => {

    const {openModal} = uiStore()
    const {setErrors} = taskStore()

    const showModal = () => {
        setErrors()
        openModal(true, null)
    }

    return (
        <div className="container-add-task mb-4 text-end">
            <Button variant="primary"
                onClick={showModal}
            >
                Añadir tarea
            </Button>
        </div>
    )
}

export default  AddButton