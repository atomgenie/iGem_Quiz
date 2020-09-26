import React, { useEffect, useMemo, useState } from "react"
import styles from "./Admin.module.scss"
import { useParams } from "react-router-dom"
import { gameManager } from "helpers/game"

export default () => {
    const { roomId } = useParams<{ roomId: string | undefined }>()
    const [users, setUsers] = useState<Array<{ nickname: string; score: number }>>([])

    const realRoomId = useMemo(() => (roomId ? roomId.toUpperCase() : ""), [roomId])

    useEffect(() => {
        if (!realRoomId) {
            return
        }

        const unsubscribe = gameManager.subscribeScore(realRoomId, snapshotUsers => {
            setUsers(snapshotUsers.slice(0, 20))
        })

        return () => {
            unsubscribe()
        }
    }, [realRoomId])

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
                        <div className={styles.score}>{user.score}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
