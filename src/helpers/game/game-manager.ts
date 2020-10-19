import { roomDatabase } from "helpers/database/room"
import { LEVEL_TYPE } from "helpers/level-type"
import { store } from "helpers/redux/store"

class GameManager {
    private playerName?: string
    private roomId?: string

    public async registerRoom(playerName: string, roomId: string, userId: string) {
        this.playerName = playerName
        this.roomId = roomId
        await roomDatabase.insertUser(roomId, playerName, userId)
    }

    public async setScore(score: number, level: LEVEL_TYPE) {
        if (!this.playerName || !this.roomId) {
            const state = store.getState()
            if (!state.data.online.active) {
                return
            }
            this.roomId = state.data.online.roomId
            this.playerName = state.data.online.nickname
        }

        await roomDatabase.setScore(this.roomId, this.playerName, score, level)
    }

    public subscribeScore(
        roomId: string,
        fn: (
            users: Array<{ nickname: string; score: number; level: LEVEL_TYPE }>,
        ) => void,
    ) {
        return roomDatabase.subscribeScore(roomId, fn)
    }

    public async checkUserAlreadyExists(playerName: string, roomId: string) {
        return roomDatabase.checkUserExists(roomId, playerName)
    }
}

export const gameManager = new GameManager()
