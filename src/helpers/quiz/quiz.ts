import { LEVEL_TYPE } from "helpers/level-type"
import { rawQuiz } from "./quiz-raw"

export const MAX_QUIZ_SIZE = 20

export interface Question {
    question: string
    options: string[]
    corrects: string[]
    isOr: boolean
    difficulty: "Easy" | "Medium" | "Hard"
    explanation: string
}

const quizList: Question[] = JSON.parse(atob(rawQuiz))

export const quiz = quizList.map(
    (quizElm): Question => ({
        ...quizElm,
        options: quizElm.options.map(option => option.trim()),
        corrects: quizElm.corrects.map(correct => correct.trim()),
    }),
)

export const mapDifficultyToLevelType = {
    Easy: LEVEL_TYPE.EASY,
    Medium: LEVEL_TYPE.MEDIUM,
    Hard: LEVEL_TYPE.HARD,
}
