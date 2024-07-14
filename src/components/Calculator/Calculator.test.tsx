import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calculator from './Calculator';

describe('Calculator Component', () => {
  test('Кальк рендерится корректно со всеми кнопками', () => {
    render(<Calculator />);
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  test('проверка выполнения операций при клике по кнопкам', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByText(/1\+2/)).toBeInTheDocument();
    expect(screen.getByText('3', { selector: '.result' })).toBeInTheDocument();
  });

  test('Проверка кнопки очистки', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('C'));

    expect(screen.getByText('', { selector: '.input' })).toBeInTheDocument();
    expect(screen.getByText('', { selector: '.result' })).toBeInTheDocument();
  });

  test('проверка кнопки квадратного корня', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('√'));

    expect(screen.getByText('3', { selector: '.result' })).toBeInTheDocument();
  });

  test('проверка ручного ввода с клавиатуры', () => {
    render(<Calculator />);

    fireEvent.keyDown(document, { key: '1' });
    fireEvent.keyDown(document, { key: '+' });
    fireEvent.keyDown(document, { key: '2' });
    fireEvent.keyDown(document, { key: 'Enter' });

    expect(screen.getByText(/1\+2/)).toBeInTheDocument();
    expect(screen.getByText('3', { selector: '.result' })).toBeInTheDocument();
  });

  test('проверка ошибки при делении на ноль', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByText('Error', { selector: '.result' })).toBeInTheDocument();
  });
});
