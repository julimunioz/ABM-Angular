import { createReducer, on } from "@ngrx/store";
import { setActiveEvent, setInactiveEvent } from "../actions";

export interface EventState {
    activeEvent: boolean;
}

export const initialState: EventState = {
    activeEvent: false,
};

export const eventReducer = createReducer(
    initialState,
    on(setActiveEvent, () => ({ activeEvent: true} )),
    on(setInactiveEvent, () => ({ activeEvent: false })),
);