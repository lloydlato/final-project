// src/components/LogoutButton.jsx
import React from 'react';
import { useAuth } from '../providers/AuthProvider';

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    alert('You have been logged out.');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
