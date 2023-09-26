import React, { useState } from 'react';
import { FormValues } from 'props/StyleProps';
import FormInput from 'components/FormInput';
import styles from 'styles/signup.module.scss';
import axios from 'axios';

const FormSignUp: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (name: keyof FormValues) => (value: string) => {
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  }

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, userName, email, password, confirmPassword } = formValues;
    if (!firstName || !lastName || !userName || !email || !password || !confirmPassword) {
      alert('Please fill out all fields');
      return;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email');
      return;
    }
    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters and include at least one number');
      return;
    }
    if (!validateConfirmPassword(password, confirmPassword)) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users', formValues);
      console.log(response);
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleResendEmail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/userRegistrationConfirmRequest?email=${formValues.email}`);
      console.log(response);
      alert('Email resent successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to resend email');
    }
  }

  return (
    <div className={styles.root}>
      {isSubmitted ? (
        <div>
          <h3>You need to confirm your account</h3>
          <p>We have sent an email to {formValues.email}</p>
          <p>Please check your email to activate your account.</p>
          <button onClick={handleResendEmail}>Resend Email</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Registration Info</h3>
          <FormInput label="First Name" value={formValues.firstName} onChange={handleChange('firstName')} />
          <FormInput label="Last Name" value={formValues.lastName} onChange={handleChange('lastName')} />
          <FormInput label="User Name" value={formValues.userName} onChange={handleChange('userName')} />
          <FormInput label="Email" value={formValues.email} onChange={handleChange('email')} />
          <FormInput label="Password" value={formValues.password} onChange={handleChange('password')} />
          <FormInput label="Confirm Password" value={formValues.confirmPassword} onChange={handleChange('confirmPassword')} />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
}

export default FormSignUp;

// FormSignUp.scss
/* styles for form */