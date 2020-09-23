import { Button } from "assets"
import React, { useEffect, useState } from "react"
import styles from "./Start.module.scss"
import Img from "./Bactail.png"
import { a, useSpring } from "react-spring"

interface props {
    nextScreen: () => void
}

const Start: React.FC<props> = ({ nextScreen }) => {
    const [stopAnim, setStopAnim] = useState(false)

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

    useEffect(() => {
        let loop = 1

        if (stopAnim) {
            return
        }

        setPropsLogo({ top: 0, opacity: 1 })
        setText({ opacity: 1 })

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
    }, [setButton, stopAnim, setPropsLogo, setText])

    return (
        <div className={styles.root}>
            <a.div className={styles.img}>
                <a.img style={propsLogo as any} src={Img} alt="Bactail" />
            </a.div>
            <a.div style={textProps as any} className={styles.text}>
                The ultimate quiz on bacteria, antibiotics and antimicrobial resistance
            </a.div>
            <a.div style={propsButton} className={styles.playBtn}>
                <Button
                    onClick={async () => {
                        setStopAnim(true)
                        await Promise.all([
                            (setButton({ bottom: -400 }),
                            setText({ opacity: 0 }),
                            setPropsLogo({ top: -400, opacity: 0 })),
                        ])
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
