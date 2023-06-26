import { createAction, props } from "@ngrx/store";
import { User } from "../models/user";

export const openModal = createAction('[Modal] Open Modal');
export const closeModal = createAction('[Modal] Close Modal');

export const setActiveEvent = createAction('[Event] Set Active Event');
export const setInactiveEvent = createAction('[Event] Set Inactive Event');

export const addUser = createAction('[User] Add User', props<{user: User}>());
export const getUsers = createAction('[User] Get Users');
export const getUserById = createAction('[User] Get User By Id', props<{id: number}>());
export const updateUser = createAction('[User] Update User', props<{user: User}>());
export const deleteUser = createAction('[User] Delete User', props<{id: number}>());
export const isSelectedUser = createAction('[User] Is Selected User');

