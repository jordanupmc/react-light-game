export enum LightColor {
    RED,
    BLACK,
}

export interface ReactLightState {
    trafficLights: LightColor[];
    gameState: GameState;
    startTime: number;
    clickReactionTime: number;
}

export type GameState =
    | "START_RACE"
    | "FALSE_START"
    | "GAME_OVER"
    | "COUNT_START"
    | "WAITING"

export type ReactLightActionType =
    | "LIGHT_ON_SINGLE_TRAFFIC_LIGHT"
    | "LIGHT_OFF_ALL_TRAFFIC_LIGHT"
    | "GOOD_START"
    | "FALSE_START"

export interface ReactLightAction {
    type: ReactLightActionType;
    payload?: any;
}

export const initialState: ReactLightState = {
    trafficLights: [LightColor.BLACK, LightColor.BLACK, LightColor.BLACK, LightColor.BLACK],
    clickReactionTime: -1,
    startTime: -1,
    gameState: "WAITING"
}

export const reducer: ((arg0: ReactLightState, arg1: ReactLightAction) => ReactLightState) = (state, action) => {
    switch (action.type) {
        case "LIGHT_ON_SINGLE_TRAFFIC_LIGHT":
            if(state.gameState === "FALSE_START") return {...state};
            const lightNumber: number = action.payload;
            const newLights = [...state.trafficLights];
            newLights[lightNumber] = LightColor.RED;
            return { ...state, trafficLights: newLights, gameState: "COUNT_START" };
        case "LIGHT_OFF_ALL_TRAFFIC_LIGHT":
            return { ...state, trafficLights: [LightColor.BLACK, LightColor.BLACK, LightColor.BLACK, LightColor.BLACK], gameState: 'START_RACE', startTime: Date.now() };
        case "GOOD_START":
            return { ...state, clickReactionTime: action.payload, gameState: 'GAME_OVER' };
        case "FALSE_START":
            return { ...state, gameState: 'FALSE_START'};
        default:
            throw new Error("Unkown action type " + action.type);
    }
}