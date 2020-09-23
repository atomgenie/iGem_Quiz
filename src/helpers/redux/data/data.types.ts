import { LEVEL_TYPE } from "helpers/level-type"
import { Question } from "helpers/quiz/quiz"

export interface DataState {
    levelType: LEVEL_TYPE
    quiz: Question[]
}

export enum ACTION {
    SET_LEVEL = "DATA/SET_LEVEL",
    SET_QUIZ = "DATA/SET_QUIZ",
}

interface SetLevel {
    type: ACTION.SET_LEVEL
    level: LEVEL_TYPE
}

interface SetQuiz {
    type: ACTION.SET_QUIZ
    payload: Question[]
}

export type Actions = SetLevel | SetQuiz
