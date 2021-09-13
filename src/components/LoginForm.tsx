import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypesSelector} from "../hooks/useTypesSelector";
import {useAction} from "../hooks/useAction";

export const LoginForm: FC = () => {
    const {login} = useAction()
    const {error, isLoading} = useTypesSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const submit = () => {
        login(username, password)
    }
    return (
        <Form
            onFinish={submit}
        >
            {
                error &&
                <div style={{color: "red"}}>
                    {error}
                </div>
            }
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required('Пожалуйста введите имя')]}
            >
                <Input value={username} onChange={e => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required('Пожалуйста введите пароль')]}
            >
                <Input value={password} onChange={e => setPassword(e.target.value)} type={"password"}/>

            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
}

