import { SignUpProps } from 'props/StyleProps';
import React from 'react';

const FormInput: React.FC<SignUpProps> = ({ label, value, onChange }) => {

  return (
    <div>
      <label>{label}</label>
      <input 
        value={value}
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
}

export default FormInput;