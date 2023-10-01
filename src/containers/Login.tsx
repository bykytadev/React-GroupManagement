import React, { useState } from 'react';
import axios from 'axios';
import styles from 'styles/Login.module.scss';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

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
  
    const loginDataString = storage.getItem('loginData');
    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      const { firstName, isRememberMe, role, status, userName, email, lastName, token } = loginData;
      console.log(firstName, isRememberMe, role, status, userName, email, lastName, token);
    }
    axios.get(`http://localhost:8080/api/v1/login?username=${username}&password=${password}`)
      .then(response => {
        console.log(response);
        const { firstName, lastName, role, status, userName, email, token } = response.data;
        const loginData = {
          isRememberMe: rememberMe,
          token,
          firstName,
          lastName,
          role,
          status,
          userName,
          email,
        };
        
        storage.setItem('loginData', JSON.stringify(loginData));
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
        <div>
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