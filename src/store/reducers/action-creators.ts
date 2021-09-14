import {AuthActionCreators} from "./auth/auth-action-creators";
import {EventActionCreators} from "./event/event-action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
    // ...any action creators,

}
