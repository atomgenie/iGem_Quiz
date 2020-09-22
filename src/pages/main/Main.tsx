import React, { useState } from "react"
import styles from "./Main.module.scss"
import Logo from "./Logo_IONIS.png"
import Start from "./start/Start"
import LevelChoice from "./level-choice/LevelChoice"
import { LEVEL_TYPE } from "helpers/level-type"

enum STEP {
    START,
    CHOICE,
    PLAY,
}

export default () => {
    const [step, setStep] = useState<STEP>(STEP.START)

    const [levelType, setLevelType] = useState<LEVEL_TYPE>(LEVEL_TYPE.EASY)

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <img src={Logo} alt="Ionis" />
                {levelType}
            </div>
            <div className={styles.content}>
                {step === STEP.START && <Start nextScreen={() => setStep(STEP.CHOICE)} />}
                {step === STEP.CHOICE && (
                    <LevelChoice
                        handleSelectLevelType={levelTypeS => {
                            setLevelType(levelTypeS)
                            setStep(STEP.PLAY)
                        }}
                    />
                )}
            </div>
        </div>
    )
}
