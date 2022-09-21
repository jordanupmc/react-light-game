import React, { useEffect } from 'react';
import { LightColor, ReactLightState } from './reducer';


interface PropsType {
  id: number;
  lightOnNextTrafficLightCallBack?: () => void;
  waitBeforeStart?: () => void;
  state: ReactLightState;
}

export const TrafficLight = ({ id, state, lightOnNextTrafficLightCallBack, waitBeforeStart }: PropsType) => {
  const currentColor = state.trafficLights[id - 1];
  useEffect(() => {
    if (lightOnNextTrafficLightCallBack !== undefined && currentColor === LightColor.RED) {
      lightOnNextTrafficLightCallBack();
      return;
    }
    if (waitBeforeStart !== undefined && currentColor === LightColor.RED) {
      waitBeforeStart();
      return;
    }
  }, [currentColor, lightOnNextTrafficLightCallBack, waitBeforeStart]);

  return (
    <div className="TrafficLight">
      <div data-testid={`tf${id}-1`} className="TrafficLight-light TrafficLight-light-off"></div>
      <div data-testid={`tf${id}-2`} className="TrafficLight-light TrafficLight-light-off"></div>
      <div data-testid={`tf${id}-3`} className="TrafficLight-light TrafficLight-light-off"></div>
      <div data-testid={`tf${id}-4`} className={`TrafficLight-light TrafficLight-light-${currentColor === LightColor.RED ? 'on' : 'off'}`}></div>
    </div>
  );

};