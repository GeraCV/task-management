import Form from 'react-bootstrap/Form';
import userStore from '../../users/store/user.store';
import { useEffect } from 'react';

const FilterSelect = ({filter, setFilter}) => {

        const { users, getAllUsers } = userStore()

        useEffect( () => {
            const getUsers = async () => {
                await getAllUsers()
            }
            getUsers()
        },[getAllUsers])

        const handleState = (e) => {
            const { name, value } = e.target
            setFilter((state) => ({ ...state, [name]: value }))
        }

        const handleUser = (e) => {
            const { name, value } = e.target
            setFilter((state) => ({ ...state, [name]: value }))
        }

    return (
        <div className='d-flex justify-content-around gap-3'>
            <div>
                <Form.Select
                    onChange={handleState}
                    name="tasktype"
                    value={filter.tasktype}>
                    <option value="none">Elige un estado</option>
                    <option value="1">Completada</option>
                    <option value="0">No completada</option>
                </Form.Select>
            </div>
            <div>
                <Form.Select
                    name="users"
                    onChange={handleUser}
                    value={filter.users}
                >
                    <option value="none"> Elige un usuario</option>
                    {
                        users.map(el => (
                            <option value={el.id}>{el.name}</option>
                        ))
                    }
                </Form.Select>
            </div>
        </div>
    );
}

export default FilterSelect