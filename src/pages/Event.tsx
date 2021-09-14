import React, {FC, useEffect, useState} from 'react';
import {EventCalendar} from "../components/Calendar";
import {Button, Layout, Modal, Row} from "antd";
import {EventForm} from "../components/EventForm";
import {useAction} from "../hooks/useAction";
import {useTypesSelector} from "../hooks/useTypesSelector";
import {IEvent} from "../models/IEvent";

export const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useAction()
    const {guests,events} = useTypesSelector(state => state.event)
    const {user} = useTypesSelector(state => state.auth)
    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false)
        createEvent(event)
    }
    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify={"center"} onClick={() => setModalVisible(true)}>
                <Button>Добавить событие</Button>
            </Row>
            <Modal title={"Добавить событие"} visible={modalVisible} footer={null}
                   onCancel={() => setModalVisible(false)}>
                <EventForm submit={addNewEvent}
                           guests={guests}
                />
            </Modal>
        </Layout>
    );
};

