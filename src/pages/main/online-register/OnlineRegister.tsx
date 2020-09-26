import { Button } from "assets"
import React, { useEffect, useState } from "react"
import styles from "./OnlineRegister.module.scss"
import { useSpring, a } from "react-spring"
import { gameManager } from "helpers/game"
import { useDispatch } from "react-redux"
import { setOnline } from "helpers/redux/data/data.actions"

interface props {
    nextScreen: () => void
}

const OnlineRegister: React.FC<props> = ({ nextScreen }) => {
    const [titleSpring, setTitleSpring] = useSpring(() => ({
        opacity: 0,
        position: "relative",
        bottom: 400,
    }))

    const [inputsSpring, setInputsSpring] = useSpring(() => ({
        position: "relative",
        opacity: 0,
        right: -500,
    }))

    const [buttonSpring, setButtonSpring] = useSpring(() => ({
        position: "relative",
        opacity: 0,
        top: 400,
    }))

    const outSprings = async () => {
        await Promise.all([
            setTitleSpring({ opacity: 0, bottom: 400 }),
            setInputsSpring({ opacity: 0, right: 500 }),
            setButtonSpring({ opacity: 0, top: 400 }),
        ])
    }

    useEffect(() => {
        setTitleSpring({ opacity: 1, bottom: 0 })
        setInputsSpring({
            opacity: 1,
            right: 0,
        })
        setButtonSpring({
            opacity: 1,
            top: 0,
        })
    }, [setTitleSpring, setInputsSpring, setButtonSpring])

    const [roomId, setRoomId] = useState("")
    const [nickname, setNickname] = useState("")

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const reduxDispatch = useDispatch()

    const handleRegister = async () => {
        if (!roomId || !nickname) {
            setIsError(true)
            return
        }
        setIsError(false)

        setIsLoading(true)

        try {
            await gameManager.registerRoom(nickname, roomId)
            setIsLoading(false)
            reduxDispatch(setOnline(nickname, roomId))
            await outSprings()
            nextScreen()
        } catch {
            setIsError(true)
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.root}>
            <a.div style={titleSpring as any} className={styles.title}>
                Play online!
            </a.div>
            <a.div style={inputsSpring as any} className={styles.inputDiv}>
                <input
                    placeholder="Room"
                    className={styles.input}
                    value={roomId}
                    onChange={e => setRoomId(e.target.value.toUpperCase())}
                />
            </a.div>
            <a.div style={inputsSpring as any} className={styles.inputNickname}>
                <input
                    placeholder="Nickname"
                    className={styles.input}
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                />
            </a.div>
            {isError && <div className={styles.error}>Please enter valid values</div>}

            <a.div style={buttonSpring as any} className={styles.playBtn}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Button
                        onClick={async () => {
                            handleRegister()
                        }}
                        className={styles.button}
                        startColor="#E52528"
                        endColor="#BF1C2B"
                        borderColor="#890406"
                        shadow="rgba(229, 37, 40, 0.5)"
                    >
                        PLAY!
                    </Button>
                )}
            </a.div>
        </div>
    )
}

export default OnlineRegister
