import { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Make sure to import the CSS file

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Sending data:', { username, password }); // Log the data being sent to the backend
     
        try {
            const response = await axios.post(
                'http://localhost:8000/api/login/', 
                { username, password }, 
                {
                    headers: {
                        'Content-Type': 'application/json', // Make sure it's set to JSON
                    },
                }
            );
            console.log('Login response:', response); // Log the response from the backend
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
            onLogin();  // Call the parent function to handle post-login actions
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error); // Log the error details
            alert('Invalid credentials');
        }
    };
    
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        className="form-input" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
