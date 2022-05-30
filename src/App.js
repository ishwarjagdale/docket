import React from "react";
import "./App.css";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import { verifyUser } from "./api/auth";
import {notify} from "./components/notifier";

const SecureRoute = ({children}) => {
    let user = localStorage.getItem("user");
    if(user) {
        let isUser = verifyUser();
        console.log(isUser);
        if(isUser) {
            return children;
        } else {
            notify("Authentication required!", 'failed');
            return <Navigate to={"/"} />
        }
    } else {
        notify("Authentication required!", 'failed');
        return <Navigate to={"/"} />
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || false,
        };
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Home appState={this.state} />} />
                        <Route path={"/app"} element={<SecureRoute><Dashboard appState={this.state} /></SecureRoute>} />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}

export default App;