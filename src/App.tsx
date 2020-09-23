import React from "react"
import Main from "./pages/main/Main"
import "./App.scss"
import { store } from "helpers/redux/store"
import { Provider } from "react-redux"

function App() {
    return (
        <Provider store={store}>
            <div>
                <Main />
            </div>
        </Provider>
    )
}

export default App
