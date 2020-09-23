import React, { useState } from "react"
import styles from "./Main.module.scss"
import Logo from "./Logo_IONIS.png"
import Start from "./start/Start"
import LevelChoice from "./level-choice/LevelChoice"
import Game from "./game/Game"

enum STEP {
    START,
    CHOICE,
    PLAY,
}

export default () => {
    const [step, setStep] = useState<STEP>(STEP.START)

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <img src={Logo} alt="Ionis" />
            </div>
            <div className={styles.content}>
                {step === STEP.START && <Start nextScreen={() => setStep(STEP.CHOICE)} />}
                {step === STEP.CHOICE && (
                    <LevelChoice
                        handleNextView={() => {
                            setStep(STEP.PLAY)
                        }}
                    />
                )}
                {step === STEP.PLAY && <Game />}
            </div>
        </div>
    )
}
