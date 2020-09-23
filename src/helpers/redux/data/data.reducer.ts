import { LEVEL_TYPE } from "helpers/level-type"
import { Reducer } from "redux"
import { DataState, Actions, ACTION } from "./data.types"

const defaultState: DataState = {
    levelType: LEVEL_TYPE.EASY,
    quiz: [],
}

export const dataReducer: Reducer<DataState, Actions> = (
    state = defaultState,
    action,
) => {
    switch (action.type) {
        case ACTION.SET_LEVEL: {
            return {
                ...state,
                levelType: action.level,
            }
        }
        case ACTION.SET_QUIZ: {
            return {
                ...state,
                quiz: action.payload,
            }
        }
        default:
            return state
    }
}
