import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { addUser, closeModal, isSelectedUser, Selectors, setInactiveEvent, updateUser } from 'src/app/store';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit{
  formGroup !: FormGroup;
  isEventActive$: Observable<boolean> = this.store.select(Selectors.isEventActive)
  selectedUser$: Observable<User | null> = this.store.select(Selectors.selectedUser);

  constructor(private formBuilder : FormBuilder, private apiService : ApiService, private store: Store){}
  
  ngOnInit() {
    
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    
    this.isEventActive$.subscribe((isEventActive) => {
      if (isEventActive) {
        this.selectedUser$.subscribe((user) => {
          if (user) {
            const { name, surname, phone, email } = user;
            this.formGroup.patchValue({ name, surname, phone, email });
          }
        });
      } else {
        this.formGroup.reset();
      }
    });
  }

  closeModal() {
    this.store.dispatch(closeModal());
    this.store.dispatch(setInactiveEvent());
    this.store.dispatch(isSelectedUser());
  }
  
  onSubmit() {
   if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      
      this.isEventActive$.pipe(take(1)).subscribe((isEventActive) => {
        if (isEventActive) {
          this.selectedUser$.pipe(take(1)).subscribe((selectedUser) => {
            if (selectedUser) {
             
              const user: User = {
                ...selectedUser,
                name: formData.name,
                surname: formData.surname,
                phone: formData.phone,
                email: formData.email
              }
              
              this.store.dispatch(updateUser({user}));
              this.formGroup.reset();
              this.store.dispatch(closeModal());
              this.store.dispatch(setInactiveEvent());

            } 
          })
        } else {
          this.store.dispatch(addUser({ user: formData }));
          this.formGroup.reset();
          this.store.dispatch(closeModal());
        }
      })
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}

  



