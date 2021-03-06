import React, { useEffect, useMemo, useState } from "react"
import styles from "./Admin.module.scss"
import { useParams } from "react-router-dom"
import { gameManager } from "helpers/game"
import { LEVEL_TYPE } from "helpers/level-type"

const multiplicator: {
    [T in LEVEL_TYPE]: number
} = {
    [LEVEL_TYPE.EASY]: 10,
    [LEVEL_TYPE.MEDIUM]: 20,
}

const mapLevelToString: {
    [T in LEVEL_TYPE]: string
} = {
    [LEVEL_TYPE.EASY]: "Basics",
    [LEVEL_TYPE.MEDIUM]: "Challenging",
}

export default () => {
    const { roomId } = useParams<{ roomId: string | undefined }>()
    const [allUsers, setAllUsers] = useState<
        Array<{ nickname: string; score: number; level: LEVEL_TYPE }>
    >([])

    const realRoomId = useMemo(() => (roomId ? roomId.toUpperCase() : ""), [roomId])

    useEffect(() => {
        if (!realRoomId) {
            return
        }

        const unsubscribe = gameManager.subscribeScore(realRoomId, snapshotUsers => {
            setAllUsers(snapshotUsers)
        })

        return () => {
            unsubscribe()
        }
    }, [realRoomId])

    const users = useMemo(() => {
        return allUsers
            .map(user => ({
                ...user,
                finalScore: user.score * multiplicator[user.level],
            }))
            .sort((userA, userB) => userB.finalScore - userA.finalScore)
            .slice(0, 20)
    }, [allUsers])

    return (
        <div className={styles.root}>
            <div className={styles.title}>Scoreboard</div>
            <div className={styles.room}>
                <div className={styles.roomElm}>
                    Room: <span className={styles.roomText}>{realRoomId}</span>
                </div>
            </div>
            <div className={styles.users}>
                {users.map(user => (
                    <div key={user.nickname} className={styles.user}>
                        <div className={styles.username}>{user.nickname}</div>
                        <div className={styles.diffculty}>
                            {mapLevelToString[user.level]}
                        </div>
                        <div className={styles.score}>{user.finalScore}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
