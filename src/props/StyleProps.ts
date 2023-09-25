import { ChangeEvent } from "react";

export interface FormErrors {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface InputSignupProps {
  title: string;
  inputType: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

//------------------Login------------------//
export interface SignUpProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

