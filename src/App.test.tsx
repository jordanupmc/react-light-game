import React from 'react';
import { findAllByTestId, findByTestId, render, screen } from '@testing-library/react';
import App from './App';


describe("React Light Game", () => {
  it('should render 4 traffic lights', async () => {
    const { container, findAllByTestId } = render(<App />);

    const trafficLight1 = await findAllByTestId("tf1");
    const trafficLight2 = await findAllByTestId("tf2");
    const trafficLight3 = await findAllByTestId("tf3");
    const trafficLight4 = await findAllByTestId("tf4");

    expect(trafficLight1).toHaveLength(4);
    expect(trafficLight2).toHaveLength(4);
    expect(trafficLight3).toHaveLength(4);
    expect(trafficLight4).toHaveLength(4);
  })
});
