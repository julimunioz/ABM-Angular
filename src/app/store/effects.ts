import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";

import { ApiService } from "../services/api.service";
import { addUser, deleteUser, getUsers, updateUser } from "./actions";
import { addUserSuccess, deleteUserSucces, getUsersSuccess, updateUserSuccess } from "./api-actions";
import { User } from "../models/user";


@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private apiService: ApiService){}
    
    listUsers$ = createEffect (() => 
        this.actions$.pipe(
            ofType(getUsers),
            mergeMap(() => 
                this.apiService.getAllUsers().pipe(
                    map((users) => getUsersSuccess({ user: users }))
                )
            )
        )
    );

    deleteUser$ = createEffect (() =>
        this.actions$.pipe(
            ofType(deleteUser),
            mergeMap((action) =>
                this.apiService.deleteUser(action.id).pipe(
                    map(() => deleteUserSucces({ id: action.id}))
                )
            )
        )
    );

    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUser),
            mergeMap((action) =>
                this.apiService.addUser(action.user).pipe(
                    map((newUser: User) => addUserSuccess({ user: newUser }))
                )
            )        
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUser),
            mergeMap((action) =>
                this.apiService.updateUser(action.user).pipe(
                    map(() => updateUserSuccess({ user: action.user })),
                )
            )
        )
    );

}