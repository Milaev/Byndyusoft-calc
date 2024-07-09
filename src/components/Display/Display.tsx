import React from 'react';
import styles from './Display.module.css'

interface DisplayProps {
  input: string;
  result: string;
}

const Display: React.FC<DisplayProps> = ({ input, result }) => {
  return (
    <div className={styles.display}>
      <div className={styles.input}>{input}</div>
      <div className={styles.result}>{result}</div>
    </div>
  );
};

export default Display;
