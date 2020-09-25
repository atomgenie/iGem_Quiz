import { LEVEL_TYPE } from "helpers/level-type"
import { Question } from "helpers/quiz/quiz"

import { ACTION, Actions, DataState } from "./data.types"

export const setLevel = (level: LEVEL_TYPE): Actions => ({
    type: ACTION.SET_LEVEL,
    level,
})

export const setQuiz = (quiz: Question[]): Actions => ({
    type: ACTION.SET_QUIZ,
    payload: quiz,
})

export const setScore = (questionNumber: number, score: number): Actions => ({
    type: ACTION.SET_SCORE,
    questionNumber,
    score,
})

export const incrementScore = (): Actions => ({
    type: ACTION.INCREMENT_SCORE,
})

export const incrementQuestion = (): Actions => ({
    type: ACTION.INCREMENT_QUESTION,
})

export const resetQuiz = (): Actions => ({
    type: ACTION.RESET_QUIZ,
})

export const setFullQuiz = (payload: DataState): Actions => ({
    type: ACTION.SET_FULL_QUIZ,
    payload,
})
