import { createReducer, on } from "@ngrx/store";
import { closeModal, openModal, setInactiveEvent } from "../actions";

export interface ModalState {
    isModalOpen: boolean;
}

export const initialState: ModalState = {
    isModalOpen: false,
};

export const modalReducer = createReducer(
    initialState,
    on(openModal, () => ({ isModalOpen: true })),
    on(closeModal, () => ({ isModalOpen: false }))
);