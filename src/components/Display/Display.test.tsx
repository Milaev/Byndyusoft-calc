import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './Display';

describe('Display component', () => {
  test('Компонент рендерит переданное значение инпута', () => {
    const input = '123';
    const result = '456';
    render(<Display input={input} result={result} />);
    
    const inputElement = screen.getByText(input);
    expect(inputElement).toBeInTheDocument();
  });

  test('Компонент рендерит переданное значение резалт', () => {
    const input = '123';
    const result = '456';
    render(<Display input={input} result={result} />);
    
    const resultElement = screen.getByText(result);
    expect(resultElement).toBeInTheDocument();
  });

  test('Применяются правильные классы для инпута и резалта', () => {
    const input = '123';
    const result = '456';
    render(<Display input={input} result={result} />);
    
    const inputElement = screen.getByText(input);
    const resultElement = screen.getByText(result);
    
    expect(inputElement).toHaveClass('input');
    expect(resultElement).toHaveClass('result');
  });
});
