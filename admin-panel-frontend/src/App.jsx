import { Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import EditUserPage from './pages/EditUserPage';
import CreateUserPage from './pages/CreateUserPage';


function App() {
    const navigate = useNavigate();  // Hook to navigate programmatically

    const handleLogin = () => {
        navigate('/admin');  // Redirect to the admin panel after login
    };

    return (
        <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin" element={<AdminPanel />} />  {/* Ensure this route exists */}
            <Route path="/users/:userId/edit" element={<EditUserPage />} />
            <Route path="/create-user" element={<CreateUserPage />} />
        </Routes>
    );
}

export default App;
