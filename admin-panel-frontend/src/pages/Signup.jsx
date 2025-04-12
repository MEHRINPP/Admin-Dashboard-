import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css'; // Make sure the CSS file is imported

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Initialize navigate for redirection
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        try {
            // Make the request to the backend
            const response = await axios.post('http://localhost:8000/api/register/', { username, email, password });

            // Alert the user about successful registration
            alert('Registration successful');
            
            // Redirect to the login page
            navigate('/login'); // Use navigate to redirect to login page after success
        } catch (error) {
            if (error.response) {
                // Server responded with an error
                console.error(error.response.data); // Log the error response
                alert(`Error registering user: ${error.response.data.detail || error.response.data}`);
            } else if (error.request) {
                // Request was made but no response received
                console.error(error.request); // Log the error request
                alert('Error: No response from server');
            } else {
                // Something happened in setting up the request
                console.error(error.message); // Log the error message
                alert(`Error: ${error.message}`);
            }
        }
    };
    
    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Signup</h2>
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
                        type="email" 
                        className="form-input" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
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
                    <input 
                        type="password" 
                        className="form-input" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="submit-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
