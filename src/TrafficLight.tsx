import React from 'react';

export const TrafficLight = () => {
  return (
    <div className="TrafficLight">
      <div data-testid="tf1" className="TrafficLight-light"></div>
      <div data-testid="tf2" className="TrafficLight-light"></div>
      <div data-testid="tf3" className="TrafficLight-light"></div>
      <div data-testid="tf4" className="TrafficLight-light"></div>
    </div>
  );

};