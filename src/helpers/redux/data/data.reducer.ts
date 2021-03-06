import { LEVEL_TYPE } from "helpers/level-type"
import { Reducer } from "redux"
import { DataState, Actions, ACTION } from "./data.types"

const defaultState: DataState = {
    levelType: LEVEL_TYPE.EASY,
    quiz: [],
    questionNumber: 0,
    score: 0,
    online: {
        active: false,
    },
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
        case ACTION.SET_SCORE: {
            return {
                ...state,
                questionNumber: action.questionNumber,
                score: action.score,
            }
        }
        case ACTION.INCREMENT_QUESTION: {
            return {
                ...state,
                questionNumber: state.questionNumber + 1,
            }
        }
        case ACTION.INCREMENT_SCORE: {
            return {
                ...state,
                score: state.score + 1,
            }
        }
        case ACTION.RESET_QUIZ: {
            return defaultState
        }
        case ACTION.SET_FULL_QUIZ: {
            return action.payload
        }
        case ACTION.SET_ONLINE: {
            return {
                ...state,
                online: {
                    active: true,
                    nickname: action.nickname,
                    roomId: action.roomId,
                },
            }
        }
        case ACTION.SET_USER_ID: {
            return {
                ...state,
                userId: action.userId,
            }
        }
        default:
            return state
    }
}
