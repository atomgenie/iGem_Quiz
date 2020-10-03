import { LEVEL_TYPE } from "helpers/level-type"
import { Question } from "helpers/quiz/quiz"
import { StoreType } from "helpers/redux/store"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    setQuiz,
    incrementQuestion,
    incrementScore,
} from "helpers/redux/data/data.actions"

import Win from "./Win"

import styles from "./Game.module.scss"
import { Button } from "assets"
import { useSpring, a, useSprings } from "react-spring"
import { quizHelper, RESPONSE_STATE } from "helpers/quiz/quiz-hepler"

interface props {
    restartGame: () => void
}

const Game: React.FC<props> = ({ restartGame }) => {
    const difficulty = useSelector<StoreType, LEVEL_TYPE>(store => store.data.levelType)
    const quizList = useSelector<StoreType, Question[]>(store => store.data.quiz)

    const [allowInteraction, setAllowInteraction] = useState<boolean>(true)

    const reduxDispatch = useDispatch()

    useEffect(() => {
        if (quizList.length === 0) {
            const selectedQuiz = quizHelper.generateQuiz(difficulty)

            reduxDispatch(setQuiz(selectedQuiz))
        }
    }, [difficulty, quizList, reduxDispatch])

    const questionNumber = useSelector<StoreType, number>(
        store => store.data.questionNumber,
    )

    const [pos, setPos] = useState(questionNumber)

    const [panelAnim, setPanel] = useSpring(() => ({ left: 400, opacity: 0 }))

    const enterPanel = useCallback(async () => {
        await setPanel({ left: 0, opacity: 1 })
    }, [setPanel])

    const outPanel = useCallback(async () => {
        await setPanel({ left: -400, opacity: 0 })
    }, [setPanel])

    const actualQuestion: Question | undefined = quizList[pos] as Question | undefined

    const [animOptions, setAnimOptions] = useSprings(20, () => ({
        bottom: -500,
        left: 0,
        opacity: 0,
    }))

    const enterOptions = useCallback(async () => {
        await setAnimOptions(() => ({ bottom: 0, left: 0, opacity: 1 }))
    }, [setAnimOptions])

    const outOptions = useCallback(async () => {
        await setAnimOptions(() => ({ bottom: -500, left: 0, opacity: 0 }))
    }, [setAnimOptions])

    useEffect(() => {
        enterPanel()
        enterOptions()
    }, [enterPanel, enterOptions])

    const [clickeds, setClickeds] = useState<string[]>([])

    const [showValid, setShowValid] = useState<boolean>(false)

    const [explanationSpring, setExplanantionSpring] = useSpring(() => ({
        opacity: 0,
        left: 500,
    }))

    const [nextSpring, setNextSpring] = useSpring(() => ({
        opacity: 0,
        bottom: -400,
        display: "none",
    }))

    const inExplanation = async () => {
        await Promise.all([
            setNextSpring({ display: "block", immediate: true }),
            setExplanantionSpring({ left: 500, immediate: true }),
        ])
        await Promise.all([
            setExplanantionSpring({ opacity: 1, left: 15 }),
            setNextSpring({ opacity: 1, bottom: 40 }),
        ])
    }

    const outExplanation = async () => {
        await Promise.all([
            setExplanantionSpring({ opacity: 0, left: -500 }),
            setNextSpring({ opacity: 0, bottom: -400 }),
        ])
        await setNextSpring({ display: "none", immediate: true })
    }

    const handleShowValid = async () => {
        reduxDispatch(incrementQuestion())
        setAllowInteraction(false)

        setShowValid(true)
        await new Promise(res => setTimeout(res, 1500))
        await Promise.all([outOptions(), outPanel()])

        if (actualQuestion?.explanation) {
            await inExplanation()
        } else {
            await handleNextQuestion()
        }
    }

    const handleNextQuestion = async () => {
        setPos(pos + 1)
        setShowValid(false)
        setClickeds([])
        await Promise.all([
            setAnimOptions(() => ({
                bottom: -500,
                left: 0,
                opacity: 0,
                immediate: true,
            })),
            setPanel({
                left: 400,
                opacity: 0,
                immediate: true,
            }),
        ])

        await Promise.all([enterOptions(), enterPanel()])

        setAllowInteraction(true)
    }

    const handleWrongAnswer = async () => {
        handleShowValid()
    }

    const handleClick = (value: string) => {
        if (!allowInteraction) {
            return
        }

        if (!actualQuestion) {
            return
        }

        if (clickeds.some(clicks => clicks === value)) {
            return
        }

        const newClicks = [...clickeds, value]
        const responseState = quizHelper.getResponseState(actualQuestion, newClicks)

        if (responseState === RESPONSE_STATE.VALID) {
            reduxDispatch(incrementScore())
            handleShowValid()
            return
        }

        if (responseState === RESPONSE_STATE.INCOMPLETE) {
            setClickeds(newClicks)
            return
        }

        if (responseState === RESPONSE_STATE.INVALID) {
            setClickeds(newClicks)
            handleWrongAnswer()
            return
        }
    }

    const mutilpleAnswers = useMemo(() => (actualQuestion?.corrects.length || 0) > 1, [
        actualQuestion,
    ])

    const [transitionHint, setTransitionHint] = useSpring(() => ({
        opacity: 0,
    }))

    useEffect(() => {
        if (mutilpleAnswers && !showValid) {
            setTransitionHint({
                opacity: 1,
            })
        } else {
            setTransitionHint({
                opacity: 0,
            })
        }
    }, [mutilpleAnswers, setTransitionHint, showValid])

    if (!actualQuestion) {
        if (pos !== 0) {
            return <Win restartGame={restartGame} />
        }

        return <div></div>
    }

    return (
        <div className={styles.root}>
            <a.div className={styles.card} style={panelAnim as any}>
                <div className={styles.title}>
                    Question {pos + 1} / {quizList.length}
                </div>
                <div className={styles.questionTitle}>{actualQuestion.question}</div>
            </a.div>
            {actualQuestion.explanation && (
                <>
                    <a.div
                        className={styles.cardExplanation}
                        style={explanationSpring as any}
                    >
                        <div className={styles.title}>Explanantion</div>
                        <div className={styles.questionExplanation}>
                            {actualQuestion.explanation}
                        </div>
                    </a.div>
                    <a.div className={styles.buttonNext} style={nextSpring as any}>
                        <Button
                            startColor="white"
                            endColor="#dedede"
                            borderColor="#bdbdbd"
                            shadow="rgba(0, 0, 0, 0.2)"
                            onClick={async () => {
                                await outExplanation()
                                await handleNextQuestion()
                            }}
                        >
                            Next
                        </Button>
                    </a.div>
                </>
            )}

            <div className={styles.solutionList}>
                <div className={styles.listOptions}>
                    <a.div style={transitionHint as any} className={styles.hint}>
                        {actualQuestion.corrects.length} valid answers
                    </a.div>
                    {actualQuestion.options.map((option, i) => {
                        const isRightQuestion = actualQuestion.corrects.some(
                            correct => correct === option,
                        )

                        const isClick = clickeds.some(click => click === option)

                        const isWrongClick = isClick && !isRightQuestion

                        let buttonStyle = {
                            startColor: "#199FEF",
                            endColor: "#116699",
                            borderColor: "#0B4568",
                            shadow: "rgba(17, 102, 153, 0.5)",
                        }

                        if (
                            (showValid && isRightQuestion) ||
                            (isClick && isRightQuestion)
                        ) {
                            buttonStyle = {
                                startColor: "#3CEB7A",
                                endColor: "#009801",
                                borderColor: "#066B07",
                                shadow: "rgba(17, 102, 153, 0.5)",
                            }
                        }

                        if (showValid && isWrongClick) {
                            buttonStyle = {
                                startColor: "#E52528",
                                endColor: "#BF1C2B",
                                borderColor: "#890406",
                                shadow: "rgba(229, 37, 40, 0.5)",
                            }
                        }

                        return (
                            <a.div
                                style={animOptions[i] as any}
                                className={styles.optionOne}
                                key={option}
                            >
                                <Button
                                    className={styles.buttonOptionOne}
                                    startColor={buttonStyle.startColor}
                                    endColor={buttonStyle.endColor}
                                    borderColor={buttonStyle.borderColor}
                                    shadow={buttonStyle.shadow}
                                    onClick={() => handleClick(option)}
                                >
                                    {option}
                                </Button>
                            </a.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Game
