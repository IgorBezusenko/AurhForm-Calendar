import {EventActionEnum, SetEventsAction, SetGuestsAction} from "./types";
import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import UserServer from "../../../api/UserServer";

export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserServer.getUsers()
            dispatch(EventActionCreators.setGuests(response.data))
        } catch (e) {
            console.log(e)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || "[]"
            const json = JSON.parse(events) as IEvent[]
            json.push(event)
            dispatch(EventActionCreators.setEvents(json))
            localStorage.setItem("events", JSON.stringify(json))
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvents: (userName: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || "[]"
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvent = json.filter(event => event.author === userName || event.guest === userName)
            dispatch(EventActionCreators.setEvents(currentUserEvent))
        } catch (e) {
            console.log(e)
        }
    }
}
