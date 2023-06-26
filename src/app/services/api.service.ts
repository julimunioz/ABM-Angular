import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/userList';
  
  constructor(private http : HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: number): Observable<User>{
    const apiUrl = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(apiUrl);
  }

  updateUser(user: User): Observable<User> {
    const apiUrl = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(apiUrl, user);
  }

  deleteUser(userId: number): Observable<User>{
    const apiUrl = `${this.apiUrl}/${userId}`;
    return this.http.delete<User>(apiUrl);
  }
}
