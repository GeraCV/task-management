import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UserPage from './features/users/pages/UserPage';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route  path='/' element={<Navigate to='/user'/>}/>
                <Route path='/user' element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
