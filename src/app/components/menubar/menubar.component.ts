import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { openModal } from '../../store/actions';
import { Selectors } from '../../store';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {

  isModalOpen$: Observable<boolean> = this.store.select(Selectors.isModalOpen);
  isEventActive$: Observable<boolean> = this.store.select(Selectors.isEventActive);
  
  constructor(private store: Store) {}

  openModal() {
    this.store.dispatch(openModal());
  }

}
