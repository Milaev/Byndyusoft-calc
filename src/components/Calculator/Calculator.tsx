import React, { useCallback, useEffect, useState } from 'react';
import ButtonList from '../ButtonList/ButtonList';
import Display from '../Display/Display';
import styles from './Calculator.module.css'
import calculate from './utils';

const SIGNS = [
  'C', '√', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '00', '0', '.', '='
];

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const formatResult = (num: number): string => {
    if (Number.isInteger(num)) {
      return num.toString();
    }
    return num.toFixed(2).toString();
  }

  const handleButtonClick = useCallback((value: string) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        const result = calculate(input);
        if (!isFinite(result)) {
          throw new Error('Math Error');
        }
        setResult(formatResult(result));
      } catch {
        setResult('Error');
      }
    } else if (value === '√') {
      try {
        const number = parseFloat(input);
        if (number < 0) {
          throw new Error('Math Error');
        }
        const result = Math.sqrt(number);
        setResult(formatResult(result))
      } catch {
        setResult('Error');
      }
    } else {
      setInput(prevInput => prevInput + value);
    }
  }, [input, setInput, setResult]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    if (key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleButtonClick('=');
    } else if (key === 'Escape') {
      handleButtonClick('C');
    } else if (SIGNS.includes(key) || !isNaN(Number(key))) {
      setInput(prevInput => prevInput + key);
    }
  }, [handleButtonClick, setInput]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
   
  return (
    <div className={styles.calculator}>
      <Display
        input={input}
        result={result}
      />
      <ButtonList
        buttons={SIGNS}
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default Calculator;
