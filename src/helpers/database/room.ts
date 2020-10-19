import { firebaseHelper, CollectionReference } from "helpers/firebase"
import { LEVEL_TYPE } from "helpers/level-type"

interface DbRoom {
    users: CollectionReference<{
        name: string
        roomId: string
        score: number | null
        level: "UNKNOWN" | "EASY" | "MEDIUM"
        userId: string
    }>
}

const dbLevel = ["UNKNOWN", "EASY", "MEDIUM"] as const

const dbLevelToEnum: {
    [T in typeof dbLevel[number]]: LEVEL_TYPE
} = {
    EASY: LEVEL_TYPE.EASY,
    MEDIUM: LEVEL_TYPE.MEDIUM,
    UNKNOWN: LEVEL_TYPE.EASY,
}

class RoomDatabase {
    private getUser(roomId: string, username: string) {
        return ((firebaseHelper.db.collection("rooms") as CollectionReference<DbRoom>)
            .doc(roomId)
            .collection("users") as DbRoom["users"]).doc(username)
    }

    public async insertUser(roomId: string, username: string, userId: string) {
        await this.getUser(roomId, username).set({
            name: username,
            roomId: roomId,
            score: null,
            level: "UNKNOWN",
            userId,
        })
    }

    public async checkUserExists(roomId: string, username: string) {
        const userData = await this.getUser(roomId, username).get()
        return userData.exists
    }

    public async setScore(
        roomId: string,
        username: string,
        score: number,
        levelType: LEVEL_TYPE,
    ) {
        let level: "EASY" | "MEDIUM"

        switch (levelType) {
            case LEVEL_TYPE.EASY:
                level = "EASY"
                break

            case LEVEL_TYPE.MEDIUM:
                level = "MEDIUM"
                break
        }

        await this.getUser(roomId, username).update({ score, level })
    }

    public subscribeScore(
        roomId: string,
        fn: (
            users: Array<{ nickname: string; score: number; level: LEVEL_TYPE }>,
        ) => void,
    ) {
        return (firebaseHelper.db
            .collection("rooms")
            .doc(roomId)
            .collection("users") as DbRoom["users"])
            .orderBy("score", "desc")
            .onSnapshot({}, snapshot => {
                const users: Array<{
                    nickname: string
                    score: number
                    level: LEVEL_TYPE
                }> = []

                snapshot.forEach(user => {
                    const data = user.data()

                    users.push({
                        nickname: data.name,
                        score: data.score || 0,
                        level: dbLevelToEnum[data.level] || LEVEL_TYPE.EASY,
                    })
                })

                fn(users)
            })
    }
}

export const roomDatabase = new RoomDatabase()
