import { Button } from "assets"
import { StoreType } from "helpers/redux/store"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useSpring, a } from "react-spring"
import styles from "./Win.module.scss"

export default () => {
    const score = useSelector<StoreType, number>(store => store.data.score)
    const questionNumber = useSelector<StoreType, number>(
        store => store.data.questionNumber,
    )

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
                >
                    PLAY AGAIN!
                </Button>
            </a.div>
        </div>
    )
}
