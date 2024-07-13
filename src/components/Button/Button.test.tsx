import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

describe('Button component', () => {
  test('Кнопка рендерится с корректным велью', () => {
    render(<Button value="1" onClick={() => {}} />);

    const buttonElement = screen.getByText('1');
    expect(buttonElement).toBeInTheDocument();
  });

  test('Добавляется класс whiteBackground к кнопке с велью =', () => {
    render(<Button value="=" onClick={() => {}} />);

    const buttonElement = screen.getByText('=');
    expect(buttonElement).toHaveClass('button');
    expect(buttonElement).toHaveClass('whiteBackground');
  });

  test('Класс whiteBackground не добавляется к другим кнопкам', () => {
    render(<Button value="1" onClick={() => {}} />);

    const buttonElement = screen.getByText('1');
    expect(buttonElement).toHaveClass('button');
    expect(buttonElement).not.toHaveClass('whiteBackground');
  });

  test('Вызов обработчика онклик с корректным значением', () => {
    const onClickMock = jest.fn();
    render(<Button value="1" onClick={onClickMock} />);

    const buttonElement = screen.getByText('1');
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith('1');
  });
});
