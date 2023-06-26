import { createAction, props } from "@ngrx/store";
import { User } from "../models/user";

//Actions invocadas desde el effect
export const getUsersSuccess = createAction('[Api] Api Get Users', props<{user: User[]}>());
export const deleteUserSucces = createAction('[Api] Api Delete User', props<{id: number}>());
export const addUserSuccess = createAction('[Api] Api Add User', props<{user: User}>());
export const updateUserSuccess = createAction('[Api] Api Update User', props<{user: User}>());