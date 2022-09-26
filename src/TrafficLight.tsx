import React, { useEffect, useMemo } from 'react';
import { LightColor, ReactLightState } from './reducer';
import SoundPlayer from './SoundPlayer';

interface PropsType {
  id: number;
  lightOnNextTrafficLightCallBack?: () => void;
  waitBeforeStart?: () => void;
  state: ReactLightState;
}

export const TrafficLight = ({ id, state, lightOnNextTrafficLightCallBack, waitBeforeStart }: PropsType) => {
  const currentColor = state.trafficLights[id - 1];
  const soundPlayer = useMemo(() => new SoundPlayer(), []);

  useEffect(() => {
    if (lightOnNextTrafficLightCallBack && currentColor === LightColor.RED) {
      soundPlayer.play();
      lightOnNextTrafficLightCallBack();
      return;
    }
    if (waitBeforeStart && currentColor === LightColor.RED) {
      soundPlayer.play();
      waitBeforeStart();
      return;
    }
  }, [currentColor, soundPlayer, lightOnNextTrafficLightCallBack, waitBeforeStart]);


  return (
    <div className="TrafficLight">
      <div data-testid={`tf${id}-1`} className="TrafficLight-light TrafficLight-light-off"></div>
      <div data-testid={`tf${id}-2`} className="TrafficLight-light TrafficLight-light-off"></div>
      <div data-testid={`tf${id}-3`} className="TrafficLight-light TrafficLight-light-off"></div>
      <div data-testid={`tf${id}-4`} className={`TrafficLight-light TrafficLight-light-${currentColor === LightColor.RED ? 'on' : 'off'}`}></div>
    </div>
  );

};