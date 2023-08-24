import { Injectable } from '@angular/core';
import { IExperience } from './Components/Interfaces/experience';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './Components/Interfaces/user';
import { IPost } from './Components/Interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  // Get post
  getPost(userId: string): Observable<IPost> {
    const apiUrl = 'https://striveschool-api.herokuapp.com/api/posts/';
    return this.http.get<IPost>(apiUrl);
  }
  // Delete post
  deletePostSvc(postId: string, expId: string): Observable<void> {
    const apiUrl = 'https://striveschool-api.herokuapp.com/api/posts/';
    return this.http.delete<void>(apiUrl);
  }
  // Put post
  modifyPost(
    userId: string,
    postId: string,
    postData: Partial<IPost>
  ): Observable<IPost> {
    const url = 'https://striveschool-api.herokuapp.com/api/posts/';
    return this.http.put<IPost>(url, postData);
  }
}
