import React from 'react';
import Button from '../Button/Button';
import styles from './ButtonList.module.css';

interface ButtonListProps {
  buttons: string[];
  onClick: (value: string) => void;
}

const ButtonList: React.FC<ButtonListProps> = ({ buttons, onClick }) => {
  
  return (
    <div className={styles.buttonList}>
      {buttons.map((button) => (
        <Button key={button} value={button} onClick={onClick} />
      ))}
    </div>
  );
};

export default ButtonList;
