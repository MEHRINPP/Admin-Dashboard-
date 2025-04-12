import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditUserPage.css';  // Assuming you'll create a CSS file for the styles

function EditUserPage() {
    const { userId } = useParams();  // Get the userId from the URL
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();  // To navigate back to admin panel after saving changes

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/users/${userId}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
                setName(response.data.username);
                setEmail(response.data.email);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load user data', error);
                if (error.response && error.response.data) {
                    setError(`Failed to load user data: ${error.response.data.detail || error.response.data.error}`);
                } else {
                    setError('Failed to load user data');
                }
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);  // Fetch user data whenever the userId changes

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:8000/api/users/${userId}/update/`,  // Ensure the correct endpoint for updating user
                { username: name, email },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('User updated:', response.data);
            navigate('/admin');  // Navigate back to admin panel after saving changes
        } catch (error) {
            console.error('Error saving user data', error);
            if (error.response && error.response.data) {
                setError(`Error saving user data: ${error.response.data.error || error.response.data.detail}`);
            } else {
                setError('Error saving user data');
            }
        }
    };

    const handleCancel = () => {
        navigate('/admin');  // Navigate back to admin panel if cancel is clicked
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="edit-user-page">
            <div className="edit-user-container">
                <h2 className="edit-user-heading">Edit User</h2>
                <div className="input-group">
                    <label htmlFor="name" className="input-label">Name:</label>
                    <input 
                        id="name"
                        className="input-field" 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Email:</label>
                    <input 
                        id="email"
                        className="input-field" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="button-group">
                    <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditUserPage;
