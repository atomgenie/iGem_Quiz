import { LEVEL_TYPE } from "helpers/level-type"
import { Question } from "helpers/quiz/quiz"

import { ACTION, Actions } from "./data.types"

export const setLevel = (level: LEVEL_TYPE): Actions => ({
    type: ACTION.SET_LEVEL,
    level,
})

export const setQuiz = (quiz: Question[]): Actions => ({
    type: ACTION.SET_QUIZ,
    payload: quiz,
})
