import React, { useState } from 'react';
import axios from 'axios';
import styles from 'styles/Login.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim() === '') {
      alert('Please enter a username');
      return;
    }

    if (password.trim() === '') {
      alert('Please enter a password');
      return;
    }

    const storage = rememberMe ? localStorage : sessionStorage;

    axios.get(`http://localhost:8080/api/v1/login?username=${username}&password=${password}`)
      .then(response => {
        const loginData = {
          ...response.data,
          isRememberMe: rememberMe,
        };

        storage.setItem('loginData', JSON.stringify(loginData));
        storage.setItem('isRememberMe', JSON.stringify(rememberMe));
        navigate("/profile-management")
      })
      .catch(error => {
        alert('Login failed. Please check your username and password.');
        console.log(error);
      });
  };

  return (
    <div className={styles.Login}>
      <form onSubmit={handleSignInSubmit}>
        <div>
          <label htmlFor="username" className={styles.label}>Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} className={styles.input} />
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className={styles.input} />
        </div>
        <div className='checkbox-container'>
          <label htmlFor="rememberMe" className={styles.label}>Remember me</label>
          <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} className={styles.checkbox} />
        </div>
        <div>
          <button type="submit" className={styles.button}>Sign In</button>
          <p>
            <a href="http://localhost:3000/reset-password" className={styles.link}>Forgot password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}