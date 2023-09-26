import axios from 'axios';
import { useState } from 'react';

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
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handleResetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
}

export default ResetPassword;
