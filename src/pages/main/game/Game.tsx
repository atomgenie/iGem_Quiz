import { LEVEL_TYPE } from "helpers/level-type"
import {
    Question,
    quiz,
    mapDifficultyToLevelType,
    MAX_QUIZ_SIZE,
} from "helpers/quiz/quiz"
import { StoreType } from "helpers/redux/store"
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setQuiz } from "helpers/redux/data/data.actions"

import styles from "./Game.module.scss"
import { Button } from "assets"
import { useSpring, a, useSprings } from "react-spring"

export default () => {
    const difficulty = useSelector<StoreType, LEVEL_TYPE>(store => store.data.levelType)
    const quizList = useSelector<StoreType, Question[]>(store => store.data.quiz)

    const reduxDispatch = useDispatch()

    useEffect(() => {
        if (quizList.length === 0) {
            const selectedQuiz = quiz
                .filter(elm => mapDifficultyToLevelType[elm.difficulty] === difficulty)
                .sort(() => Math.random() * 2 - 1)
                .slice(0, MAX_QUIZ_SIZE)

            reduxDispatch(setQuiz(selectedQuiz))
        }
    }, [difficulty, quizList, reduxDispatch])

    const [pos /*, setPos*/] = useState(0)

    const [panelAnim, setPanel] = useSpring(() => ({ left: "100%" }))

    const enterPanel = useCallback(async () => {
        setPanel({ left: "0%" })
    }, [setPanel])

    // const outPanel = useCallback(async () => {
    //     setPanel({ left: "-100%" })
    // }, [setPanel])

    const actualQuestion: Question | undefined = quizList[pos] as Question | undefined

    const isYesNo =
        actualQuestion &&
        ((actualQuestion.options[0] === "Yes" && actualQuestion.options[1] === "No") ||
            (actualQuestion.options[1] === "Yes" && actualQuestion.options[0] === "No"))

    const [animOptions, setAnimOptions] = useSprings(20, () => ({ bottom: -500 }))

    const enterOptions = useCallback(async () => {
        setAnimOptions(() => ({ bottom: 0 }))
    }, [setAnimOptions])

    // const outOptions = useCallback(async () => {
    //     setAnimOptions(() => ({ bottom: -500 }))
    // }, [setAnimOptions])

    useEffect(() => {
        enterPanel()
        enterOptions()
    }, [enterPanel, enterOptions])

    if (!actualQuestion) {
        return <div></div>
    }

    return (
        <div className={styles.root}>
            <a.div className={styles.card} style={panelAnim}>
                <div className={styles.title}>Question {pos + 1}</div>
                <div className={styles.questionTitle}>{actualQuestion.question}</div>
            </a.div>
            <div className={styles.solutionList}>
                {isYesNo && (
                    <div className={styles.doubleOption}>
                        <div className={styles.option1}>
                            <Button
                                className={styles.buttonOption}
                                startColor="#FDFE40"
                                endColor="#FFC400"
                                borderColor="#E18900"
                                shadow="rgba(253, 254, 64, 0.5)"
                            >
                                Yes
                            </Button>
                        </div>
                        <div className={styles.option2}>
                            <Button
                                className={styles.buttonOption}
                                startColor="#E52528"
                                endColor="#BF1C2B"
                                borderColor="#890406"
                                shadow="rgba(229, 37, 40, 0.5)"
                            >
                                No
                            </Button>
                        </div>
                    </div>
                )}
                {!isYesNo && (
                    <div className={styles.listOptions}>
                        {actualQuestion.options.map((option, i) => (
                            <a.div
                                style={animOptions[i]}
                                className={styles.optionOne}
                                key={option}
                            >
                                <Button
                                    className={styles.buttonOptionOne}
                                    startColor="#199FEF"
                                    endColor="#116699"
                                    borderColor="#0B4568"
                                    shadow="rgba(17, 102, 153, 0.5)"
                                >
                                    {option}
                                </Button>
                            </a.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
