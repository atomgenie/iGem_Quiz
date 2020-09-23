import { combineReducers, createStore } from "redux"
import { dataReducer } from "./data/data.reducer"

const rootReducer = combineReducers({
    data: dataReducer,
})

export type StoreType = ReturnType<typeof rootReducer>

export const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)
