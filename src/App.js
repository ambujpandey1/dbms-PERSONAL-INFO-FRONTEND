import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [UserId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [branch, setBranch] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [accessType, setAccessType] = useState('');
  const [loading, setLoading] = useState(false);

  // Save Information
  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/save', {
        UserId,
        name,
        email,
        phone,
        address,
        branch,
      });
      alert(response.data.message || 'Information saved successfully!');
      clearForm();
    } catch (error) {
      console.error('Error saving data:', error.response?.data || error.message);
      alert('Failed to save information.');
    }
  };

  // Fetch Data
  const handleFetchData = async (type) => {
    setLoading(true);
    let url = 'http://localhost:5000/api/info';
    if (type === 'UserId') {
      const userId = prompt('Enter the UserId:');
      url = `http://localhost:5000/api/info/${userId}`;
    } else if (type === 'name') {
      const name = prompt('Enter the name:');
      url = `http://localhost:5000/api/info/${name}`;
    }

    try {
      const response = await axios.get(url);
      setFetchedData(response.data || []);
      setAccessType(type);
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
      alert('Failed to fetch information.');
    } finally {
      setLoading(false);
    }
  };

  // Delete Data
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete UserId: ${userId}?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/delete/${userId}`);
      alert(response.data.message || 'Record deleted successfully!');
      setFetchedData(fetchedData.filter((item) => item.UserId !== userId));
    } catch (error) {
      console.error('Error deleting data:', error.response?.data || error.message);
      alert('Failed to delete the record.');
    }
  };

  // Clear Form
  const clearForm = () => {
    setUserId('');
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setBranch('');
  };

  return (
    <div className="App">
      <div className='App1'>
      <h1>Personal Information System</h1>
      <h3>Mini Project of DBMS</h3>
      <h2>(Created by  <span className='ap'>Ambuj Pandey</span> )</h2>
      </div>
      <form onSubmit={handleSaveSubmit} className="info-form">
        <div className="form-group">
          <label>UserId:</label>
          <input
            type="text"
            value={UserId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Branch:</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <div className="action-buttons">
        <button onClick={() => handleFetchData('UserId')} className="action-btn">
          Access By ID
        </button>
        <button onClick={() => handleFetchData('name')} className="action-btn">
          Access By Name
        </button>
        <button onClick={() => handleFetchData('all')} className="action-btn">
          View All Information
        </button>
      </div>

      {loading && <p>Loading data...</p>}

      {fetchedData.length > 0 && (
        <div className="table-container">
          <h3>{accessType === 'all' ? 'All Saved Information' : 'User Information'}</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>UserId</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Branch</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.UserId}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.branch}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.UserId)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
