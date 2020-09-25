import { Button } from "assets"
import { StoreType } from "helpers/redux/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSpring, a } from "react-spring"
import styles from "./Win.module.scss"
import { resetQuiz } from "helpers/redux/data/data.actions"
import { stateSaver } from "helpers/state-saver/state-saver"

interface props {
    restartGame: () => void
}

const Win: React.FC<props> = ({ restartGame }) => {
    const score = useSelector<StoreType, number>(store => store.data.score)
    const questionNumber = useSelector<StoreType, number>(
        store => store.data.questionNumber,
    )

    useEffect(() => {
        stateSaver.resetState()
    }, [])

    const reduxDispatch = useDispatch()

    const [titleAnim, setTitleAnim] = useSpring(() => ({
        position: "relative",
        bottom: 400,
        opacity: 0,
    }))

    const [scoreAnim, setScoreAnim] = useSpring(() => ({
        position: "relative",
        right: -400,
        opacity: 0,
    }))

    const [playAgainAnim, setPlayAgainAnim] = useSpring(() => ({
        position: "relative",
        bottom: -500,
        opacity: 0,
    }))

    useEffect(() => {
        setTitleAnim({
            bottom: 0,
            opacity: 1,
        })

        setScoreAnim({
            right: 0,
            opacity: 1,
        })

        setPlayAgainAnim({
            bottom: 0,
            opacity: 1,
        })
    }, [setTitleAnim, setScoreAnim, setPlayAgainAnim])

    const handlePlayAgain = async () => {
        await Promise.all([
            setTitleAnim({
                bottom: 400,
                opacity: 0,
            }),

            setScoreAnim({
                right: 400,
                opacity: 0,
            }),

            setPlayAgainAnim({
                bottom: -500,
                opacity: 0,
            }),
        ])

        restartGame()
        reduxDispatch(resetQuiz())
    }

    return (
        <div className={styles.root}>
            <a.div style={titleAnim as any} className={styles.score}>
                Score
            </a.div>
            <a.div style={scoreAnim as any} className={styles.panel}>
                {score}/{questionNumber}
            </a.div>
            <a.div style={playAgainAnim as any} className={styles.playAgain}>
                <Button
                    className={styles.button}
                    startColor="#E52528"
                    endColor="#BF1C2B"
                    borderColor="#890406"
                    shadow="rgba(229, 37, 40, 0.5)"
                    onClick={handlePlayAgain}
                >
                    PLAY AGAIN!
                </Button>
            </a.div>
        </div>
    )
}

export default Win
