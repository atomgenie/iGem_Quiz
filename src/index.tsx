import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { firebaseHelper } from "helpers/firebase"

firebaseHelper.initializeFirebase()

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
    onUpdate: registration => {
        if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: "SKIP_WAITING" })
        }
    },
})
