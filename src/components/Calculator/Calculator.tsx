import React, { useState } from 'react';
import ButtonList from '../ButtonList/ButtonList';
import Display from '../Display/Display';
import { evaluate } from 'mathjs';
import styles from './Calculator.module.css'

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

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        const evaluatedResult = evaluate(input);
        setResult(evaluatedResult.toString());
      } catch {
        setResult('Error');
      }
    } else if (value === '√') {
      try {
        const evaluatedResult = Math.sqrt(evaluate(input)).toString();
        setResult(evaluatedResult);
      } catch {
        setResult('Error');
      }
    } else {
      setInput(prevInput => prevInput + value);
    }
  };

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
