import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './Components/Interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private selectedUserSubject = new BehaviorSubject<IUser | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  setSelectedUser(user: IUser) {
    this.selectedUserSubject.next(user);
  }

  getSelectedUser(): Observable<IUser | null> {
    return this.selectedUserSubject.asObservable();
  }
}
