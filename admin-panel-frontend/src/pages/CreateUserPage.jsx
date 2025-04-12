import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateUserPage.css';  // Make sure to import the CSS file

function CreateUserPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Hook to navigate programmatically

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setErrorMessage('All fields are required.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('You are not authenticated. Please log in.');
                return;
            }

            const response = await axios.post('http://localhost:8000/api/users/create/', {
                username,
                email,
                password,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log('User created:', response.data);

            // Redirect to admin page after user is created
            navigate('/admin');  // Change this to '/admin' to redirect to the correct page
        } catch (error) {
            console.error('Error creating user:', error.response ? error.response.data : error);
            setErrorMessage('Error creating user.');
        }
    };

    return (
        <div className="create-user-page">
            <h2>Create New User</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit} className="create-user-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Create User</button>
            </form>
        </div>
    );
}

export default CreateUserPage;
