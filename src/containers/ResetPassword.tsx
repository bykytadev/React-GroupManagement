import axios from 'axios';
import { useState } from 'react';
import styles from 'styles/ResetPassword.module.scss';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleResetPassword = () => {
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    axios.get(`http://localhost:8080/api/v1/users/resetPasswordRequest?email=${email}`)
      .then(response => {
        setMessage('Reset password request sent successfully!');
      })
      .catch(error => {
        setMessage('Failed to send reset password request.');
      });
  };

  return (

      <div className={styles.ResetPassword}>
        <label htmlFor="email-label">Email reset password:</label>
        <input className={styles['email-input']} type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <button className={styles['reset-password-button']} onClick={handleResetPassword}>Reset Password</button>
        <p className={styles['message']}>{message}</p>
    </div>
  )
}
export default ResetPassword;