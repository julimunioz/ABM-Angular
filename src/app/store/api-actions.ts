import { createAction, props } from "@ngrx/store";
import { User } from "../models/user";


//Actions invocadas desde el effect
export const getUsersSuccess = createAction('[Api] Get Users', props<{user: User[]}>());