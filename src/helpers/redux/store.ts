import { combineReducers, createStore } from "redux"
import { dataReducer } from "./data/data.reducer"
import { stateSaver } from "helpers/state-saver/state-saver"

const rootReducer = combineReducers({
    data: dataReducer,
})

export type StoreType = ReturnType<typeof rootReducer>

export const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)

store.subscribe(() => {
    const state = store.getState()
    stateSaver.saveState(state.data)
})
