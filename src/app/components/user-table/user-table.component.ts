import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';

import { Selectors, openModal, setActiveEvent, getUsers, getUserById, deleteUser } from 'src/app/store';
import { Observable } from 'rxjs';
import { getUsersSuccess } from 'src/app/store/api-actions';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})

export class UserTableComponent implements OnInit {
 
  users$: Observable<User[]> = this.store.select(Selectors.users);
  selectedUser$: Observable<User | null> = this.store.select(Selectors.selectedUser);
  initialUsers: User[] = [];
  totalRecords!: number;
  rowsPerPage: number;

  constructor(private apiService : ApiService, private store : Store) {
    this.rowsPerPage = 5; 
  }

  ngOnInit(): void {
    this.getAllUsers();
  };
  
  getAllUsers() {
    this.store.dispatch(getUsers());
    this.store.select(Selectors.users).subscribe((users) => {
      this.initialUsers = users;
      this.totalRecords = users.length;
    });
  }

  editUser(userId: number) {
    this.store.dispatch(setActiveEvent());
    this.store.dispatch(openModal());
    
    this.apiService.getUserById(userId).subscribe({
      next:() => { 
        this.store.dispatch(getUserById({ id: userId}))
      },
      error:(error) => { 
        console.error('Error with getUserById',error)
      }
    });
  }

  deleteUser(userId: number){
    this.apiService.deleteUser(userId).subscribe(() => (
      this.store.dispatch(deleteUser({ id: userId }))
    ));
  }
  
  filterTable(event: any) {
    const searchText = event.target.value.toLowerCase();
  
    if (searchText.trim() === '') {
      this.store.dispatch(getUsers());
    } else {
      const filteredUsers = this.initialUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText) ||
          user.surname.toLowerCase().includes(searchText) ||
          user.email.toLowerCase().includes(searchText)
      );
      this.store.dispatch(getUsersSuccess({ user: filteredUsers }));
      this.totalRecords = filteredUsers.length; 
    }
  }
}


