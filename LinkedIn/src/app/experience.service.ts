import { Injectable } from '@angular/core';
import { IExperience } from './Components/Interfaces/experience';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(private http: HttpClient) {}
  // Get experience
  getExperience(userId: string): Observable<IExperience> {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`;
    return this.http.get<IExperience>(apiUrl);
  }

  // Create experience
  createExperience(
    userId: string,
    data: Partial<IExperience>
  ): Observable<IExperience> {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`;
    return this.http.post<IExperience>(apiUrl, data);
  }

  // Delete experience
  deleteExperience(userId: string, expId: string): Observable<IExperience> {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}`;
    return this.http.delete<IExperience>(apiUrl);
  }
}
