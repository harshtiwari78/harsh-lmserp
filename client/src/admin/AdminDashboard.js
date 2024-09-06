// AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/admin/approve-requests">Approve Requests</Link></li>
          <li><Link to="/admin/add-book">Add New Book</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;

// ApproveRequests.js
