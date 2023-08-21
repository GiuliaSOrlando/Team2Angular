import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from './Components/Interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

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
  updateUser(userId: string, userData: IUser) {
    return this.http.put(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}`,
      userData
    );
  }
}
