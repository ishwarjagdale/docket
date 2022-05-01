import React from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import Login from "./views/Login";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>} />
                    <Route path={"/app"} element={<Dashboard/>} />
                    <Route path={"/login"} element={<Login/>} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;