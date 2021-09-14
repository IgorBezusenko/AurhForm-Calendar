import React, {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[]
}

export const EventCalendar: FC<EventCalendarProps> = (props) => {

    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(event => event.date === formatedDate)
        return (
            <>
                {currentDayEvents.map((event, index) => (
                    <div key={index}>
                        <div>
                            {event.description}
                        </div>
                    </div>
                ))}
            </>
        );
    }

    return (
        <div>
            <Calendar dateCellRender={dateCellRender}/>
        </div>
    );
};

