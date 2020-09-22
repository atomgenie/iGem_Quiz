import React, { useEffect } from "react"
import styles from "./LevelChoice.module.scss"
import { Button } from "assets"
import { a, useSpring } from "react-spring"
import { LEVEL_TYPE } from "helpers/level-type"

interface props {
    handleSelectLevelType: (levelType: LEVEL_TYPE) => void
}

const LevelChoice: React.FC<props> = ({ handleSelectLevelType }) => {
    const [card1, setCard1] = useSpring(() => ({
        left: "150%",
    }))

    const [card2, setCard2] = useSpring(() => ({
        left: "150%",
    }))

    const [card3, setCard3] = useSpring(() => ({
        left: "150%",
    }))

    useEffect(() => {
        const startAnim = async () => {
            await Promise.all([
                setCard1({ left: "0%" }),
                new Promise(res =>
                    setTimeout(async () => {
                        await setCard2({ left: "0%" })
                        res()
                    }, 150),
                ),
                new Promise(res =>
                    setTimeout(async () => {
                        await setCard3({ left: "0%" })
                        res()
                    }, 300),
                ),
            ])
        }

        startAnim()
    }, [setCard1, setCard2, setCard3])

    const handleLevelChoice = async (levelType: LEVEL_TYPE) => {
        await Promise.all([
            setCard1({ left: "-150%" }),
            new Promise(res =>
                setTimeout(async () => {
                    await setCard2({ left: "-150%" })
                    res()
                }, 150),
            ),
            new Promise(res =>
                setTimeout(async () => {
                    await setCard3({ left: "-150%" })
                    res()
                }, 300),
            ),
        ])

        handleSelectLevelType(levelType)
    }

    return (
        <div className={styles.root}>
            <a.div className={styles.card} style={card1}>
                <div className={styles.buttonDiv}>
                    <Button
                        startColor="#FDFE40"
                        endColor="#FFC400"
                        borderColor="#E18900"
                        className={styles.button}
                        onClick={() => handleLevelChoice(LEVEL_TYPE.EASY)}
                    >
                        Easy
                    </Button>
                </div>
                <div className={styles.text}>
                    Review yours basics or learn something new
                </div>
            </a.div>

            <a.div style={card2} className={styles.card}>
                <div className={styles.buttonDiv}>
                    <Button
                        startColor="#0E94E6"
                        endColor="#116699"
                        borderColor="#0C4D74"
                        className={styles.button}
                        onClick={() => handleLevelChoice(LEVEL_TYPE.MEDIUM)}
                    >
                        Medium
                    </Button>
                </div>
                <div className={styles.text}>For advanced scientists</div>
            </a.div>
            <a.div style={card3} className={styles.card}>
                <div className={styles.buttonDiv}>
                    <Button
                        startColor="#E52528"
                        endColor="#BF1C2B"
                        borderColor="#890406"
                        className={styles.button}
                        onClick={() => handleLevelChoice(LEVEL_TYPE.HARD)}
                    >
                        Hard
                    </Button>
                </div>
                <div className={styles.text}>For experts</div>
            </a.div>
        </div>
    )
}

export default LevelChoice
