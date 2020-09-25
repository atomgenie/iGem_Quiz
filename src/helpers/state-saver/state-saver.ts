import { StoreType } from "helpers/redux/store"

const localstorageKey = "__QUIZZ_STATE__"

class StateSaver {
    public saveState(state: StoreType["data"]) {
        localStorage.setItem(localstorageKey, JSON.stringify(state))
    }

    public getState(): StoreType["data"] | undefined {
        const data = localStorage.getItem(localstorageKey)

        if (!data) {
            return undefined
        }

        return JSON.parse(data)
    }

    public resetState() {
        localStorage.removeItem(localstorageKey)
    }
}

export const stateSaver = new StateSaver()
