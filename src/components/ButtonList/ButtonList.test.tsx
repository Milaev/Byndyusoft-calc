import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonList from './ButtonList';


describe('ButtonList component', () => {
  const buttons = ['1', '2', '3', '='];
  const onClickMock = jest.fn();

  test('Компонент рендерит правильное количество кнопок', () => {
		render(<ButtonList buttons={buttons} onClick={onClickMock} />);

    const buttonElements = screen.getAllByRole('button');
    expect(buttonElements).toHaveLength(buttons.length);
  });

  test('Кнопки содержат правильные значения', () => {
		render(<ButtonList buttons={buttons} onClick={onClickMock} />);

    buttons.forEach((button) => {
      const buttonElement = screen.getByText(button);
      expect(buttonElement).toBeInTheDocument();
    });
  });

  test('Обработчик онклик вызывается с правильными аргументами при нажатии на кнопки', () => {
    render(<ButtonList buttons={buttons} onClick={onClickMock} />);
		
		buttons.forEach((button) => {
      const buttonElement = screen.getByText(button);
      fireEvent.click(buttonElement);
      expect(onClickMock).toHaveBeenCalledWith(button);
    });
    expect(onClickMock).toHaveBeenCalledTimes(buttons.length);
  });
});
