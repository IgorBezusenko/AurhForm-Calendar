import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypesSelector} from "../hooks/useTypesSelector";

interface GuestsProps {
    guests: IUser[],
    submit : (event:IEvent)=>void
}

export const EventForm: FC<GuestsProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)
    const {user} = useTypesSelector(state => state.auth);

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }
    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Описание события"
                name="description"
                rules={[rules.required()]}
            >
                <Input value={event.description} onChange={(e) => {
                    setEvent({...event, description: e.target.value})
                }}/>
            </Form.Item>
            <Form.Item
                label="выберите гостя"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {
                        props.guests.map(guests =>
                            <Select.Option key={guests.username} value={guests.username}>
                                {guests.username}
                            </Select.Option>)
                    }
                </Select>
            </Form.Item>

            <Form.Item
                label="Дата события"
                name="date"
                rules={[rules.required(),rules.isDateAfter("Нельзя создавать событие в прошлом")]}
            >
                <DatePicker onChange={(date) => selectDate(date)}/>
            </Form.Item>


            <Row justify={"end"}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

