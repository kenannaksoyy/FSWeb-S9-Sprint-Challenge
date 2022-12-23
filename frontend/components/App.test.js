import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AppFunctional from './AppFunctional';


test('Sol Kontrol', async () => {
  render(<AppFunctional/>);
  fireEvent.click(screen.getByTestId("sol-button"));
  fireEvent.click(screen.getByTestId("sol-button"));
  expect(screen.getByText("Sol yone dogru gidemezsin")).toBeInTheDocument();
});

test('Sag Kontrol', async () => {
  render(<AppFunctional/>);
  fireEvent.click(screen.getByTestId("sag-button"));
  fireEvent.click(screen.getByTestId("sag-button"));
  expect(screen.getByText("Sag yone dogru gidemezsin")).toBeInTheDocument();
});

test('Yukari Kontrol', async () => {
  render(<AppFunctional/>);
  fireEvent.click(screen.getByTestId("yukari-button"));
  fireEvent.click(screen.getByTestId("yukari-button"));
  expect(screen.getByText("Yukari yone dogru gidemezsin")).toBeInTheDocument();
});

test('Asagi Kontrol', async () => {
  render(<AppFunctional/>);
  fireEvent.click(screen.getByTestId("asagi-button"));
  fireEvent.click(screen.getByTestId("asagi-button"));
  expect(screen.getByText("Asagi yone dogru gidemezsin")).toBeInTheDocument();
});

test('Step ve Kordinat Kontrol', async () => {
  render(<AppFunctional/>);
  let komutlar=["yukari","asagi","asagi","sol","sag","sag"];
  komutlar.forEach(komut => {
    fireEvent.click(screen.getByTestId(`${komut}-button`));
  });
  expect(screen.getByText("6 kere ilerlediniz")).toBeInTheDocument();
  expect(screen.getByText("Kordinatlar (3,3)")).toBeInTheDocument();
});