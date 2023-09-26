import React, { useState } from 'react';
import axios from 'axios';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Make the API call to reset the password
      const token = new URLSearchParams(window.location.search).get('token');
      const response = await axios.post(`http://localhost:8080/api/v1/users/resetPassword?token=${token}&newPassword=${newPassword}`);

      // Display a success message
      setMessage('Password reset successfully');
    } catch (error) {
      // Display an error message
      setMessage('Failed to reset password');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
        </label>
        <br />
        <label>
          Confirm New Password:
          <input type="password" value={confirmNewPassword} onChange={(event) => setConfirmNewPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewPassword;