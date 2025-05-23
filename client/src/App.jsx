import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UserPage from './features/users/pages/UserPage';
import TaskPage from './features/tasks/pages/TaskPage';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/task'/>}/>
                <Route path='/user' element={<UserPage />} />
                <Route path='/task' element={<TaskPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
