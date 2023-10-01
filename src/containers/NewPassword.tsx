import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from 'styles/NewPassword.module.scss'

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const url = window.location.href;
    const tokenIndex = url.lastIndexOf('/') + 1;
    const tokenValue = url.substring(tokenIndex);
    setToken(tokenValue);
  }, []);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleResetPassword = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const url = `http://localhost:8080/api/v1/users/resetPassword`;

    axios.get(url, {
      params: {
        token: token,
        newPassword: password,
      },
    })
      .then(response => {
        alert('Password reset successful');
        window.location.href = '/login';
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div className={styles.NewPassword}>
      <label htmlFor="password">Password:</label>
      <input className={styles['password-input']} type="password" id="password" value={password} onChange={handlePasswordChange} />
      <br />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input className={styles['confirm-password-input']} type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      <br />
      <button className={styles['reset-password-button']} onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default NewPassword;