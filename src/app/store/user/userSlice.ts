import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user";

import { addUser, deleteUser, getUserById, isSelectedUser, updateUser } from "../actions";
import { addUserSuccess, deleteUserSucces, getUsersSuccess, updateUserSuccess } from "../api-actions";

export interface UserState {
    user: User[];
    selectedUser: User | null;
}

const initialState: UserState = {
    user: [],
    selectedUser: null
}

export const userReducer = createReducer(
    initialState,
    on(addUserSuccess, (currentState, action) => ({ ...currentState, user: [...currentState.user, action.user]  })),

    on(getUsersSuccess, (currentState, action) => ({ ...currentState, user: action.user })),

    on(getUserById, (currentState, action) => ({ 
        ...currentState, 
        selectedUser: currentState.user.find(user => user.id === action.id) || null
    })),

    on(updateUserSuccess, (currentState, action) => ({ 
        ...currentState,
        user: currentState.user.map((user) => user.id == action.user.id ? action.user : user),
        selectedUser: null
    })),
    
    on(deleteUserSucces, (currentState, action) => ({
        ...currentState,
        user: currentState.user.filter((user) => user.id !== action.id)
    })),

    on(isSelectedUser, (currentState) => ({ ...currentState, selectedUser: null }))
)