import { LEVEL_TYPE } from "helpers/level-type"
import { Question } from "helpers/quiz/quiz"

export interface DataState {
    levelType: LEVEL_TYPE
    quiz: Question[]
    questionNumber: number
    score: number
}

export enum ACTION {
    SET_LEVEL = "DATA/SET_LEVEL",
    SET_QUIZ = "DATA/SET_QUIZ",
    SET_SCORE = "DATA/SET_SCORE",
    INCREMENT_SCORE = "DATA/INCREMENT_SCORE",
    INCREMENT_QUESTION = "DATA/INCREMENT_QUESTION",
}

interface SetLevel {
    type: ACTION.SET_LEVEL
    level: LEVEL_TYPE
}

interface SetQuiz {
    type: ACTION.SET_QUIZ
    payload: Question[]
}

interface SetScore {
    type: ACTION.SET_SCORE
    score: number
    questionNumber: number
}

interface IncrementScore {
    type: ACTION.INCREMENT_SCORE
}

interface IncrementQuestion {
    type: ACTION.INCREMENT_QUESTION
}

export type Actions = SetLevel | SetQuiz | SetScore | IncrementQuestion | IncrementScore
