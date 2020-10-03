import React, { useEffect } from "react"
import styles from "./LevelChoice.module.scss"
import { Button } from "assets"
import { a, useSpring } from "react-spring"
import { LEVEL_TYPE } from "helpers/level-type"
import { useDispatch } from "react-redux"
import { setLevel } from "helpers/redux/data/data.actions"

interface props {
    handleNextView: () => void
}

const LevelChoice: React.FC<props> = ({ handleNextView }) => {
    const reduxDispatch = useDispatch()

    const [card1, setCard1] = useSpring(() => ({
        left: "150%",
        opacity: 0,
    }))

    const [card2, setCard2] = useSpring(() => ({
        left: "150%",
        opacity: 0,
    }))

    useEffect(() => {
        const startAnim = async () => {
            await Promise.all([
                setCard1({ left: "0%", opacity: 1 }),
                new Promise(res =>
                    setTimeout(async () => {
                        await setCard2({ left: "0%", opacity: 1 })
                        res()
                    }, 150),
                ),
            ])
        }

        startAnim()
    }, [setCard1, setCard2])

    const handleLevelChoice = async (levelType: LEVEL_TYPE) => {
        reduxDispatch(setLevel(levelType))

        await Promise.all([
            setCard1({ left: "-150%", opacity: 0 }),
            new Promise(res =>
                setTimeout(async () => {
                    await setCard2({ left: "-150%", opacity: 0 })
                    res()
                }, 150),
            ),
        ])

        handleNextView()
    }

    return (
        <div className={styles.root}>
            <a.div className={styles.card} style={card1 as any}>
                <div className={styles.buttonDiv}>
                    <Button
                        startColor="#FDFE40"
                        endColor="#FFC400"
                        borderColor="#E18900"
                        className={styles.button}
                        onClick={() => handleLevelChoice(LEVEL_TYPE.EASY)}
                    >
                        Medium
                    </Button>
                </div>
                <div className={styles.text}>
                    Review yours basics or learn something new
                </div>
            </a.div>

            <a.div style={card2 as any} className={styles.card}>
                <div className={styles.buttonDiv}>
                    <Button
                        startColor="#0E94E6"
                        endColor="#116699"
                        borderColor="#0C4D74"
                        className={styles.button}
                        onClick={() => handleLevelChoice(LEVEL_TYPE.MEDIUM)}
                    >
                        Challenging
                    </Button>
                </div>
                <div className={styles.text}>For advanced scientists</div>
            </a.div>
        </div>
    )
}

export default LevelChoice
