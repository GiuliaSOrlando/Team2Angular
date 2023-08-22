import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from './Components/Interfaces/user';
import { IExperience } from './Components/Interfaces/experience';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  userData!: IUser;

  private user = new BehaviorSubject<Partial<IUser>>({});
  user$ = this.user.asObservable();

  // Get all users
  getUsers(): Observable<IUser[]> {
    const apiUrl = 'https://striveschool-api.herokuapp.com/api/profile/';
    return this.http.get<IUser[]>(apiUrl);
  }

  // Get my profule
  getSingleUser(): Observable<IUser> {
    const apiUrl = 'https://striveschool-api.herokuapp.com/api/profile/me';
    return this.http.get<IUser>(apiUrl);
  }

  // Get a specific user
  getSpecificUser(userId: string): Observable<IUser> {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/profile/${userId}`;
    return this.http.get<IUser>(apiUrl);
  }

  getUserByEmail(email: string): Observable<IUser> {
    const url = `https://striveschool-api.herokuapp.com/api/profile/${email}`;
    return this.http.get<IUser>(url);
  }

  // Put method
  updateUser(data: Partial<IUser>) {
    const apiUrl = 'https://striveschool-api.herokuapp.com/api/profile/';
    return this.http.put<IUser>(apiUrl, data);
  }

  // updateUser(data: Partial<IUser>) {
  //   const apiUrl = 'https://striveschool-api.herokuapp.com/api/profile/';
  //   return this.http.put<IUser>(apiUrl, data).pipe(
  //     tap((updatedUser) => {
  //       this.user.next(updatedUser);
  //     })
  //   );
  // }
}
