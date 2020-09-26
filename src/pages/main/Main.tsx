import React, { useState } from "react"
import styles from "./Main.module.scss"
import Logo from "./Logo_IONIS.png"
import Start from "./start/Start"
import LevelChoice from "./level-choice/LevelChoice"
import Game from "./game/Game"
import OnlineRegister from "./online-register/OnlineRegister"
import { HashRouter, Route } from "react-router-dom"
import Admin from "./admin/Admin"

enum STEP {
    START,
    REGISTER_ONLINE,
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
                <HashRouter>
                    <Route path="/" exact>
                        {step === STEP.START && (
                            <Start
                                nextScreen={() => setStep(STEP.CHOICE)}
                                triggerGame={() => setStep(STEP.PLAY)}
                                playOnline={() => setStep(STEP.REGISTER_ONLINE)}
                            />
                        )}
                        {step === STEP.REGISTER_ONLINE && (
                            <OnlineRegister nextScreen={() => setStep(STEP.CHOICE)} />
                        )}
                        {step === STEP.CHOICE && (
                            <LevelChoice
                                handleNextView={() => {
                                    setStep(STEP.PLAY)
                                }}
                            />
                        )}
                        {step === STEP.PLAY && (
                            <Game restartGame={() => setStep(STEP.CHOICE)} />
                        )}
                    </Route>
                    <Route path="/admin/:roomId">
                        <Admin />
                    </Route>
                </HashRouter>
            </div>
        </div>
    )
}
