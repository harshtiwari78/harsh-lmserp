import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApproveRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/book-requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await axios.post('/api/approve-request', { requestId });
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <div>
      <h2>Approve Book Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            {request.book.title} - {request.user.name}
            <button onClick={() => handleApprove(request._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApproveRequests;
