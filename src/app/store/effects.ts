import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";

import { ApiService } from "../services/api.service";
import { getUsers } from "./actions";
import { getUsersSuccess } from "./api-actions";


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
    )
}