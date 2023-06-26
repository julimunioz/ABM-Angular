import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ModalState } from "./modal/modalSlice";
import { EventState } from "./event/eventSlice";
import { UserState } from "./user/userSlice";

export const modalState = createFeatureSelector<ModalState>('modal');
export const eventState = createFeatureSelector<EventState>('event');
export const userState = createFeatureSelector<UserState>('user');

export const isModalOpen = createSelector(
    modalState,
    (modalState) => modalState.isModalOpen
)

export const isEventActive = createSelector(
    eventState,
    (eventState) => eventState.activeEvent
)

export const users = createSelector(
    userState,
    (userState) => userState.user
)

export const selectedUser = createSelector(
    userState,
    (state: UserState) => state.selectedUser
);