import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
}

const Button: React.FC<ButtonProps> = ({ value, onClick }) => {
  let buttonClass = styles.button;

  if (value === '=') {
    buttonClass = `${buttonClass} ${styles.whiteBackground}`;
  }
  
  return (
    <button onClick={() => onClick(value)} className={buttonClass}>
      {value}
    </button>
  );
};

export default Button;
