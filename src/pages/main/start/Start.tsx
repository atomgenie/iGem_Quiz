import { Button } from "assets"
import React, { useEffect, useMemo, useState } from "react"
import styles from "./Start.module.scss"
import Img from "./Bactail.png"
import { a, useSpring } from "react-spring"
import { stateSaver } from "helpers/state-saver/state-saver"
import { useDispatch } from "react-redux"
import { setFullQuiz } from "helpers/redux/data/data.actions"

interface props {
    nextScreen: () => void
    triggerGame: () => void
}

const Start: React.FC<props> = ({ nextScreen, triggerGame }) => {
    const [stopAnim, setStopAnim] = useState(false)

    const reduxDispatch = useDispatch()

    const [propsLogo, setPropsLogo] = useSpring(() => ({
        top: -400,
        opacity: 0,
    }))

    const [propsButton, setButton] = useSpring(() => ({
        bottom: -400,
    }))

    const [textProps, setText] = useSpring(() => ({
        opacity: 0,
    }))

    const initialState = useMemo(() => {
        const data = stateSaver.getState()
        if (!data) {
            return undefined
        }

        return data.questionNumber !== 0 ? data : undefined
    }, [])

    const [animNotif, setAnimNotif] = useSpring(() => ({
        top: -400,
        opacity: 0,
    }))
    useEffect(() => {
        let loop = 1

        if (stopAnim) {
            return
        }

        setPropsLogo({ top: 0, opacity: 1 })
        setText({ opacity: 1 })
        setAnimNotif({ opacity: 1, top: 20 })

        const loopFn = setTimeout(async () => {
            await setButton({ bottom: 0 })
            while (loop && !stopAnim) {
                await new Promise(res => setTimeout(res, 2000))
                await setButton({ bottom: 10 })
                await setButton({ bottom: 0 })
            }
        }, 300)

        return () => {
            loop = 0
            clearTimeout(loopFn)
        }
    }, [setButton, stopAnim, setPropsLogo, setText, setAnimNotif])

    const handleOutAnim = async () => {
        setStopAnim(true)
        await Promise.all([
            (setButton({ bottom: -400 }),
            setText({ opacity: 0 }),
            setPropsLogo({ top: -400, opacity: 0 })),
            setAnimNotif({ top: -400, opacity: 0 }),
        ])
    }

    const handleRestart = async () => {
        if (!initialState) {
            return
        }

        await handleOutAnim()
        reduxDispatch(setFullQuiz(initialState))
        triggerGame()
    }

    return (
        <div className={styles.root}>
            {initialState !== undefined && (
                <a.div style={animNotif as any} className={styles.notification}>
                    <Button
                        onClick={handleRestart}
                        startColor="white"
                        endColor="#dedede"
                        borderColor="#bdbdbd"
                        className={styles.buttonNotification}
                        shadow="rgba(0, 0, 0, 0.2)"
                    >
                        Restart previous session
                    </Button>
                </a.div>
            )}
            <a.div className={styles.img}>
                <a.img style={propsLogo as any} src={Img} alt="Bactail" />
            </a.div>
            <a.div style={textProps as any} className={styles.text}>
                The ultimate quiz on bacteria, antibiotics and antimicrobial resistance
            </a.div>
            <a.div style={propsButton} className={styles.playBtn}>
                <Button
                    onClick={async () => {
                        await handleOutAnim()
                        nextScreen()
                    }}
                    className={styles.button}
                    startColor="#E52528"
                    endColor="#BF1C2B"
                    borderColor="#890406"
                    shadow="rgba(229, 37, 40, 0.5)"
                >
                    PLAY!
                </Button>
            </a.div>
        </div>
    )
}

export default Start
