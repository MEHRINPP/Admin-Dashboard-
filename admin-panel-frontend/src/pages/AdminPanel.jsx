import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';

function AdminPanel() {
    const [selectedSection, setSelectedSection] = useState('about');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State to store search input
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { replace: true });  // ⬅️ Prevent back button returning
            return;
        }
    
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                // Possibly invalid token — force logout
                localStorage.removeItem('token');
                navigate('/login', { replace: true });
            }
        };
    
        const fetchLoggedInUser = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/logged-in-user/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLoggedInUser(response.data);
            } catch (error) {
                console.error('Error fetching logged-in user:', error);
            }
        };
    
        fetchUsers();
        fetchLoggedInUser();
    }, [navigate]);
    
    
    // Handle the search input change and filter users
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Filter users based on username or email
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });  // ⬅️ This prevents going back to admin with back button
    };
    

    const handleEditClick = (userId) => {
        navigate(`/users/${userId}/edit`);
    };

    const handleDeleteClick = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`http://localhost:8000/api/users/${userId}/delete/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Delete response:', response);
            setUsers(users.filter(user => user.id !== userId)); // Remove deleted user from the list
            setFilteredUsers(filteredUsers.filter(user => user.id !== userId)); // Update filtered list as well
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error);
            alert('Failed to delete user');
        }
    };

    return (
        <div className="admin-panel-container">
            <div className="sidebar">
                <button onClick={() => setSelectedSection('about')} className="sidebar-button">About</button>
                <button onClick={() => setSelectedSection('users')} className="sidebar-button">Users</button>
                <button onClick={handleLogout} className="sidebar-button">Logout</button>
            </div>

            <div className="main-content">
                {selectedSection === 'about' && (
                    <div className="about-section">
                        This is the Admin dashboard which is mainly used to manage the logged users.<br />
                        Here we can see users who logged in the website with their name and emails.
                    </div>
                )}

                {selectedSection === 'users' && (
                    <div className="users-section">
                        <h3>Logged-in User</h3>
                        {loggedInUser ? (
                            <>
                                <p><strong>Name:</strong> {loggedInUser.username}</p>
                                <p><strong>Email:</strong> {loggedInUser.email}</p>
                            </>
                        ) : (
                            <p className="loading">Loading logged-in user data...</p>
                        )}

                        <h3>User Management</h3>
                        {/* Create New User Button */}
                        <button 
                            onClick={() => navigate('/create-user')} 
                            className="create-user-button"
                        >
                            Create New User
                        </button>

                        {/* Search input */}
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search users by username or email..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="search-input"
                            />
                        </div>

                        <div className="users-table-wrapper">
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Manage Users</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button
                                                        className="manage-button"
                                                        onClick={() => handleEditClick(user.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="delete-button"
                                                        onClick={() => handleDeleteClick(user.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="3">No users found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;
