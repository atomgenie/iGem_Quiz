import { LEVEL_TYPE } from "helpers/level-type"
import { MAX_QUIZ_SIZE, mapDifficultyToLevelType, quiz, Question } from "./quiz"

export enum RESPONSE_STATE {
    ERROR,
    INVALID,
    VALID,
    INCOMPLETE, // If the answer is composed by multiple response
}

class QuizHelper {
    public generateQuiz(difficulty: LEVEL_TYPE) {
        return quiz
            .filter(elm => mapDifficultyToLevelType[elm.difficulty] === difficulty)
            .sort(() => Math.random() * 2 - 1)
            .map(elm => ({
                ...elm,
                options: elm.options.sort(() => Math.random() * 2 - 1),
            }))
            .slice(0, MAX_QUIZ_SIZE)
    }

    public getIndexOfValidsResponses(question: Question): number[] {
        return question.options
            .map(option => question.corrects.some(correct => correct === option))
            .reduce((prev, curr, index): number[] => {
                return curr ? [...prev, index] : prev
            }, [] as number[])
    }

    public getResponseState(question: Question, responses: string[]): RESPONSE_STATE {
        if (responses.length === 0) {
            return RESPONSE_STATE.ERROR
        }

        if (question.isOr) {
            return question.corrects.some(correct => correct === responses[0])
                ? RESPONSE_STATE.VALID
                : RESPONSE_STATE.INVALID
        }

        const correctLength = question.corrects.length
        const validRsponses = responses.map(response =>
            question.corrects.some(correct => correct === response),
        )

        if (validRsponses.some(response => !response)) {
            return RESPONSE_STATE.INVALID
        }

        return correctLength === validRsponses.length
            ? RESPONSE_STATE.VALID
            : RESPONSE_STATE.INCOMPLETE
    }
}

export const quizHelper = new QuizHelper()
