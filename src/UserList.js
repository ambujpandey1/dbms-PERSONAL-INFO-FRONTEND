import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  // Fetch users from backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/users') // Replace with your backend URL
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.age} - {user.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
