import React, {FC, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import {NavBar} from "./components/NavBar";
import {Layout} from "antd";

import './App.css';
import {useAction} from "./hooks/useAction";
import {IUser} from "./models/IUser";

const App: FC = () => {
    const {setUser, setAuth, setEvents} = useAction()
    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setUser({username: localStorage.getItem("username" || "")} as IUser)
            setAuth(true)
        }
    }, [])
    return (
        <Layout>
            <NavBar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
        </Layout>
    );
};

export default App;
