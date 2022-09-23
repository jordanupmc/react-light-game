
import React, { useCallback, useReducer } from 'react';
import { initialState, ReactLightAction, ReactLightState, reducer } from './reducer';
import { TrafficLight } from './TrafficLight';

export interface ReactLightProps {
     lightOnDelay?: number;
     lightOffWait?: number;
}

const MAX_WAIT_FOR_LIGHT_OFF = 8500;
const LIGHT_DELAY = 950;

export const ReactLight = ({ lightOffWait, lightOnDelay }: ReactLightProps) => {
     const [state, dispatch] = useReducer(reducer, initialState);
     const waitCallback1 = useCallback(() => waitThenLightOn(dispatch, 1, lightOnDelay), [lightOnDelay]);
     const waitCallback2 = useCallback(() => waitThenLightOn(dispatch, 2, lightOnDelay), [lightOnDelay]);
     const waitCallback3 = useCallback(() => waitThenLightOn(dispatch, 3, lightOnDelay), [lightOnDelay]);

     const waitCallback4 = useCallback(() => waitThenLightOff(dispatch, lightOffWait), [lightOffWait]);

     return (
          <>
               <div className="ReactLight" data-testid="ReactLightDiv" onClick={() => handlClick(state, dispatch, 0)}>
                    <TrafficLight id={1} state={state} lightOnNextTrafficLightCallBack={waitCallback1} />
                    <TrafficLight id={2} state={state} lightOnNextTrafficLightCallBack={waitCallback2} />
                    <TrafficLight id={3} state={state} lightOnNextTrafficLightCallBack={waitCallback3} />
                    <TrafficLight id={4} state={state} waitBeforeStart={waitCallback4} />
               </div>
               {state.gameState === 'WAITING' && <h2 data-testid="WaitingDisplay">Click to play then click again when light are off</h2>}
               {state.gameState === 'GAME_OVER' && <h2 data-testid="ReactionTimeDisplay">Reaction time : {state.clickReactionTime}</h2>}
               {state.gameState === 'FALSE_START' && <h2 data-testid="FalseStartDisplay">FALSE START !</h2>}
          </>
     );
};

const handlClick = (state: ReactLightState, dispatch: React.Dispatch<ReactLightAction>, lightOnDelay: number | undefined): void => {
     switch (state.gameState) {
          case "WAITING":
               waitThenLightOn(dispatch, 0, lightOnDelay);
               break;
          case "START_RACE":
               startRace(dispatch, state.startTime);
               break;
          case "COUNT_START":
               dispatch({ type: 'FALSE_START' });
               break;
          case "GAME_OVER":
          case "FALSE_START":
               dispatch({ type: 'REPLAY_GAME' })
               break;
     }
}

const waitThenLightOff = (dispatch: React.Dispatch<ReactLightAction>, lightOffWait: number | undefined) => {
     const timeout = lightOffWait ? lightOffWait : getRandomNumber(MAX_WAIT_FOR_LIGHT_OFF);
     setTimeout(() => { dispatch({ type: 'LIGHT_OFF_ALL_TRAFFIC_LIGHT', payload: Date.now() }); }, timeout);
}
const waitThenLightOn = (dispatch: React.Dispatch<ReactLightAction>, trafficLightNumber: number, lightOnDelay: number | undefined) => {
     const timeout = lightOnDelay ? lightOnDelay : LIGHT_DELAY;
     setTimeout(() => dispatch({ type: 'LIGHT_ON_SINGLE_TRAFFIC_LIGHT', payload: trafficLightNumber }), timeout);
}

const getRandomNumber = (limit: number): number => {
     const array = new Uint32Array(1);
     window.crypto.getRandomValues(array);

     return Math.abs(array[0]) % limit;
}

const startRace = (dispatch: React.Dispatch<ReactLightAction>, startTime: number): void => {
     const timeClick = Date.now();
     dispatch({ type: 'GOOD_START', payload: (timeClick - startTime) / 1000 });
}